"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    // Generate JSON-LD Schema for SEO
    const schemaOrgJSONLD = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="max-w-[800px] mx-auto w-full py-16 px-6 relative z-30">
            {/* Inject JSON-LD into the head for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
            />

            <h2 className="font-serif text-3xl md:text-4xl text-white mb-10 text-center font-light">
                Frequently Asked <span className="italic text-stone-400">Questions</span>
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div 
                            key={idx} 
                            className={`border-b border-white/10 overflow-hidden transition-colors duration-500 ${isOpen ? 'bg-stone-900/40 rounded-xl border-transparent px-4 sm:px-6' : 'hover:border-white/30'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
                            >
                                <span className={`font-serif text-lg md:text-xl transition-colors duration-300 ${isOpen ? 'text-[#cd853f]' : 'text-stone-200 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <span className="ml-4 shrink-0 text-stone-500 group-hover:text-white transition-colors duration-300">
                                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="pb-6 pt-0 text-stone-400 font-light leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
