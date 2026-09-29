import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#222831] text-slate-400 py-10 px-4 sm:px-10 mt-auto border-t-4 border-[#1a5d3b]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm">
          © {new Date().getFullYear()} Gausia Committee Gachbaria Branch. All Rights Reserved.
        </div>
        <div className="text-sm font-medium">
          Designed & Developed by{' '}
          <a 
            href="https://www.facebook.com/share/14x1dpeGH6E/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#1a5d3b] hover:text-[#2a8d5b] font-bold underline transition-colors"
          >
            Habibur Rahman
          </a>
        </div>
      </div>
    </footer>
  );
}
