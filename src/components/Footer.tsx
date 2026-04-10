"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#highlighted", label: "Featured" },
    { href: "#projects", label: "Projects" },
    { href: "/blog", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const scrollToSection = (href: string) => {
        if (!href.startsWith("#")) return;
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer id="contact" ref={ref} className="bg-stone-950 border-t border-white/5 z-20 relative">
            <div className="max-w-[1400px] mx-auto px-[5vw] py-16">
                <div className="grid md:grid-cols-2 gap-12 pb-12 border-b border-white/10">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-serif text-2xl md:text-3xl font-semibold tracking-[0.15em] text-white">
                            MonoQrome <span className="text-stone-400 font-light">Atelier</span>
                        </span>
                        <p className="text-stone-400 mt-4 max-w-sm">
                            Transforming spaces into extraordinary experiences
                        </p>
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-wrap gap-12 md:justify-end"
                    >
                        {/* Navigation */}
                        <div>
                            <h5 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-6">
                                Navigation
                            </h5>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                if (link.href.startsWith("#")) {
                                                    e.preventDefault();
                                                    scrollToSection(link.href);
                                                }
                                            }}
                                            className="text-sm text-stone-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h5 className="text-xs font-semibold tracking-[0.2em] uppercase text-white mb-6">
                                Contact
                            </h5>
                            <ul className="space-y-3 text-sm text-stone-400">
                                <li>
                                    <a
                                        href="mailto:hello@kaku.design"
                                        className="hover:text-white transition-colors"
                                    >
                                        hello@kaku.design
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+1234567890"
                                        className="hover:text-white transition-colors"
                                    >
                                        +1 (234) 567-890
                                    </a>
                                </li>
                                <li className="leading-relaxed">
                                    123 Design Street
                                    <br />
                                    New York, NY 10001
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="pt-8 text-center"
                >
                    <p className="text-xs text-stone-500">
                        © 2026 MonoQrome Atelier. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
