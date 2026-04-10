"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate an API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <LenisProvider>
            <Navbar />
            <main className="min-h-screen bg-stone-950 pt-32 md:pt-48 pb-24 px-[5vw]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                        
                        {/* Left Side: Editorial Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-xl"
                        >
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#cd853f] mb-8 block">
                                Connect with Us
                            </span>
                            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] mb-10">
                                COLLABORATE <br />
                                <span className="italic text-stone-400">WITH</span> <br />
                                ATELIER
                            </h1>
                            <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed mb-12">
                                Every extraordinary space begins with a thoughtful dialogue. Whether you are reimagining your private sanctuary or envisioning a conceptual workspace, we are here to translate your vision into reality.
                            </p>
                            
                            <div className="space-y-8 border-t border-white/10 pt-12">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-2">Email Inquiries</h4>
                                    <p className="text-lg font-serif italic text-white hover:text-[#cd853f] transition-colors cursor-pointer">hello@monoqrome.design</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-2">Visit our Studio</h4>
                                    <p className="text-stone-400 font-light">
                                        123 Architecture Lane, <br />
                                        Design District, NY 10001
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: The Inquiry Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {!isSubmitted ? (
                                <div className="bg-stone-900/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl">
                                    <h2 className="font-serif text-3xl text-white mb-2">Request a Consultation</h2>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-10 pb-8 border-b border-white/5">
                                        Estimate: 15-Minute Narrative Alignment
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">First Name</label>
                                                <input required type="text" className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#cd853f] transition-all" placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Last Name</label>
                                                <input required type="text" className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#cd853f] transition-all" placeholder="Doe" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Work Email</label>
                                            <input required type="email" className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#cd853f] transition-all" placeholder="john@atelier.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">Phone Number</label>
                                            <input required type="tel" className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#cd853f] transition-all" placeholder="+1 (555) 000-0000" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-stone-500 ml-1">The Vision</label>
                                            <textarea required rows={4} className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-3 text-white focus:outline-none focus:border-[#cd853f] transition-all resize-none" placeholder="Briefly describe your dream space..." />
                                        </div>

                                        <button 
                                            disabled={isSubmitting}
                                            type="submit" 
                                            className="w-full bg-[#cd853f] text-black font-semibold uppercase tracking-[0.2em] text-xs py-5 rounded-xl hover:bg-[#b07030] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span>Connect with our studio</span>
                                                    <Send className="w-3 h-3" />
                                                </>
                                            )}
                                        </button>
                                        
                                        <p className="text-center text-[9px] text-stone-600 uppercase tracking-widest leading-relaxed px-4">
                                            By connecting, you agree to our terms of service and private design protocols.
                                        </p>
                                    </form>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-stone-900/40 backdrop-blur-2xl border border-[#cd853f]/20 rounded-[2rem] p-16 flex flex-col items-center text-center shadow-2xl"
                                >
                                    <div className="w-20 h-20 rounded-full bg-[#cd853f]/10 flex items-center justify-center text-[#cd853f] mb-8">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h2 className="font-serif text-4xl text-white mb-4">Vision Received</h2>
                                    <p className="text-stone-400 font-light max-w-xs mx-auto mb-10">
                                        A lead architect will review your inquiry. We look forward to connecting with you within 24 hours.
                                    </p>
                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#cd853f] hover:text-white transition-colors"
                                    >
                                        Send another reflection
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>

                    </div>
                </div>
            </main>
            <Footer />
        </LenisProvider>
    );
}
