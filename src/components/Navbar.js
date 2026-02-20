'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600">
                    BlogApp
                </Link>
                <div className="flex items-center space-x-8 text-sm font-medium">
                    <Link
                        href="/"
                        className={`${isActive('/') ? 'text-indigo-600' : 'text-slate-500'} hover:text-indigo-600 transition-colors`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`${isActive('/dashboard') ? 'text-indigo-600' : 'text-slate-500'} hover:text-indigo-600 transition-colors`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/compose"
                        className={`${isActive('/compose') ? 'bg-indigo-700' : 'bg-indigo-600'} text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors`}
                    >
                        Compose
                    </Link>
                </div>
            </div>
        </nav>
    );
}
