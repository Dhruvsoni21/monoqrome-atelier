"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useStyle } from "@/lib/StyleContext";

type Category = "all" | "residences" | "workspaces" | "hospitality" | "conceptual";

interface Project {
    id: string;
    title: string;
    category: Exclude<Category, "all">;
    location: string;
    placeholder: string;
    youtubeUrl?: string; // Support for YouTube links
    thumbnail?: string;
    featured?: boolean;
}

function getYouTubeID(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

const filterButtons: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Residences", value: "residences" },
    { label: "Workspaces", value: "workspaces" },
    { label: "Retail & Hospitality", value: "hospitality" },
    { label: "Conceptual Explorations", value: "conceptual" },
];

// Default content when no style selected
const defaultContent = {
    projectsTitle: "All",
    projectsTitleHighlight: "Projects",
};

export default function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeFilter, setActiveFilter] = useState<Category>("all");
    const [fetchedProjects, setFetchedProjects] = useState<Project[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const { content, hasSelected } = useStyle();

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => setFetchedProjects(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedVideo) {
            window.dispatchEvent(new Event("lenis-stop"));
        } else {
            window.dispatchEvent(new Event("lenis-start"));
        }
        return () => {
            window.dispatchEvent(new Event("lenis-start"));
        };
    }, [selectedVideo]);

    // Use style content if selected, otherwise use default
    const displayContent = hasSelected && content ? content : defaultContent;

    const filteredProjects =
        activeFilter === "all"
            ? fetchedProjects
            : fetchedProjects.filter((p) => p.category === activeFilter);

    return (
        <section
            id="projects"
            ref={ref}
            className="relative py-24 md:py-32 bg-black z-20"
        >
            {/* Header */}
            <div className="max-w-[1400px] mx-auto px-[5vw] mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-4xl md:text-5xl font-light text-white mb-6"
                >
                    All Projects
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-2xl mx-auto space-y-4"
                >
                    <p className="text-stone-300 text-lg md:text-xl font-light">
                        A curated selection of residential and commercial interiors.
                    </p>
                    <p className="text-stone-400 text-sm md:text-base font-light">
                        Each project is a study in contrast, proportion, and quiet detail.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mt-12"
                >
                    {filterButtons.map((btn) => (
                        <button
                            key={btn.value}
                            onClick={() => setActiveFilter(btn.value)}
                            className={`px-5 py-2 text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase border transition-all duration-300 ${activeFilter === btn.value
                                ? "bg-[#cd853f] border-[#cd853f] text-black"
                                : "border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Projects Grid */}
            <div className="max-w-[1400px] mx-auto px-[5vw]">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="group cursor-pointer relative aspect-video overflow-hidden bg-stone-900"
                            >
                                {/* Background Image / Placeholder */}
                                <div className="absolute inset-0 bg-stone-900 bg-gradient-to-br from-stone-800 to-stone-900 transition-transform duration-700 group-hover:scale-105">
                                    {project.thumbnail ? (
                                        <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center opacity-30 group-hover:opacity-20 transition-opacity duration-500">
                                            <span className="text-lg text-stone-600 font-serif italic">
                                                {project.placeholder}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Hover Overlay */}
                                <div
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6"
                                    onClick={() => {
                                        if (project.youtubeUrl) {
                                            setSelectedVideo(project.youtubeUrl);
                                        }
                                    }}
                                >
                                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="inline-block px-4 py-2 bg-[#cd853f] text-black text-[10px] tracking-[0.2em] uppercase font-medium">
                                            {project.youtubeUrl ? "Watch Video →" : "View Project →"}
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Video Modal */}
            {selectedVideo && typeof document !== 'undefined' && createPortal(
                <div
                    data-lenis-prevent="true"
                    className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 px-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="w-full max-w-5xl aspect-video bg-black relative shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeID(selectedVideo)}?autoplay=1`}
                            className="w-full h-full"
                            allowFullScreen
                            title="YouTube Video"
                        />
                    </div>
                    <button
                        className="absolute top-8 right-8 text-white text-4xl hover:text-[#cd853f] transition-colors"
                        onClick={() => setSelectedVideo(null)}
                    >
                        ×
                    </button>
                </div>,
                document.body
            )}
        </section>
    );
}
