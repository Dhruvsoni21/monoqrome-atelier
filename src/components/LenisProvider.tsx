"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface LenisProviderProps {
    children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 3.0, // Increased for ultra-smooth heavy feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.7, // Lower for more weight
            touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Force Lenis to scroll to top on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    // Handle global pause/resume events
    useEffect(() => {
        const handleStop = () => lenisRef.current?.stop();
        const handleStart = () => lenisRef.current?.start();

        window.addEventListener("lenis-stop", handleStop);
        window.addEventListener("lenis-start", handleStart);

        return () => {
            window.removeEventListener("lenis-stop", handleStop);
            window.removeEventListener("lenis-start", handleStart);
        };
    }, []);

    return <>{children}</>;
}
