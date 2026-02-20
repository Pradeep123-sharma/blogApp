import { getBlogById } from '@/lib/blog-store';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
    const id = (await params).id;
    const blog = getBlogById(id);

    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: `${blog.title} | ModernDev Blog`,
        description: blog.preview,
        openGraph: {
            title: blog.title,
            description: blog.preview,
            type: 'article',
            authors: [blog.author],
            publishedTime: blog.date,
        }
    };
}

export default async function BlogDetail({ params }) {
    const id = (await params).id;
    const blog = getBlogById(id);

    if (!blog) {
        notFound();
    }

    return (
        <article className="max-w-2xl mx-auto px-4 py-20">
            <header className="mb-12 text-center">
                <div className="text-indigo-600 font-semibold text-sm mb-4 uppercase tracking-widest">Article</div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    {blog.title}
                </h1>
                <div className="flex items-center justify-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-slate-900">{blog.author}</div>
                        <div className="text-xs text-slate-600">{blog.date}</div>
                    </div>
                </div>
            </header>

            <div
                className="prose prose-slate prose-lg max-w-none serif text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <div className="mt-12 pt-12 border-t border-slate-100 italic text-slate-400 text-sm">
                Thanks for reading. Share your thoughts on social media.
            </div>
        </article>
    );
}
