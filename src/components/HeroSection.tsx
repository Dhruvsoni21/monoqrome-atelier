"use client";



import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import StyleSelector from "./StyleSelector";
import { useStyle } from "@/lib/StyleContext";

const TOTAL_FRAMES = 205;

// Smooth easing functions
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);
    const [showStyleSelector, setShowStyleSelector] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(1);

    const { hasSelected, content } = useStyle();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.4, 0.55], [0, 0, -50]);
    const contentScale = useTransform(scrollYProgress, [0, 0.4, 0.55], [1, 1, 0.95]);

    // Parallax for bottom text section
    const textParallaxY = useTransform(scrollYProgress, [0.7, 1], [100, 0]);

    // Preload all frames
    useEffect(() => {
        const loadImages = async () => {
            const images: HTMLImageElement[] = [];
            let loaded = 0;

            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                const paddedIndex = String(i).padStart(3, "0");
                img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;

                img.onload = () => {
                    loaded++;
                    setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
                    if (loaded === TOTAL_FRAMES) {
                        setImagesLoaded(true);
                    }
                };

                img.onerror = () => {
                    loaded++;
                    if (loaded === TOTAL_FRAMES) {
                        setImagesLoaded(true);
                    }
                };

                images[i] = img;
            }

            imagesRef.current = images;
        };

        loadImages();
    }, []);

    // Intro animation sequence after loading
    useEffect(() => {
        if (imagesLoaded) {
            // Start intro sequence
            const timer1 = setTimeout(() => setShowContent(true), 800);
            const timer2 = setTimeout(() => setIntroComplete(true), 1800);
            const timer3 = setTimeout(() => setShowStyleSelector(true), 2200);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [imagesLoaded]);

    // Smooth frame interpolation on scroll
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container || !imagesLoaded) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const renderFrame = (frameIndex: number, scale: number = 1) => {
            const img = imagesRef.current[Math.round(frameIndex)];
            if (!img || !ctx) return;

            // Clear with a slight overdraw to prevent artifacts
            ctx.clearRect(-1, -1, canvas.width + 2, canvas.height + 2);

            // Apply scale from center
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(scale, scale);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);

            // Cover fit calculation
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            ctx.restore(); // Restore context after scaling

            // Cinematic vignette (drawn on top, unscaled)
            const gradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                canvas.width * 0.7
            );
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.2)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Left side gradient for text readability
            const leftGradient = ctx.createLinearGradient(0, 0, canvas.width * 0.6, 0);
            leftGradient.addColorStop(0, "rgba(0, 0, 0, 0.75)");
            leftGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.3)");
            leftGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = leftGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        // Ultra-smooth frame interpolation with momentum
        let animationFrame: number;
        let lastTime = 0;
        const LERP_FACTOR = 0.04; // Lower = silkier but slower catch-up
        const ZOOM_FACTOR = 0.12; // Adjusted for longer scroll

        const smoothScroll = (timestamp: number) => {
            // Delta-time awareness for consistent speed regardless of refresh rate
            const dt = lastTime ? Math.min((timestamp - lastTime) / 16.667, 2) : 1;
            lastTime = timestamp;

            const scrollTop = window.scrollY;
            const heroHeight = container.offsetHeight - window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(scrollTop / heroHeight, 1));

            // Gentle easing for cinematic feel
            const easedProgress = easeOutCubic(scrollProgress);
            const targetFrame = Math.floor(easedProgress * (TOTAL_FRAMES - 1)) + 1;

            // Calculate target scale (zoom out/in as you scroll)
            // Starts at 1.0, zooms in slightly to 1.15 as you scroll down
            const targetScale = 1.0 + (easedProgress * ZOOM_FACTOR);

            // Smooth interpolation scaled by delta time
            const currentFrame = currentFrameRef.current;
            const adjustedLerp = 1 - Math.pow(1 - LERP_FACTOR, dt);

            // Interpolate frame
            const newFrame = lerp(currentFrame, targetFrame, adjustedLerp);
            currentFrameRef.current = newFrame;

            // Interpolate scale (reusing currentFrameRef logic for simplicity, though normally we'd track scale separately)
            // Since scale maps directly to frame progress, we can compute it from the interpolated frame
            const interpolatedProgress = (newFrame - 1) / (TOTAL_FRAMES - 1);
            const currentScale = 1.0 + (interpolatedProgress * ZOOM_FACTOR);

            const frameToRender = Math.max(1, Math.min(Math.round(newFrame), TOTAL_FRAMES));
            renderFrame(frameToRender, currentScale);
            animationFrame = requestAnimationFrame(smoothScroll);
        };

        resizeCanvas();
        renderFrame(1);

        window.addEventListener("resize", resizeCanvas);
        animationFrame = requestAnimationFrame(smoothScroll);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrame);
        };
    }, [imagesLoaded]);

    // Text animation variants
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            rotateX: -40,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            },
        },
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-[800vh] w-full"
        >
            {/* Canvas Container */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Film Grain Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />


                {/* Cinematic Scroll Prompt */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
                    className="absolute top-[30%] left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-50"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: imagesLoaded && !showStyleSelector ? 1 : 0
                        }}
                        transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-white/90 font-serif text-lg md:text-2xl tracking-[0.3em] font-light uppercase text-center drop-shadow-xl">
                            Scroll to Continue
                        </h1>
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Loading Screen */}
            <AnimatePresence>
                {!imagesLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: easeOutExpo }}
                        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
                    >
                        {/* Animated Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -inset-8 bg-white/10 blur-3xl rounded-full"
                            />
                            <span className="relative text-white text-4xl md:text-6xl font-serif tracking-[0.2em] text-center">
                                MonoQrome<br /><span className="text-3xl md:text-4xl tracking-[0.3em] text-stone-400">Atelier</span>
                            </span>
                        </motion.div>

                        {/* Loading Bar */}
                        <div className="mt-12 w-64 relative">
                            <div className="h-[1px] bg-stone-800 w-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: 0, x: 0 }}
                                    animate={{ width: `${loadProgress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-between mt-4 text-xs tracking-[0.3em] uppercase"
                            >
                                <span className="text-stone-600">Loading</span>
                                <span className="text-white tabular-nums">{loadProgress}%</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Intro Reveal Animation */}
            <AnimatePresence>
                {imagesLoaded && !introComplete && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed inset-0 z-40 pointer-events-none"
                    >
                        <motion.div
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 0 }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                            className="absolute top-0 left-0 right-0 h-1/2 bg-black origin-top"
                        />
                        <motion.div
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 0 }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black origin-bottom"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Style Selector Section - appears at end of frame scroll */}
            <div className="absolute bottom-0 left-0 w-full min-h-screen flex items-center justify-center bg-black/0 pointer-events-none">
                <motion.div
                    style={{ y: textParallaxY }}
                    className="w-full max-w-4xl mx-auto px-8 py-20 text-center pointer-events-auto bg-black/95 rounded-3xl"
                >
                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6"
                    >
                        Choose Your
                        <br />
                        <span className="text-stone-400 italic">Aesthetic</span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-stone-400 text-lg md:text-xl mb-16 max-w-xl mx-auto"
                    >
                        Select a design philosophy that resonates with your vision
                    </motion.p>

                    {/* Style Selector */}
                    <StyleSelector
                        onSelect={() => {
                            // Smooth scroll to about section after selection
                            setTimeout(() => {
                                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                            }, 600);
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
