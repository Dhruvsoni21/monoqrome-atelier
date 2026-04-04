export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: string; // HTML or Markdown content
    coverImage: string;
    date: string;
    category: "Architecture" | "Interior Design" | "Lifestyle" | "Philosophy" | string;
    author: string;
    readTime: string;
    tableOfContents?: { id: string; title: string }[];
}
