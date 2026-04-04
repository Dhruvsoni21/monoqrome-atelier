"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HighlightedSection from "@/components/HighlightedSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import { useStyle } from "@/lib/StyleContext";
import { AnimatePresence, motion } from "framer-motion";

export default function MainContent() {
    const { hasSelected } = useStyle();

    return (
        <main className="min-h-screen">
            <AnimatePresence>
                {hasSelected && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-50"
                    >
                        <Navbar />
                    </motion.div>
                )}
            </AnimatePresence>

            <HeroSection />

            <AnimatePresence>
                {hasSelected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <AboutSection />
                        <HighlightedSection />
                        <ProjectsSection />
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
