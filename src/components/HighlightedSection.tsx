"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useStyle } from "@/lib/StyleContext";

interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    placeholder: string;
    youtubeUrl?: string;
    thumbnail?: string;
    featured?: boolean;
}

// Default content when no style selected
const defaultContent = {
    highlightedTitle: "Selected",
    highlightedTitleHighlight: "Works",
};

export default function HighlightedSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { content, hasSelected } = useStyle();
    const [fetchedProjects, setFetchedProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => setFetchedProjects(data || []))
            .catch(console.error);
    }, []);

    // Use style content if selected, otherwise use default
    const displayContent = hasSelected && content ? content : defaultContent;

    const featuredProjects = fetchedProjects.filter(p => p.featured);
    const displayProjects = featuredProjects.length > 0 ? featuredProjects : fetchedProjects;

    return (
        <section
            id="highlighted"
            ref={ref}
            className="relative py-24 md:py-32 bg-stone-950 z-20"
        >
            {/* Header */}
            <div className="max-w-[1400px] mx-auto px-[5vw] mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-xs font-semibold tracking-[0.3em] uppercase text-stone-400 mb-4 block"
                >
                    Featured Work
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif text-4xl md:text-5xl font-light"
                >
                    {displayContent.highlightedTitle}
                    <br />
                    <span className="text-white italic">{displayContent.highlightedTitleHighlight}</span>
                </motion.h2>
            </div>

            {/* Grid */}
            <div className="max-w-[1400px] mx-auto px-[5vw]">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Large Featured */}
                    {displayProjects.length > 0 && (
                        <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="md:col-span-2 group cursor-pointer relative overflow-hidden"
                        >
                            <div className="aspect-video bg-stone-900 bg-gradient-to-br from-stone-800 to-stone-900 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                                {displayProjects[0].thumbnail ? (
                                    <img src={displayProjects[0].thumbnail} alt={displayProjects[0].title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                ) : (
                                    <span className="text-2xl text-stone-600 font-serif italic">
                                        {displayProjects[0].placeholder}
                                    </span>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-300">
                                    {displayProjects[0].category}
                                </span>
                                <h3 className="font-serif text-3xl font-light mt-2 mb-3">
                                    {displayProjects[0].title}
                                </h3>
                                <p className="text-stone-300 text-sm">
                                    {displayProjects[0].location}
                                </p>
                            </div>
                        </motion.article>
                    )}

                    {/* Smaller Featured Projects */}
                    {displayProjects.slice(1, 4).map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                            className="group cursor-pointer relative overflow-hidden"
                        >
                            <div className="aspect-video bg-stone-900 bg-gradient-to-br from-stone-800 to-stone-900 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                                {project.thumbnail ? (
                                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                ) : (
                                    <span className="text-xl text-stone-600 font-serif italic">
                                        {project.placeholder}
                                    </span>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-300">
                                    {project.category}
                                </span>
                                <h3 className="font-serif text-2xl font-light mt-2 mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-stone-300 text-sm capitalize">{project.location}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
