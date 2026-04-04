"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type StyleType = "confident" | "poetic" | "bold" | "luxury";

interface StyleContent {
    name: string;
    tagline: string;
    heroTitle: string[];
    heroDescription: string;
    aboutTitle: string;
    aboutTitleHighlight: string;
    aboutDescription1: string;
    aboutDescription2: string;
    highlightedTitle: string;
    highlightedTitleHighlight: string;
    projectsTitle: string;
    projectsTitleHighlight: string;
}

const styleContent: Record<StyleType, StyleContent> = {
    confident: {
        name: "Confident",
        tagline: "Spaces shaped by restraint, clarity, and contrast.",
        heroTitle: ["Defining", "Spaces with", "Precision"],
        heroDescription:
            "Architecture of clarity. We craft environments where every element speaks with purpose—bold contrasts, clean lines, decisive design.",
        aboutTitle: "Where Precision Meets",
        aboutTitleHighlight: "Purpose",
        aboutDescription1:
            "At MonoQrome Atelier, we master the art of interior design through balance, material honesty, and purposeful minimalism. We don't just decorate; we compose spaces where light, proportion, and texture dictate the atmosphere. Our signature restrained palette maximizes expression without unnecessary noise.",
        aboutDescription2:
            "Whether residential or commercial, our process is absolute: we study exactly how a space will be lived in, and we execute with thoughtful design, precise detailing, and uncompromising clarity.",
        highlightedTitle: "Defining",
        highlightedTitleHighlight: "Statements",
        projectsTitle: "Decisive",
        projectsTitleHighlight: "Designs",
    },
    poetic: {
        name: "Poetic",
        tagline: "Where calm becomes a design language.",
        heroTitle: ["Whispered", "Elegance in", "Stillness"],
        heroDescription:
            "Spaces that breathe softly. We compose environments of quiet beauty, where light dances and tranquility becomes tangible.",
        aboutTitle: "Where Serenity Becomes",
        aboutTitleHighlight: "Form",
        aboutDescription1:
            "MonoQrome Atelier breathes life into spaces through a delicate dance of balance, honest materials, and mindful minimalism. We believe a room should feel beautifully composed—an unspoken harmony where light, proportion, and texture take center stage. Within our quiet, restrained palettes lies a boundless depth of expression.",
        aboutDescription2:
            "Before a single line is drawn, we listen to the heartbeat of the space to understand how it will be felt and experienced. From intimate sanctuaries to grand commercial stages, our devotion remains constant: to weave thoughtful design, meticulous detail, and pure clarity into every environment.",
        highlightedTitle: "Gentle",
        highlightedTitleHighlight: "Narratives",
        projectsTitle: "Serene",
        projectsTitleHighlight: "Spaces",
    },
    bold: {
        name: "Bold",
        tagline: "Intentional interiors. Nothing unnecessary.",
        heroTitle: ["Pure", "Intentional", "Design"],
        heroDescription:
            "Every line has purpose. We create spaces stripped to their essence—where bold decisions eliminate doubt and design becomes undeniable.",
        aboutTitle: "Where Intent Shapes",
        aboutTitleHighlight: "Reality",
        aboutDescription1:
            "We are MonoQrome Atelier. We don’t decorate; we define. Driven by radical balance, unapologetic material honesty, and relentless minimalism, our spaces are intentionally composed. We let light, proportion, and raw texture do the heavy lifting. By relying on a restrained palette, we deliver maximum impact—stripping away the unnecessary to reveal pure expression.",
        aboutDescription2:
            "Function dictates form: we demand to know how a space will be used before we transform it. From private homes to commercial hubs, our formula is unapologetic: intentional design, razor-sharp detailing, and absolute clarity.",
        highlightedTitle: "Unapologetic",
        highlightedTitleHighlight: "Statements",
        projectsTitle: "Intentional",
        projectsTitleHighlight: "Impact",
    },
    luxury: {
        name: "Luxury",
        tagline: "Timeless interiors, quietly expressive.",
        heroTitle: ["Timeless", "Quiet", "Luxury"],
        heroDescription:
            "Elegance that whispers. We craft spaces of understated opulence—where refined materials and impeccable craft create enduring beauty.",
        aboutTitle: "Where Timelessness Meets",
        aboutTitleHighlight: "Refinement",
        aboutDescription1:
            "Welcome to MonoQrome Atelier, an exclusive interior design studio defined by impeccable balance, material integrity, and elevated minimalism. We curate spaces that feel masterfully composed rather than merely decorated, celebrating the elegant interplay of natural light, grand proportions, and exquisite textures.",
        aboutDescription2:
            "Our aesthetic is grounded in a sophisticated, restrained palette that offers bespoke, limitless expression. Every commission begins with a profound understanding of the client's lifestyle and the refined experience of the space. Across premium private residences and high-end commercial environments, our ethos is unwavering: visionary design, exacting precision, and a flawless clarity of vision.",
        highlightedTitle: "Enduring",
        highlightedTitleHighlight: "Excellence",
        projectsTitle: "Refined",
        projectsTitleHighlight: "Collections",
    },
};

interface StyleContextType {
    currentStyle: StyleType | null;
    setCurrentStyle: (style: StyleType) => void;
    content: StyleContent | null;
    hasSelected: boolean;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: ReactNode }) {
    const [currentStyle, setCurrentStyleState] = useState<StyleType | null>(null);

    const setCurrentStyle = (style: StyleType) => {
        setCurrentStyleState(style);
    };

    const content = currentStyle ? styleContent[currentStyle] : null;
    const hasSelected = currentStyle !== null;

    return (
        <StyleContext.Provider value={{ currentStyle, setCurrentStyle, content, hasSelected }}>
            {children}
        </StyleContext.Provider>
    );
}

export function useStyle() {
    const context = useContext(StyleContext);
    if (context === undefined) {
        throw new Error("useStyle must be used within a StyleProvider");
    }
    return context;
}

export { styleContent };
