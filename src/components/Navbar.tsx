"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#highlighted", label: "Featured" },
    { href: "#projects", label: "Projects" },
    { href: "/blog", label: "Blogs" },
    { href: "#contact", label: "Contact Us" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            window.dispatchEvent(new Event("lenis-stop"));
        } else {
            window.dispatchEvent(new Event("lenis-start"));
        }
        return () => {
            window.dispatchEvent(new Event("lenis-start"));
        };
    }, [isOpen]);

    const scrollToSection = (href: string) => {
        if (!href.startsWith("#")) return;
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    // Menu button animation variants
    const topLineVariants = {
        closed: { rotate: 0, y: 0 },
        open: { rotate: 45, y: 5 },
    };

    const middleLineVariants = {
        closed: { opacity: 1, x: 0 },
        open: { opacity: 0, x: 20 },
    };

    const bottomLineVariants = {
        closed: { rotate: 0, y: 0 },
        open: { rotate: -45, y: -5 },
    };

    return (
        <>
            {/* Glassy Header Background when scrolled */}
            <div 
                className={cn(
                    "fixed top-0 left-0 right-0 h-24 md:h-28 z-[85] transition-all duration-500 pointer-events-none",
                    isScrolled && !isOpen
                        ? "bg-black/40 backdrop-blur-lg border-b border-white/10 opacity-100"
                        : "opacity-0"
                )} 
            />

            {/* Persistent Logo & Title */}
            <Link
                href="/"
                className={cn(
                    "fixed top-6 left-6 md:top-8 md:left-10 z-[100] flex items-center gap-4 transition-all duration-500 group",
                    isOpen
                        ? "opacity-0 pointer-events-none delay-0" // Hide when menu is open (fade out quickly)
                        : "opacity-100 delay-300" // Show when menu is closed (fade in with delay)
                )}
            >
                <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110">
                    <Image
                        src="/logo.png"
                        alt="MonoQrome Favicon"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="hidden md:flex flex-col">
                    <span className="font-serif text-lg md:text-xl font-medium tracking-[0.1em] text-white/90 leading-none group-hover:text-white transition-colors">
                        MonoQrome
                    </span>
                    <span className="text-[0.6rem] md:text-xs tracking-[0.3em] text-stone-400 font-sans font-light uppercase leading-none mt-1 group-hover:text-stone-300 transition-colors">
                        Atelier
                    </span>
                </div>
            </Link>
            {/* Menu Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-6 right-6 md:top-8 md:right-10 z-[100] w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-500",
                    isOpen
                        ? "bg-transparent"
                        : isScrolled
                            ? "bg-black/80 backdrop-blur-xl border border-white/20"
                            : "bg-black/50 backdrop-blur-sm border border-white/10"
                )}
                aria-label="Toggle menu"
            >
                <motion.span
                    variants={topLineVariants}
                    animate={isOpen ? "open" : "closed"}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                        "w-5 h-0.5 origin-center transition-colors duration-300",
                        isOpen ? "bg-white" : "bg-white"
                    )}
                />
                <motion.span
                    variants={middleLineVariants}
                    animate={isOpen ? "open" : "closed"}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                        "w-5 h-0.5 origin-center transition-colors duration-300",
                        isOpen ? "bg-white" : "bg-white"
                    )}
                />
                <motion.span
                    variants={bottomLineVariants}
                    animate={isOpen ? "open" : "closed"}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                        "w-5 h-0.5 origin-center transition-colors duration-300",
                        isOpen ? "bg-white" : "bg-white"
                    )}
                />
            </motion.button>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[90] bg-black"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px",
                                }}
                            />
                        </div>

                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-4"
                        >
                            <div className="relative w-10 h-10 md:w-12 md:h-12">
                                <Image
                                    src="/logo.png"
                                    alt="MonoQrome Favicon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-lg md:text-xl font-medium tracking-[0.1em] text-white/90 leading-none">
                                    MonoQrome
                                </span>
                                <span className="text-[0.6rem] md:text-xs tracking-[0.3em] text-stone-400 font-sans font-light uppercase leading-none mt-1">
                                    Atelier
                                </span>
                            </div>
                        </motion.div>

                        {/* Navigation Links */}
                        <nav className="h-full flex flex-col items-center justify-center">
                            <ul className="space-y-2 md:space-y-4 text-center">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.href}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{
                                            delay: 0.1 + index * 0.1,
                                            duration: 0.5,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => {
                                                if (link.href.startsWith("#")) {
                                                    e.preventDefault();
                                                    scrollToSection(link.href);
                                                } else {
                                                    setIsOpen(false);
                                                }
                                            }}
                                            className="group relative inline-block font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white hover:text-stone-400 transition-colors duration-300"
                                        >
                                            <span className="relative z-10">{link.label}</span>
                                            {/* Hover underline */}
                                            <motion.span
                                                className="absolute bottom-0 left-0 h-[2px] bg-white"
                                                initial={{ width: 0 }}
                                                whileHover={{ width: "100%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            {/* Number indicator */}
                                            <span className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 text-xs md:text-sm text-stone-600 font-sans tracking-widest">
                                                0{index + 1}
                                            </span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        {/* Footer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute bottom-8 left-6 right-6 md:left-10 md:right-10 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-500 text-xs tracking-widest"
                        >
                            <span>hello@monoqrome.design</span>
                            <span>© 2026 MonoQrome Atelier</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
