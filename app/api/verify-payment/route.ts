import { createPublicClient, http, parseAbiItem } from 'viem';
import { base } from 'viem/chains';
import { NextResponse } from 'next/server';
import { TREASURY_WALLET_ADDRESS } from '@/lib/constants';

// Initialize a public client for Base
const client = createPublicClient({
    chain: base,
    transport: http(),
});

export async function POST(request: Request) {
    try {
        const { txHash } = await request.json();

        if (!txHash) {
            return NextResponse.json({ error: 'Transaction hash is required' }, { status: 400 });
        }

        // Validate hash format
        if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
            return NextResponse.json({ error: 'Invalid transaction hash format' }, { status: 400 });
        }

        const hash = txHash as `0x${string}`;

        // 1. Get Transaction Receipt
        const receipt = await client.getTransactionReceipt({ hash });

        if (!receipt) {
            return NextResponse.json({ error: 'Transaction not found. Please wait a moment if you just sent it.' }, { status: 404 });
        }

        if (receipt.status !== 'success') {
            return NextResponse.json({ error: 'Transaction failed on-chain.' }, { status: 400 });
        }

        const treasuryAddress = TREASURY_WALLET_ADDRESS.toLowerCase();
        let isValidTransfer = false;

        // 2. Check for Native ETH Transfer
        // Note: transaction.to is in the transaction object, receipt.to is usually contract address for contract creation or null/address
        const transaction = await client.getTransaction({ hash });

        if (transaction.to?.toLowerCase() === treasuryAddress) {
            // Direct ETH transfer to treasury
            isValidTransfer = true;
        } else {
            // 3. Check for ERC20 Transfer
            // Transfer event signature: Transfer(address indexed from, address indexed to, uint256 value)
            // Topic0: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

            const transferEventSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

            for (const log of receipt.logs) {
                // Check if topic0 matches Transfer event
                if (log.topics[0] === transferEventSignature) {
                    // Check if topic2 (to) matches treasury
                    // topic2 is 32 bytes, address is 20 bytes (last 20 bytes)
                    // We need to pad the treasury address to 32 bytes to compare
                    const paddedTreasury = '0x000000000000000000000000' + treasuryAddress.slice(2);

                    if (log.topics[2]?.toLowerCase() === paddedTreasury.toLowerCase()) {
                        isValidTransfer = true;
                        break;
                    }
                }
            }
        }

        if (!isValidTransfer) {
            return NextResponse.json({ error: 'Transaction does not appear to send funds to the Treasury Wallet.' }, { status: 400 });
        }

        // If we reached here, the transaction is successful and sends funds to us.
        return NextResponse.json({ success: true, message: 'Transaction verified' });

    } catch (error: any) {
        console.error("Payment Verification Error:", error);

        // Handle specific viem errors if needed, or return generic
        if (error.message?.includes('Transaction not found')) {
            return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Failed to verify transaction' }, { status: 500 });
    }
}
