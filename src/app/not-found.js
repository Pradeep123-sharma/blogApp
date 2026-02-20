import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Blog Post Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    We couldn't find the article you were looking for. It may have been removed or the URL is incorrect.
                </p>
                <Link
                    href="/"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors inline-block"
                >
                    Back to Stories
                </Link>
            </div>
        </div>
    );
}
