"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    confirmVariant?: "danger" | "warning" | "default";
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = "Confirm",
    confirmVariant = "default",
    onClose,
    onConfirm,
    isLoading = false,
}) => {
    // Determine icon and colors based on variant
    let icon = <AlertTriangle size={32} />;
    let iconBg = "bg-yellow-100 text-yellow-600";
    let confirmBtnClass = "bg-[#EBB643] hover:bg-[#d9a532] text-black";

    if (confirmVariant === "danger") {
        icon = <Trash2 size={32} />;
        iconBg = "bg-red-100 text-red-600";
        confirmBtnClass = "bg-red-600 hover:bg-red-700 text-white";
    } else if (confirmVariant === "warning") {
        icon = <XCircle size={32} />;
        iconBg = "bg-orange-100 text-orange-600";
        confirmBtnClass = "bg-orange-500 hover:bg-orange-600 text-white";
    }

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
                        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative z-10 text-center overflow-hidden"
                    >
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconBg}`}>
                            {icon}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {title}
                        </h3>

                        <p className="text-gray-600 mb-8 font-montserrat text-sm leading-relaxed">
                            {message}
                        </p>

                        <div className="flex gap-3">
                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="flex-1 py-6 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onConfirm}
                                className={`flex-1 py-6 rounded-xl font-medium ${confirmBtnClass}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : confirmText}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
