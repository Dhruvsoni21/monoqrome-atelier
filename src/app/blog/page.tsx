"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function BlogPage() {
    const containerRef = useRef(null);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        fetch("/api/blogs", { cache: "no-store" })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBlogPosts(data);
                } else {
                    console.error("Failed to load blogs:", data);
                }
            })
            .catch(console.error);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <LenisProvider>
            <main className="bg-black min-h-screen" ref={containerRef}>
                <Navbar />

                {/* Hero Section */}
                <section className="relative h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
                    {/* Background Image Parallax */}
                    <motion.div
                        style={{ y, scale, opacity }}
                        className="absolute inset-0 z-0"
                    >
                        <Image
                            src="/blog-bg.jpg"
                            alt="Blog Background"
                            fill
                            className="object-cover opacity-60 select-none"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative z-10 text-center px-[5vw] max-w-4xl mx-auto"
                    >
                        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#cd853f] mb-6 block">
                            Our Journal
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-light text-white mb-8 leading-none">
                            Thoughts<span className="text-stone-600 block md:inline"> & </span><br className="md:hidden" />
                            <span className="italic text-stone-300">Perspectives</span>
                        </h1>
                        <p className="text-stone-400 max-w-lg mx-auto text-lg md:text-xl font-light leading-relaxed">
                            Exploring the intersection of design, architecture, and the philosophy of living.
                        </p>
                    </motion.div>
                </section>

                {/* Posts Grid */}
                <section className="px-[5vw] max-w-[1400px] mx-auto pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                <Footer />
            </main>
        </LenisProvider>
    );
}
