"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BlogCTA() {
    return (
        <section className="py-24 px-4 md:px-[5vw] max-w-[1400px] mx-auto w-full relative z-30">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[2rem] bg-stone-900 border border-white/5 py-24 px-6 md:px-16 text-center flex flex-col items-center"
            >
                {/* Elegant subtle glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-1/2 bg-gradient-to-b from-[#cd853f]/5 to-transparent blur-3xl rounded-full" />

                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    
                    <span className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#cd853f] mb-8">
                        <Sparkles className="w-3 h-3" />
                        Bring Your Vision to Life
                    </span>

                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-wide leading-[1.2] mb-8 text-balance">
                        Every Masterpiece Begins With a <span className="italic text-stone-400">Conversation.</span>
                    </h2>
                    
                    <p className="text-stone-400 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-2xl text-balance">
                        Whether you are reimagining a single room or designing a complete residence, collaborate with MonoQrome Atelier to translate your dream home into a profound reality.
                    </p>

                    <Link 
                        href="/contact" 
                        className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#cd853f] text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#b07030] transition-colors duration-500 rounded-sm"
                    >
                        <span>Discuss Your Project</span>
                        <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>

                    {/* Trust Line */}
                    <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                        <span>Free Consultation</span>
                        <span className="text-stone-700">•</span>
                        <span>No Obligation</span>
                        <span className="text-stone-700">•</span>
                        <span>Expert Guidance</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
