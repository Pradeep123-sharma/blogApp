'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ComposeForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            fetch(`/api/blogs/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setAuthor(data.author);
                    setContent(data.content);
                    setFetching(false);
                })
                .catch(() => {
                    alert('Failed to fetch blog for editing');
                    setFetching(false);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/api/blogs/${id}` : '/api/blogs';

        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author, content }),
            });

            const result = await res.json();

            if (res.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                if (result.details) {
                    setErrors(result.details);
                } else {
                    throw new Error(result.error || 'Failed to save blog');
                }
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="max-w-4xl mx-auto py-20 text-center text-slate-400">Loading editor...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/dashboard" className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 text-sm transition-colors font-medium">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm shadow-indigo-200"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {id ? 'Update Post' : 'Publish Post'}
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Enter a compelling title..."
                        className={`w-full text-4xl md:text-5xl font-bold border-none outline-none bg-transparent placeholder:text-slate-400 text-slate-900 ${errors.title ? 'placeholder:text-rose-200' : ''}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className="text-rose-500 text-xs font-semibold">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Written by..."
                        className={`w-full text-lg font-medium border-none outline-none bg-transparent placeholder:text-slate-400 text-slate-700 ${errors.author ? 'placeholder:text-rose-200' : ''}`}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    {errors.author && <p className="text-rose-500 text-xs font-semibold">{errors.author}</p>}
                </div>

                <div className="space-y-2">
                    <div className={`border rounded-2xl overflow-hidden bg-white shadow-sm transition-colors ${errors.content ? 'border-rose-400' : 'border-slate-100'}`}>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={content}
                            onEditorChange={(newContent) => setContent(newContent)}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | border-none bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }',
                                skin: 'oxide',
                                promotion: false,
                                branding: false,
                            }}
                        />
                    </div>
                    {errors.content && <p className="text-rose-500 text-xs font-semibold">{errors.content}</p>}
                </div>
            </div>
        </div>
    );
}

export default function Compose() {
    return (
        <Suspense fallback={<div className="max-w-4xl mx-auto py-20 text-center text-slate-400">Loading editor environment...</div>}>
            <ComposeForm />
        </Suspense>
    );
}
