"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProceed: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onProceed }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95%] md:w-full md:max-w-3xl max-h-[85vh] flex flex-col p-4 md:p-6 bg-white rounded-2xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl font-bold text-center mb-2">Cre8Core Labs Bounty Creation & Participation Terms</DialogTitle>
                    <DialogDescription className="text-center text-gray-500 text-sm md:text-base">
                        Please read and accept the terms to proceed.
                    </DialogDescription>
                </DialogHeader>




                <div className="flex-1 overflow-y-auto px-4 py-4 my-2 border rounded-lg bg-gray-50 text-sm font-montserrat text-gray-700 space-y-4">
                    <p className="font-semibold">
                        By creating a bounty on Cre8Core Labs, the project creating the bounty (“Project”) agrees to the following terms and conditions:
                    </p>

                    <section>
                        <h4 className="font-bold text-black mb-1">1. Accuracy of Information</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>The Project is solely responsible for ensuring that all bounty information is complete, accurate, and clearly stated.</li>
                            <li>Each bounty must explicitly define the submission requirements, evaluation criteria, bounty category, deadline, and any other information reasonably required for participants to successfully complete the task.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">2. Responsibility for Bounty Scope</h4>
                        <p>The Project is solely responsible for:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Defining the scope, deliverables, and success criteria of the bounty</li>
                            <li>Ensuring the bounty requirements are realistic, lawful, and achievable within the stated timeline</li>
                        </ul>
                        <p className="mt-1">Cre8Core Labs shall not be responsible for unclear or poorly defined bounty requirements.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">3. Prize Pool Definition</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>All prize pools and reward distributions must be fully determined prior to the publication of the bounty. Open-ended or undefined reward structures are strictly prohibited.</li>
                            <li>All rewards must be denominated and paid in USDC on Base.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">4. Funding & Verification Requirement</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>The Project must fully fund the bounty immediately upon creation. This includes the total prize pool and all applicable operational and platform fees.</li>
                            <li>Any bounty that is not fully funded shall remain unverified and will not be published or made publicly accessible.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">5. Fair Evaluation Obligation</h4>
                        <p>The Project agrees to evaluate submissions fairly, transparently, and in good faith, strictly in accordance with the evaluation criteria stated at the time of bounty publication.</p>
                        <p className="mt-1">Any attempt to arbitrarily reject valid submissions may result in intervention by Cre8Core Labs.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">6. Winner Selection & Disbursement</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>The Project shall select winning submissions within one (1) week after the bounty has officially ended.</li>
                            <li>If the Project fails to select winners within this timeframe, Cre8Core Labs reserves the right, at its sole discretion, to evaluate submissions and determine the winners.</li>
                            <li>All reward disbursements shall be processed and distributed by Cre8Core Labs, and such decisions and distributions shall be deemed final.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">7. Platform Fee</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>All bounties published via the Cre8core Labs platform are subject to a non-refundable platform fee equal to twenty percent (20%) of the total prize pool.</li>
                            <li>This fee must be paid upfront and in full alongside the bounty funding amount prior to verification.</li>
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">8. Platform Role Disclaimer</h4>
                        <p>Cre8Core Labs acts solely as a facilitation and administration platform.</p>
                        <p className="mt-1">The platform does not guarantee the quality of submissions or outcomes of any bounty and does not act as an agent, partner, or employer of the Project.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">9. Right of Enforcement</h4>
                        <p>Cre8Core Labs reserves the right to suspend, reject, or remove any bounty that violates these terms or is deemed misleading, incomplete, or detrimental to participants or the platform.</p>
                    </section>

                    <section>
                        <h4 className="font-bold text-black mb-1">10. Acceptance of Terms</h4>
                        <p>By proceeding with bounty creation, the Project acknowledges that it has read, understood, and agreed to be legally bound by these terms and conditions.</p>
                    </section>
                </div>

                <DialogFooter className="mt-4 flex gap-3 sm:justify-center w-full">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 max-w-[200px] border-[#E4B95C] text-black hover:bg-[#E4B95C]/10 rounded-full py-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onProceed}
                        className="flex-1 max-w-[200px] bg-[#E4B95C] text-black hover:bg-[#E4B95C]/80 rounded-full py-6 font-semibold"
                    >
                        Proceed
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TermsModal;
