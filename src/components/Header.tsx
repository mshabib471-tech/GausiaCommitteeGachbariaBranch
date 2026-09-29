import React from 'react';
import { Facebook, Youtube, Mail, Globe, Moon } from 'lucide-react';

export default function Header() {
  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="w-full">
      {/* Top utility bar */}
      <div className="bg-[#0a4d2b] text-white py-1 px-4 sm:px-10 flex justify-between items-center text-sm border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">📅 {today}</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-white/10 p-1 rounded transition-colors"><Moon size={16} /></button>
          <a href="https://www.facebook.com/share/1HT9KxgjWe/" target="_blank" rel="noopener noreferrer" className="hover:bg-white/10 p-1 rounded transition-colors"><Facebook size={16} /></a>
          <button className="hover:bg-white/10 p-1 rounded transition-colors"><Youtube size={16} /></button>
          <button className="hover:bg-white/10 p-1 rounded transition-colors"><Mail size={16} /></button>
        </div>
      </div>

      {/* Main branding area */}
      <div className="bg-white py-4 px-4 sm:px-10 flex items-center gap-4 border-b border-slate-100">
        <img 
          src="/src/assets/images/gausia_committee_logo_1790679286079.jpg" 
          alt="Gausia Committee Logo" 
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
        <div className="flex flex-col">
          <h1 className="text-[#1a5d3b] text-xl sm:text-3xl font-bold leading-tight">
            গাউসিয়া কমিটি গাছবাড়িয়া সরকারি কলেজ শাখা
          </h1>
          <p className="text-[#c1a051] text-sm sm:text-lg font-semibold uppercase tracking-wide">
            Gausia Committee Gachbaria Government College Branch
          </p>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Chandanish, Chittagong
          </p>
        </div>
      </div>
    </div>
  );
}
