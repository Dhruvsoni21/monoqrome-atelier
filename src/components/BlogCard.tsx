import Link from "next/link";
import { BlogPost } from "@/lib/blogData";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="block h-full group">
            <div className="h-full bg-stone-900 rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg">
                {/* Image Area */}
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-stone-800 to-stone-950 group-hover:scale-105 transition-transform duration-700 relative overflow-hidden flex items-center justify-center">
                    {post.coverImage && (
                        <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="absolute inset-0 w-full h-full object-cover" 
                        />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-stone-900 relative z-10 transition-colors duration-300 group-hover:bg-stone-800/80">
                    {/* Meta Info */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs md:text-sm text-stone-400 font-light max-w-24 truncate">
                            {post.category || "General"}
                        </span>
                        <span className="text-xs md:text-sm text-[#cd853f] font-light">
                            {post.readTime || "5 Min Read"}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-2 leading-snug group-hover:text-[#cd853f] transition-colors duration-300 capitalize">
                        {post.title}
                    </h3>
                </div>
            </div>
        </Link>
    );
}
