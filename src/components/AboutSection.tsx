"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useStyle } from "@/lib/StyleContext";

const stats = [
    { number: "250+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "35+", label: "Design Awards" },
];

// Default content when no style selected
const defaultContent = {
    aboutTitle: "Where Art Meets",
    aboutTitleHighlight: "Architecture",
    aboutDescription1: "MonoQrome Atelier is an interior design studio driven by balance, material honesty, and purposeful minimalism. We design spaces that feel composed rather than decorated, where light, proportion, and texture do the heavy lifting. Our work is rooted in a restrained palette, but never limited in expression.",
    aboutDescription2: "Every project begins with understanding how a space is meant to be lived in, used, or experienced. From private residences to commercial environments, our approach remains the same: thoughtful design, precise detailing, and clarity in every decision.",
};

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { content, hasSelected } = useStyle();

    // Use style content if selected, otherwise use default
    const displayContent = hasSelected && content ? content : defaultContent;

    return (
        <section
            id="about"
            ref={ref}
            className="relative py-24 md:py-32 bg-black z-20"
        >
            <div className="max-w-[1400px] mx-auto px-[5vw]">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-gradient-to-br from-stone-800 to-stone-900 flex items-center justify-center">
                            <span className="text-2xl text-stone-600 font-serif italic">
                                Design Philosophy
                            </span>
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute -bottom-8 -left-8 bg-[#cd853f] p-8 shadow-2xl"
                        >
                            <span className="block text-5xl font-serif font-semibold text-black">
                                15+
                            </span>
                            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-black/80">
                                Years of Excellence
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-400 mb-4 block">
                            About Us
                        </span>

                        <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-8">
                            {displayContent.aboutTitle}
                            <br />
                            <span className="text-white italic">{displayContent.aboutTitleHighlight}</span>
                        </h2>

                        <p className="text-stone-400 text-lg mb-6">
                            {displayContent.aboutDescription1}
                        </p>

                        <p className="text-stone-400 text-lg mb-10">
                            {displayContent.aboutDescription2}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <span className="block text-3xl md:text-4xl font-serif font-semibold text-white">
                                        {stat.number}
                                    </span>
                                    <span className="text-xs font-medium tracking-[0.1em] uppercase text-stone-500 mt-2 block">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
