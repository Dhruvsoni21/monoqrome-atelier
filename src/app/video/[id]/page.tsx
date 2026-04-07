"use client";

import { use } from "react";
import { ArrowLeft } from "lucide-react";

export default function VideoPlayerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="fixed inset-0 bg-black flex flex-col z-[9999]">
            <div className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <button 
                    onClick={() => window.close()} 
                    className="text-white hover:text-[#cd853f] transition-colors flex items-center text-xs tracking-[0.2em] uppercase pointer-events-auto bg-black/50 px-4 py-2 rounded"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Close Player
                </button>
            </div>
            <iframe 
                src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`} 
                className="w-full h-full border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
            />
        </div>
    );
}
