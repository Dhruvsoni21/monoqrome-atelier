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
import FAQSection from "@/components/FAQSection";
import BlogCTA from "@/components/BlogCTA";
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

                {/* Hero Section styled like the reference */}
                <div className="pt-24 md:pt-32 pb-8 px-4 md:px-[5vw] max-w-[1600px] mx-auto">
                    {/* Rounded Image Container */}
                    <div className="relative h-[50vh] md:h-[65vh] w-full rounded-[2rem] overflow-hidden bg-stone-900 border border-white/10 shadow-2xl">
                        <motion.div style={{ opacity }} className="absolute inset-0">
                            {post.coverImage ? (
                                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-950" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Overlapping Card - Bottom Left */}
                    <div className="relative z-30 mt-[-60px] md:mt-[-100px] ml-2 md:ml-12 max-w-4xl bg-stone-900 text-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 border border-white/5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex items-start gap-4 md:gap-6"
                        >
                            {/* Circular Back Button */}
                            <Link
                                href="/blog"
                                className="mt-1 flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 text-stone-400 hover:text-white transition-all group"
                                aria-label="Back to Journal"
                            >
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </Link>

                            {/* Title & Meta Info */}
                            <div>
                                <h1 className="font-serif text-3xl md:text-5xl lg:text-5xl font-medium text-white leading-[1.1] mb-4 text-balance">
                                    {post.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-stone-400 font-medium tracking-wide">
                                    <span>{post.date}</span>
                                    <span className="opacity-50">|</span>
                                    <span>{post.category || "General"}</span>
                                    <span className="opacity-50">|</span>
                                    <span className="text-[#cd853f] font-semibold">{post.readTime || "5 Minutes"} Read</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Article Content Area */}
                <div className="relative z-20 bg-black min-h-screen">
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
                                    <p className="text-stone-500 text-sm">{post.authorDescription || "Lead Architect @ MonoQrome"}</p>
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

                    {/* SEO FAQs */}
                    {post.faqs && post.faqs.length > 0 && (
                        <div className="border-t border-white/5 bg-black/50">
                            <FAQSection faqs={post.faqs} />
                        </div>
                    )}

                    {/* Premium Lead Gen CTA */}
                    <BlogCTA />
                </div>

                <Footer />
            </main>
        </LenisProvider>
    );
}
