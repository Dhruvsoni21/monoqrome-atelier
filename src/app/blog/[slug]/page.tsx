"use client";

import { notFound } from "next/navigation"; // Correct import for App Router
import { motion, useScroll, useTransform } from "framer-motion"; // Use Framer Motion for scroll effects
// import Image from "next/image"; // Commented out until we have real images
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogPost } from "@/lib/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import { useRef, use, useEffect, useState } from "react";

// Correctly typing params for App Router page
export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blogs")
            .then(res => res.json())
            .then(data => {
                const found = data.find((p: BlogPost) => p.slug === slug);
                setPost(found || null);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [slug]);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    if (isLoading) {
        return (
            <div ref={ref} className="min-h-screen bg-black flex items-center justify-center text-white font-serif">
                Loading...
            </div>
        );
    }

    if (!post) {
        notFound();
    }

    return (
        <LenisProvider>
            <main className="bg-black min-h-screen text-stone-200" ref={ref}>
                <Navbar />

                <header className="relative h-[60vh] md:h-[70vh] overflow-hidden w-full bg-stone-900 flex items-center justify-center">
                    <motion.div
                        style={{ opacity }}
                        className="absolute inset-0 z-0"
                    >
                        {post.coverImage ? (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-50" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-950 opacity-50" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 pointer-events-none" />
                    </motion.div>
                </header>

                {/* Article Content Area */}
                <div className="relative z-20 bg-black min-h-screen">
                    {/* Overlapping Header Card */}
                    <div className="max-w-[1200px] mx-auto px-6 mt-[-10vh] md:mt-[-15vh] relative z-30">
                        <div className="bg-stone-900 border border-white/5 shadow-2xl rounded-3xl p-8 md:p-16 flex flex-col items-center text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full max-w-3xl mx-auto"
                            >
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center text-xs tracking-[0.2em] uppercase text-[#cd853f] mb-8 hover:text-white transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
                                </Link>

                                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 text-white text-balance capitalize">
                                    {post.title}
                                </h1>

                                <div className="flex flex-col flex-wrap sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-stone-400 font-light tracking-wide">
                                    <span>{post.date}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>{post.category || "General"}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="text-[#cd853f]">{post.readTime || "5 Min Read"}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content & TOC */}
                    <article className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-24">

                        <div className="flex-1 max-w-3xl order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="prose prose-invert prose-lg md:prose-xl prose-stone w-full max-w-none
                                    prose-headings:font-serif prose-headings:font-light prose-headings:text-white prose-headings:scroll-mt-32
                                    prose-p:font-light prose-p:leading-loose prose-p:text-stone-300
                                    prose-blockquote:border-l-[#cd853f] prose-blockquote:bg-stone-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
                                    prose-strong:text-white prose-strong:font-normal
                                "
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Author Bio (Simple) */}
                            <div className="mt-20 pt-12 border-t border-white/10 flex items-center gap-4">
                                <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center text-xl font-serif text-white shrink-0">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-serif text-lg">Written by {post.author}</p>
                                    <p className="text-stone-500 text-sm">Lead Architect @ MonoQrome</p>
                                </div>
                            </div>
                        </div>

                        {/* Table of Contents (Sticky sidebar for desktop) */}
                        {post.tableOfContents && post.tableOfContents.length > 0 && (
                            <aside className="lg:w-72 shrink-0 order-1 lg:order-2 mb-12 lg:mb-0">
                                <div className="lg:sticky lg:top-32 bg-stone-900/50 rounded-2xl p-6 border border-white/5">
                                    <h3 className="text-xs uppercase tracking-[0.2em] text-[#cd853f] mb-6 font-semibold border-b border-stone-800 pb-4">Table of Contents</h3>
                                    <ul className="space-y-4 text-stone-400 text-sm font-light">
                                        {post.tableOfContents.map((item) => (
                                            <li key={item.id}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className="hover:text-white transition-colors flex items-start before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#cd853f] before:rounded-full before:mr-3 before:mt-1.5 before:shrink-0"
                                                >
                                                    {item.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        )}
                    </article>
                </div>

                <Footer />
            </main>
        </LenisProvider>
    );
}
