import React from 'react';
import { Home, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#1a5d3b] text-white px-4 sm:px-10 py-2 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:bg-white/10 p-1.5 rounded transition-colors">
          <Home size={20} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button className="sm:hidden p-1.5 hover:bg-white/10 rounded transition-colors">
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-[#c1a051] transition-colors">হোম</Link>
          <Link to="/news" className="hover:text-[#c1a051] transition-colors">সংবাদ</Link>
          <Link to="/events" className="hover:text-[#c1a051] transition-colors">ইভেন্ট</Link>
          <Link to="/contact" className="hover:text-[#c1a051] transition-colors">যোগাযোগ</Link>
          <Link to="/admin" className="text-xs opacity-50 hover:opacity-100 transition-opacity">Admin</Link>
        </div>
        <div className="flex border border-white/20 rounded overflow-hidden">
          <button className="px-3 py-1 bg-white/10 text-xs">EN</button>
          <button className="px-3 py-1 bg-[#0a4d2b] text-xs">BN</button>
        </div>
      </div>
    </nav>
  );
}
