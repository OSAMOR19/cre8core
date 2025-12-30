"use client";

import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import {
    rainbowWallet,
    walletConnectWallet,
    metaMaskWallet,
    coinbaseWallet,
    phantomWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from "wagmi";
import { base, baseSepolia, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: "Cre8Core",
    projectId: "YOUR_PROJECT_ID", // TODO: User should grab this from WalletConnect Cloud
    chains: [base, baseSepolia, mainnet],
    wallets: [
        {
            groupName: 'Recommended',
            wallets: [
                rainbowWallet,
                metaMaskWallet,
                coinbaseWallet,
                walletConnectWallet,
            ],
        },
        {
            groupName: 'Other',
            wallets: [
                phantomWallet,
                trustWallet,
                ledgerWallet,
            ],
        },
    ],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={lightTheme({
                        accentColor: '#EBB643',
                        accentColorForeground: 'black',
                        borderRadius: 'large',
                        fontStack: 'system',
                        overlayBlur: 'small',
                    })}
                >
                    {mounted && children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
