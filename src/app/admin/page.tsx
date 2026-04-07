"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<"projects" | "blogs">("projects");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        fetch("/api/auth/check")
            .then(res => setIsAuthenticated(res.ok))
            .catch(() => setIsAuthenticated(false));
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: loginUsername, password: loginPassword })
            });
            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                const data = await res.json();
                setLoginError(data.error || "Login Failed");
            }
        } catch (error) {
            setLoginError("An error occurred. Please try again.");
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setIsAuthenticated(false);
    };

    if (isAuthenticated === null) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-[#cd853f] font-serif tracking-widest uppercase text-sm">Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans px-4">
                <div className="max-w-md w-full bg-stone-900 border border-stone-800 p-8 md:p-12">
                    <h1 className="text-3xl font-serif text-white mb-2 text-center">Admin Access</h1>
                    <p className="text-xs text-stone-500 text-center uppercase tracking-[0.2em] mb-10">MonoQrome Atelier</p>
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Admin ID</label>
                            <input 
                                required 
                                type="text" 
                                className="w-full bg-black border border-stone-800 p-3 text-white text-sm focus:outline-none focus:border-[#cd853f] transition-colors"
                                value={loginUsername}
                                onChange={e => setLoginUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Password</label>
                            <input 
                                required 
                                type="password" 
                                className="w-full bg-black border border-stone-800 p-3 text-white text-sm focus:outline-none focus:border-[#cd853f] transition-colors"
                                value={loginPassword}
                                onChange={e => setLoginPassword(e.target.value)}
                            />
                        </div>
                        {loginError && <p className="text-red-500 text-xs text-center border border-red-500/20 bg-red-500/10 p-2">{loginError}</p>}
                        <button type="submit" className="w-full py-4 mt-4 bg-[#cd853f] text-black text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#b07030] transition-colors">
                            Authenticate
                        </button>
                        <div className="pt-6 border-t border-stone-800 text-center">
                           <Link href="/" className="inline-flex items-center text-stone-500 hover:text-white transition-colors text-xs tracking-[0.1em] uppercase">
                               <ArrowLeft className="w-3 h-3 mr-2" />
                               Return to Website
                           </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .ql-font-cormorant { font-family: var(--font-serif), serif !important; }
                .ql-font-montserrat { font-family: var(--font-sans), sans-serif !important; }
                .ql-font-arial { font-family: Arial, Helvetica, sans-serif !important; }
                .ql-font-comic-sans { font-family: 'Comic Sans MS', 'Comic Sans', cursive !important; }
                .ql-font-times-new-roman { font-family: 'Times New Roman', Times, serif !important; }
                
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="cormorant"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="cormorant"]::before {
                    content: 'Cormorant' !important;
                    font-family: var(--font-serif), serif !important;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="montserrat"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="montserrat"]::before {
                    content: 'Montserrat' !important;
                    font-family: var(--font-sans), sans-serif !important;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="arial"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="arial"]::before {
                    content: 'Arial' !important;
                    font-family: Arial, Helvetica, sans-serif !important;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="comic-sans"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="comic-sans"]::before {
                    content: 'Comic Sans' !important;
                    font-family: 'Comic Sans MS', cursive !important;
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="times-new-roman"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="times-new-roman"]::before {
                    content: 'Times New Roman' !important;
                    font-family: 'Times New Roman', Times, serif !important;
                }
            `}} />
            <div className="min-h-screen bg-black text-stone-300 p-8 pt-32 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center justify-start gap-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-serif font-light text-white">Admin Dashboard</h1>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="inline-flex items-center text-[#cd853f] hover:text-white transition-colors text-xs tracking-[0.2em] uppercase font-medium">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Return to Website
                        </Link>
                        <button onClick={handleLogout} className="inline-flex items-center text-stone-500 hover:text-red-400 transition-colors text-xs tracking-[0.2em] uppercase font-medium">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
                <div className="flex space-x-4 mb-8 border-b border-stone-800 pb-4">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${activeTab === "projects" ? "bg-[#cd853f] text-black" : "border border-stone-800 text-stone-500 hover:text-stone-300"}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("blogs")}
                        className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${activeTab === "blogs" ? "bg-[#cd853f] text-black" : "border border-stone-800 text-stone-500 hover:text-stone-300"}`}
                    >
                        Blogs
                    </button>
                </div>
                {activeTab === "projects" ? <ProjectManager /> : <BlogManager />}
            </div>
        </div>
        </>
    );
}

const inputClasses = "w-full bg-stone-900 border border-stone-800 p-3 text-white text-sm focus:outline-none focus:border-[#cd853f] transition-colors";

function ProjectManager() {
    const initialFormState = { title: "", category: "residences", location: "", placeholder: "", youtubeUrl: "", thumbnail: "", featured: false };
    const [formData, setFormData] = useState(initialFormState);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [manualImageUrl, setManualImageUrl] = useState("");
    const [status, setStatus] = useState("");
    const [projects, setProjects] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data || []);
        } catch (err) {
            console.error("Failed to load projects", err);
        }
    };

    const uploadImageToCloudinary = async (file: File) => {
        try {
            const signRes = await fetch('/api/cloudinary-sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paramsToSign: { folder: 'project_thumbnails' } })
            });
            const signData = await signRes.json();
            if (!signData.signature) throw new Error("Failed to get signature");

            const imgData = new FormData();
            imgData.append('file', file);
            imgData.append('api_key', signData.apiKey); 
            imgData.append('timestamp', signData.timestamp.toString());
            imgData.append('signature', signData.signature);
            imgData.append('folder', 'project_thumbnails');

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`, {
                method: 'POST',
                body: imgData
            });

            if (!uploadRes.ok) {
                const errData = await uploadRes.json();
                console.error("Cloudinary error:", errData);
                throw new Error(errData.error?.message || "Cloudinary upload failed");
            }

            const uploadData = await uploadRes.json();
            return uploadData.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw new Error("Failed to upload image.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Saving...");
        try {
            let finalImageUrl = formData.thumbnail;
            if (manualImageUrl) {
                finalImageUrl = manualImageUrl;
            } else if (imageFile) {
                finalImageUrl = await uploadImageToCloudinary(imageFile);
            }

            const url = "/api/projects";
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { ...formData, thumbnail: finalImageUrl, id: editingId } : { ...formData, thumbnail: finalImageUrl };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setStatus(editingId ? "Project updated successfully!" : "Project added successfully!");
                handleCancelEdit();
                fetchProjects();
            } else {
                setStatus("Failed to save project.");
            }
        } catch (error) {
            setStatus("Error saving project.");
        }
    };

    const handleEdit = (project: any) => {
        setFormData({
            title: project.title || "",
            category: project.category || "residences",
            location: project.location || "",
            placeholder: project.placeholder || "",
            youtubeUrl: project.youtubeUrl || "",
            thumbnail: project.thumbnail || "",
            featured: project.featured || false
        });
        setEditingId(project.id);
        setImageFile(null);
        setManualImageUrl(project.thumbnail || "");
        setStatus("Editing project: " + project.title);
        
        const fileInput = document.getElementById('projectImageInput') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
        setStatus("Deleting...");
        try {
            const res = await fetch("/api/projects", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setStatus("Project deleted.");
                fetchProjects();
                if (editingId === id) {
                    setFormData(initialFormState);
                    setEditingId(null);
                }
            } else {
                setStatus("Failed to delete project.");
            }
        } catch (error) {
            setStatus("Error deleting project.");
        }
    };

    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setEditingId(null);
        setImageFile(null);
        setManualImageUrl("");
        setStatus("");
        const fileInput = document.getElementById('projectImageInput') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-serif text-white mb-4">
                    {editingId ? "Edit Project" : "Add New Project"}
                </h2>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Title</label>
                    <input required type="text" className={inputClasses} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Category</label>
                    <select className={inputClasses} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                        <option value="residences">Residences</option>
                        <option value="workspaces">Workspaces</option>
                        <option value="hospitality">Retail & Hospitality</option>
                        <option value="conceptual">Conceptual Explorations</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Location</label>
                    <input required type="text" className={inputClasses} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Placeholder Text (Optional)</label>
                    <input type="text" className={inputClasses} value={formData.placeholder} onChange={e => setFormData({ ...formData, placeholder: e.target.value })} />
                </div>
                <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">YouTube Video URL</label>
                    <input type="text" className={inputClasses} placeholder="https://www.youtube.com/watch?v=..." value={formData.youtubeUrl} onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })} />
                </div>

                <div className="flex items-center gap-3">
                    <input 
                        type="checkbox" 
                        id="featured" 
                        checked={formData.featured}
                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded border-stone-800 bg-stone-900 focus:ring-[#cd853f]"
                    />
                    <label htmlFor="featured" className="text-sm font-serif tracking-wide text-white">Mark as Featured Work</label>
                </div>

                <div className="border border-stone-800 p-4 space-y-4">
                    <label className="block text-xs uppercase tracking-wider text-stone-500">Thumbnail Image</label>
                    {editingId && formData.thumbnail && !imageFile && !manualImageUrl && (
                        <div className="mb-4">
                            <span className="text-xs text-stone-400">Current Thumbnail:</span>
                            <img src={formData.thumbnail} alt="Current thumbnail" className="mt-2 h-20 w-auto rounded border border-stone-800" />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs text-stone-400 mb-2">Upload from computer:</label>
                        <input
                            id="projectImageInput"
                            type="file"
                            accept="image/*"
                            className="w-full text-stone-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:bg-[#cd853f] file:text-black hover:file:bg-[#b07030]"
                            onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                    setImageFile(e.target.files[0]);
                                    setManualImageUrl(""); 
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-4 text-stone-600">
                        <hr className="flex-grow border-stone-800" />
                        <span className="text-xs uppercase">OR</span>
                        <hr className="flex-grow border-stone-800" />
                    </div>
                    <div>
                        <label className="block text-xs text-stone-400 mb-2">Enter Image URL directly:</label>
                        <input
                            type="text"
                            className={inputClasses}
                            value={manualImageUrl}
                            onChange={e => {
                                setManualImageUrl(e.target.value);
                                setImageFile(null); 
                                const fileInput = document.getElementById('projectImageInput') as HTMLInputElement;
                                if (fileInput) fileInput.value = "";
                            }}
                            placeholder="https://..."
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="px-6 py-3 bg-[#cd853f] text-black text-sm uppercase tracking-wider font-medium hover:bg-[#b07030] transition-colors">
                        {editingId ? "Update Project" : "Save Project"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="px-6 py-3 border border-stone-800 text-stone-400 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors">
                            Cancel
                        </button>
                    )}
                </div>
                {status && <p className="mt-4 text-sm text-stone-400">{status}</p>}
            </form>

            {/* List Section */}
            <div>
                <h2 className="text-2xl font-serif text-white mb-4">Manage Projects</h2>
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                    {projects.map(project => (
                        <div key={project.id} className="bg-stone-900 border border-stone-800 p-4 flex justify-between items-center group hover:border-stone-700 transition-colors">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-serif">{project.title}</h3>
                                    {project.featured && <span className="text-[10px] uppercase font-bold tracking-widest bg-[#cd853f] text-black px-2 py-0.5 rounded-sm">Featured</span>}
                                </div>
                                <p className="text-xs text-stone-500 mt-1 capitalize">{project.category} • {project.location}</p>
                            </div>
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(project)} className="text-[#cd853f] hover:text-white text-sm">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(project.id, project.title)} className="text-red-500 hover:text-red-400 text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <p className="text-stone-500 text-sm">No projects found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function BlogManager() {
    const initialFormState = {
        title: "", content: "", date: new Date().toISOString().split('T')[0], category: "Architecture", author: "Dhruv", authorDescription: "Lead Architect @ MonoQrome", readTime: "", coverImage: ""
    };
    const [formData, setFormData] = useState(initialFormState);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [manualImageUrl, setManualImageUrl] = useState("");
    
    const [status, setStatus] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [quillReady, setQuillReady] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchBlogs();
        
        import("quill").then(async (QuillModule) => {
            const Quill = QuillModule.default;
            if (Quill) {
                const Font = Quill.import('formats/font') as any;
                // Add new fonts to the original whitelist array instead of replacing it, so default works
                Font.whitelist = ['cormorant', 'montserrat', 'arial', 'comic-sans', 'times-new-roman', 'sans-serif', 'serif', 'monospace'];
                Quill.register(Font, true);

                // Register BlotFormatter for image resizing
                try {
                    const { default: BlotFormatter } = await import('quill-blot-formatter');
                    Quill.register('modules/blotFormatter', BlotFormatter);
                } catch (e) {
                    console.error("Failed to load blot formatter", e);
                }
            }
            setQuillReady(true);
        });
    }, []);

    useEffect(() => {
        if (isFullscreen) {
            window.dispatchEvent(new Event("lenis-stop"));
        } else {
            window.dispatchEvent(new Event("lenis-start"));
        }
        return () => {
            window.dispatchEvent(new Event("lenis-start"));
        };
    }, [isFullscreen]);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs");
            const data = await res.json();
            setBlogs(data || []);
        } catch (err) {
            console.error("Failed to load blogs", err);
        }
    };

    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: [
                [{ 'font': [false, 'serif', 'monospace', 'cormorant', 'montserrat', 'arial', 'comic-sans', 'times-new-roman'] }, { 'header': [2, 3, false] }],
                [{ 'align': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image']
            ],
            blotFormatter: {}
        }
    });

    const uploadImageToCloudinary = useCallback(async (file: File) => {
        try {
            const signRes = await fetch('/api/cloudinary-sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paramsToSign: { folder: 'blog_covers' } })
            });
            const signData = await signRes.json();
            if (!signData.signature) throw new Error("Failed to get signature");

            const imgData = new FormData();
            imgData.append('file', file);
            imgData.append('api_key', signData.apiKey); 
            imgData.append('timestamp', signData.timestamp.toString());
            imgData.append('signature', signData.signature);
            imgData.append('folder', 'blog_covers');

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`, {
                method: 'POST',
                body: imgData
            });

            if (!uploadRes.ok) {
                const errData = await uploadRes.json();
                console.error("Cloudinary error:", errData);
                throw new Error(errData.error?.message || "Cloudinary upload failed");
            }

            const uploadData = await uploadRes.json();
            return uploadData.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw new Error("Failed to upload image.");
        }
    }, []);

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                // Ignore events if we are programmatically setting content during edit setup
                setFormData(prev => ({ ...prev, content: quill.root.innerHTML }));
            });

            // Add custom image handler for toolbar
            const toolbar = quill.getModule('toolbar') as any;
            toolbar.addHandler('image', () => {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.click();

                input.onchange = async () => {
                    const file = input.files?.[0];
                    if (file) {
                        try {
                            setStatus("Uploading image to cloud...");
                            // Use our existing Cloudinary function
                            const url = await uploadImageToCloudinary(file);
                            const range = quill.getSelection();
                            if (range) {
                                quill.insertEmbed(range.index, 'image', url);
                                quill.setSelection(range.index + 1);
                            }
                            setStatus("Image uploaded successfully.");
                        } catch (error) {
                            console.error("Quill image upload failed:", error);
                            setStatus("Editor image upload failed.");
                        }
                    }
                };
            });
        }
    }, [quill, uploadImageToCloudinary]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(editingId ? "Saving Updates..." : "Uploading & Saving Blog...");

        try {
            let finalImageUrl = formData.coverImage;

            if (manualImageUrl) {
                finalImageUrl = manualImageUrl;
            } else if (imageFile) {
                finalImageUrl = await uploadImageToCloudinary(imageFile);
            }

            if (!finalImageUrl) {
                setStatus("Please provide a cover image.");
                return;
            }

            const finalSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

            const url = "/api/blogs";
            const method = editingId ? "PUT" : "POST";
            const body = {
                ...formData,
                slug: finalSlug,
                coverImage: finalImageUrl,
                ...(editingId && { id: editingId })
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setStatus(editingId ? "Blog updated successfully!" : "Blog added successfully!");
                handleCancelEdit(); // Clears form safely
                fetchBlogs();
            } else {
                const errData = await res.json().catch(() => ({}));
                setStatus(`Failed to save blog: ${errData.error || res.statusText || 'Unknown error'}`);
            }
        } catch (error) {
            setStatus("Error saving blog: " + (error as Error).message);
        }
    };

    const handleEdit = (blog: any) => {
        setFormData({
            title: blog.title || "",
            content: blog.content || "",
            date: blog.date || new Date().toISOString().split('T')[0],
            category: blog.category || "Architecture",
            author: blog.author || "Dhruv",
            authorDescription: blog.authorDescription || "Lead Architect @ MonoQrome",
            readTime: blog.readTime || "",
            coverImage: blog.coverImage || ""
        });
        setEditingId(blog.id);
        setImageFile(null);
        setManualImageUrl(blog.coverImage || ""); 
        setStatus("Editing blog: " + blog.title);
        
        if (quill) {
            // Set text without firing events if possible, or just insert
            quill.clipboard.dangerouslyPasteHTML(blog.content || "");
        }
        
        // Reset file input
        const fileInput = document.getElementById('coverImageInput') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleDelete = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
        setStatus("Deleting...");
        try {
            const res = await fetch("/api/blogs", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });

            if (res.ok) {
                setStatus("Blog deleted.");
                fetchBlogs();
                if (editingId === id) {
                    handleCancelEdit();
                }
            } else {
                setStatus("Failed to delete blog.");
            }
        } catch (error) {
            setStatus("Error deleting blog.");
        }
    };

    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setEditingId(null);
        setImageFile(null);
        setManualImageUrl("");
        setStatus("");
        if (quill) {
            quill.setText('');
        }
        const fileInput = document.getElementById('coverImageInput') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-serif text-white mb-4">
                    {editingId ? "Edit Blog Post" : "Add New Blog Post"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Title</label>
                        <input required type="text" className={inputClasses} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Category</label>
                        <select className={inputClasses} value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option value="Architecture">Architecture</option>
                            <option value="Interior Design">Interior Design</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Philosophy">Philosophy</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Date</label>
                        <input required type="date" className={inputClasses} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Author</label>
                        <input required type="text" className={inputClasses} value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Author Description</label>
                        <input required type="text" className={inputClasses} value={formData.authorDescription} onChange={e => setFormData({ ...formData, authorDescription: e.target.value })} placeholder="e.g. Lead Architect @ MonoQrome" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-2">Read Time</label>
                        <input required type="text" className={inputClasses} value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} placeholder="e.g. 5 min read" />
                    </div>
                </div>

                <div className="border border-stone-800 p-4 space-y-4">
                    <label className="block text-xs uppercase tracking-wider text-stone-500">Cover Image</label>
                    <p className="text-xs text-stone-500 mb-2">
                        {editingId ? "Upload a new image to replace the current one, or update the URL." : "Provide an image."}
                    </p>
                    {editingId && formData.coverImage && !imageFile && !manualImageUrl && (
                        <div className="mb-4">
                            <span className="text-xs text-stone-400">Current Image:</span>
                            <img src={formData.coverImage} alt="Current cover" className="mt-2 h-20 w-auto rounded border border-stone-800" />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs text-stone-400 mb-2">Upload from computer:</label>
                        <input
                            id="coverImageInput"
                            type="file"
                            accept="image/*"
                            className="w-full text-stone-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:bg-[#cd853f] file:text-black hover:file:bg-[#b07030]"
                            onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                    setImageFile(e.target.files[0]);
                                    setManualImageUrl(""); 
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-4 text-stone-600">
                        <hr className="flex-grow border-stone-800" />
                        <span className="text-xs uppercase">OR</span>
                        <hr className="flex-grow border-stone-800" />
                    </div>
                    <div>
                        <label className="block text-xs text-stone-400 mb-2">Enter Image URL directly:</label>
                        <input
                            type="text"
                            className={inputClasses}
                            value={manualImageUrl}
                            onChange={e => {
                                setManualImageUrl(e.target.value);
                                setImageFile(null); 
                                const fileInput = document.getElementById('coverImageInput') as HTMLInputElement;
                                if (fileInput) fileInput.value = "";
                            }}
                            placeholder="https://..."
                        />
                    </div>
                </div>



                <div data-lenis-prevent="true" className={isFullscreen ? "fixed inset-0 z-[150] bg-black p-4 md:p-12 flex flex-col overflow-y-auto custom-scrollbar" : ""}>
                    {isFullscreen ? (
                        <div className="flex justify-between items-center mb-6 border-b border-stone-800 pb-4">
                            <div>
                                <h2 className="text-2xl font-serif text-white">Distraction-Free Writing</h2>
                                <p className="text-xs text-stone-500 mt-1">Press Exit Fullscreen when finished.</p>
                            </div>
                            <button type="button" onClick={() => setIsFullscreen(false)} className="px-6 py-2 bg-[#cd853f] text-black text-sm uppercase tracking-widest font-medium hover:bg-[#b07030] transition-colors">
                                Exit Fullscreen
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Content</label>
                                <p className="text-xs text-stone-500">Use headers (H2) to automatically build the Table of Contents.</p>
                            </div>
                            <button type="button" onClick={() => setIsFullscreen(true)} className="px-4 py-2 border border-stone-800 text-stone-400 text-xs uppercase tracking-widest hover:text-white hover:bg-stone-800 transition-colors">
                                Fullscreen
                            </button>
                        </div>
                    )}
                    
                    <div className={`bg-white text-black rounded relative flex flex-col ${isFullscreen ? "h-auto" : "mb-12"}`}>
                        {isMounted && quillReady && (
                            <div 
                                ref={quillRef} 
                                className={isFullscreen ? "h-[calc(100vh-250px)]" : "h-[400px]"} 
                            />
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button type="submit" disabled={status.includes("Saving")} className="px-6 py-3 bg-[#cd853f] text-black text-sm uppercase tracking-wider font-medium hover:bg-[#b07030] transition-colors disabled:opacity-50">
                        {status.includes("Saving") ? "Processing..." : (editingId ? "Update Blog Post" : "Save Blog Post")}
                    </button>
                    {editingId && (
                        <button type="button" onClick={handleCancelEdit} className="px-6 py-3 border border-stone-800 text-stone-400 text-sm uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors">
                            Cancel
                        </button>
                    )}
                </div>
                {status && <p className="mt-4 text-sm text-stone-400">{status}</p>}
            </form>

            {/* List Section */}
            <div>
                <h2 className="text-2xl font-serif text-white mb-4">Manage Blogs</h2>
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
                    {blogs.map(blog => (
                        <div key={blog.id} className="bg-stone-900 border border-stone-800 p-4 flex justify-between items-center group hover:border-stone-700 transition-colors">
                            <div className="pr-4">
                                <h3 className="text-white font-serif line-clamp-1">{blog.title}</h3>
                                <p className="text-xs text-stone-500 mt-1 capitalize">{blog.category} • {blog.date}</p>
                            </div>
                            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(blog)} className="text-[#cd853f] hover:text-white text-sm">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(blog.id, blog.title)} className="text-red-500 hover:text-red-400 text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {blogs.length === 0 && (
                        <p className="text-stone-500 text-sm">No blogs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
