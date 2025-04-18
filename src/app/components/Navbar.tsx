'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-gray-700 bg-black/60 backdrop-blur-md sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-sky-400">
        Culture & Heritage of India
      </h1>
      <div className="flex gap-4 text-sm">
        <Link href="/" className="text-gray-200 hover:text-sky-400 transition">Home</Link>
        <Link href="/states" className="text-gray-200 hover:text-sky-400 transition">All States</Link>
        <Link href="/about" className="text-gray-200 hover:text-sky-400 transition">About</Link>
      </div>
    </nav>
  );
}
