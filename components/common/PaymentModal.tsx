"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (txHash: string) => void;
    bountyAmount: number;
    serviceFeePercent: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    bountyAmount,
    serviceFeePercent,
}) => {
    const serviceFee = (bountyAmount * serviceFeePercent) / 100;
    const totalAmount = bountyAmount + serviceFee;
    const paymentAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Example Address
    const [copied, setCopied] = useState(false);
    const [txHash, setTxHash] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText(paymentAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirm = () => {
        if (!txHash) {
            alert("Please enter the transaction hash.");
            return;
        }
        onConfirm(txHash);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 relative z-10 overflow-hidden font-montserrat"
                    >
                        <div className="mx-auto w-16 h-16 rounded-full bg-[#E4B95C]/10 flex items-center justify-center mb-6 text-[#E4B95C]">
                            <Wallet size={32} />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center font-nunito">
                            Fund Your Bounty
                        </h3>

                        <p className="text-gray-600 mb-6 text-center text-sm">
                            To activate your bounty, please transfer the total amount to the secure vault address below.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Bounty Prize Pool</span>
                                <span className="font-semibold">{bountyAmount} USDC</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Platform Fee ({serviceFeePercent}%)</span>
                                <span className="font-semibold">{serviceFee} USDC</span>
                            </div>
                            <div className="h-px bg-gray-200 my-2" />
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total Required</span>
                                <span>{totalAmount} USDC</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Payment Address (Base Network)
                            </label>
                            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border border-gray-200">
                                <code className="text-xs text-gray-700 flex-1 break-all font-mono">
                                    {paymentAddress}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white rounded-md transition-colors text-gray-500 hover:text-[#E4B95C]"
                                    title="Copy Address"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Transaction Hash
                            </label>
                            <input
                                type="text"
                                value={txHash}
                                onChange={(e) => setTxHash(e.target.value)}
                                placeholder="0x..."
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E4B95C] text-sm font-mono"
                            />
                            <p className="text-[10px] text-gray-400 mt-1">
                                Paste the transaction hash from your wallet after sending funds.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="flex-1 py-6 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                disabled={!txHash}
                                className="flex-1 py-6 rounded-xl bg-[#E4B95C] hover:bg-[#E4B95C]/90 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Payment
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
