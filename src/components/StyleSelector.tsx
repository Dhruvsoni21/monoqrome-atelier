"use client";

import { motion } from "framer-motion";
import { useStyle, StyleType, styleContent } from "@/lib/StyleContext";
import GlareHover from "./GlareHover";

const styleOptions: { key: StyleType }[] = [
    { key: "confident" },
    { key: "poetic" },
    { key: "bold" },
    { key: "luxury" },
];

interface StyleSelectorProps {
    onSelect?: () => void;
}

export default function StyleSelector({ onSelect }: StyleSelectorProps) {
    const { setCurrentStyle, currentStyle } = useStyle();

    const handleSelect = (style: StyleType) => {
        setCurrentStyle(style);
        if (onSelect) {
            setTimeout(onSelect, 500);
        }
    };

    return (
        <div className="w-full">
            {/* Options Grid - 4 columns on desktop, 2 on tablet and mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6"
            >
                {styleOptions.map(({ key }, index) => {
                    const style = styleContent[key];
                    const isSelected = currentStyle === key;

                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: 0.6 + index * 0.1,
                                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                            }}
                            className="h-full"
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <GlareHover
                                onClick={() => handleSelect(key)}
                                className={`group relative py-6 px-1 sm:p-6 md:p-10 text-center transition-colors duration-500 overflow-hidden w-full h-full flex flex-col items-center justify-center
                                    ${isSelected
                                        ? "bg-stone-900 border-[#cd853f]"
                                        : "bg-stone-950/50 border-stone-700 hover:border-stone-500 hover:bg-stone-900"
                                    }
                                    border
                                `}
                                borderRadius="0"
                                glareColor={isSelected ? "#000000" : "#ffffff"}
                                glareOpacity={isSelected ? 0.1 : 0.3}
                            >
                                {/* Hover glow effect (keep original subtle glow too) */}
                                <span
                                    className={`absolute inset-0 bg-gradient-to-b from-white/10 to-transparent transition-opacity duration-500
                                        ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                                    `}
                                />

                                {/* Name */}
                                <span
                                    className={`relative block text-xs sm:text-sm md:text-base font-semibold tracking-[0.15em] uppercase mb-2 sm:mb-3 transition-colors duration-300
                                        ${isSelected ? "text-[#cd853f]" : "text-white"}
                                    `}
                                >
                                    {style.name}
                                </span>

                                {/* Tagline */}
                                <span
                                    className={`relative text-[10px] sm:text-xs leading-relaxed transition-colors duration-300 w-full px-1 sm:px-0 mx-auto
                                        ${isSelected ? "text-stone-300" : "text-stone-500"}
                                    `}
                                    style={{ textWrap: "balance" }}
                                >
                                    {style.tagline}
                                </span>

                                {/* Selection indicator line */}
                                <motion.span
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#cd853f]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: isSelected ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </GlareHover>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Instruction text */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-12 text-stone-600 text-xs tracking-[0.2em] uppercase"
            >
                Click to select • Content will adapt to your choice
            </motion.p>
        </div>
    );
}
