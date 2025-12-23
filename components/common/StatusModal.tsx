"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatusModalProps {
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onClose: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({
    isOpen,
    type,
    title,
    message,
    onClose,
}) => {
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
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                            {type === "success" ? (
                                <CheckCircle size={32} />
                            ) : (
                                <XCircle size={32} />
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {title}
                        </h3>

                        <p className="text-gray-600 mb-6 font-montserrat text-sm leading-relaxed">
                            {message}
                        </p>

                        <Button
                            onClick={onClose}
                            className={`w-full py-6 rounded-xl text-white font-medium ${type === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                        >
                            {type === "success" ? "Continue" : "Try Again"}
                        </Button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StatusModal;
