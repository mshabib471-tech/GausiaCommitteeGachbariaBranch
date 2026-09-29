import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf0]">
      <Header />
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-10 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
