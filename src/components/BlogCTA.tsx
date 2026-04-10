"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, Instagram, Twitter, Facebook } from "lucide-react";

export default function BlogCTA() {
    return (
        <section className="py-24 px-4 md:px-[5vw] max-w-[1400px] mx-auto w-full relative z-30">
            {/* Main Container with Background */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[3rem] min-h-[600px] flex items-center justify-center border border-white/10 group"
            >
                {/* Background Image with subtle zoom on hover */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/architectural-cta-bg.png"
                        alt="Architectural Vibe"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-grayscale-[0.2]" />
                </div>

                {/* Glassmorphic Panel */}
                <div className="relative z-10 w-[90%] md:w-[85%] max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-16 flex flex-col items-start justify-between min-h-[450px] shadow-2xl">
                    
                    {/* Top Row: Socials & Menu Placeholder */}
                    <div className="w-full flex justify-between items-start mb-12">
                        <div className="flex gap-6 text-white/60">
                            <Facebook className="w-5 h-5 cursor-pointer hover:text-[#cd853f] transition-colors" />
                            <Twitter className="w-5 h-5 cursor-pointer hover:text-[#cd853f] transition-colors" />
                            <Instagram className="w-5 h-5 cursor-pointer hover:text-[#cd853f] transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5 cursor-pointer group/menu">
                            <span className="w-8 h-[2px] bg-white group-hover/menu:w-6 transition-all" />
                            <span className="w-6 h-[2px] bg-white group-hover/menu:w-8 transition-all" />
                        </div>
                    </div>

                    {/* Middle Row: Luxury Headline & Circular Arrow */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="max-w-2xl">
                            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-tight leading-[0.9] mb-8">
                                TRANSLATING <br />
                                <span className="italic text-stone-300">VISION</span> INTO <br />
                                REALITY
                            </h2>
                            <p className="text-white/60 text-lg md:text-xl font-light max-w-lg mb-8 leading-relaxed">
                                Our design philosophy balances the poetic with the precise. Begin your journey toward a masterpiece today.
                            </p>
                            
                            <Link href="/contact" className="inline-flex items-center gap-4 group/btn">
                                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white border-b border-white/20 pb-1 group-hover/btn:border-white transition-all">
                                    Discuss Post
                                </span>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                                    <ArrowDownRight className="w-5 h-5" />
                                </div>
                            </Link>
                        </div>

                        {/* Large Circular Arrow - Signature Element */}
                        <div className="hidden md:flex w-32 h-32 rounded-full border border-white/10 items-center justify-center text-white/20 hover:text-white hover:border-white/40 transition-all duration-700 cursor-pointer group/circle">
                            <ArrowDownRight className="w-16 h-16 group-hover/circle:translate-x-1 group-hover/circle:translate-y-1 transition-transform" />
                        </div>
                    </div>

                    {/* Bottom Row: Trust Line */}
                    <div className="w-full mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.4em] text-white/40 font-medium">
                        <span className="hover:text-[#cd853f] cursor-default transition-colors">Free Consultation</span>
                        <span className="hover:text-[#cd853f] cursor-default transition-colors">No Obligation</span>
                        <span className="hover:text-[#cd853f] cursor-default transition-colors">Expert Guidance</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
