import React from 'react';
import { MoveRight } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  contacts: { name: string; phone: string }[];
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  return (
    <div className="flex-1 bg-white p-6 sm:p-10 rounded-lg shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c1a051] pl-4">
        <h2 className="text-[#1a5d3b] text-2xl font-bold">সাম্প্রতিক সংবাদ</h2>
        <button className="text-slate-500 hover:text-[#1a5d3b] text-sm font-medium flex items-center gap-2 transition-colors">
          সব সংবাদ <MoveRight size={16} />
        </button>
      </div>

      <div className="space-y-12">
        {news.map((item) => (
          <div key={item.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-[#1a5d3b] text-3xl sm:text-4xl font-extrabold mb-6 leading-tight text-center sm:text-left">
              {item.title}
            </h3>
            <p className="text-slate-700 text-lg sm:text-xl font-medium mb-10 text-center sm:text-left">
              {item.content}
            </p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-12 sm:gap-24">
              {item.contacts.map((contact, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start">
                  <span className="text-[#1a5d3b] text-xl font-bold">{contact.name}</span>
                  <span className="text-red-600 text-xl font-bold">
                    মোবাইল: <span className="font-mono">{contact.phone}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
