import React from 'react';
import { Calendar, MoveRight, CalendarX } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
}

export default function EventsSidebar({ events }: { events: Event[] }) {
  return (
    <div className="w-full lg:w-96 shrink-0 h-fit">
      <div className="bg-[#1a5d3b] text-white p-4 rounded-t-lg flex items-center gap-3">
        <Calendar size={20} />
        <h2 className="font-bold">আসন্ন ইভেন্ট</h2>
      </div>
      <div className="bg-white border-x border-b border-slate-200 rounded-b-lg p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <div className="p-4 bg-slate-50 rounded-full">
              <CalendarX size={48} />
            </div>
            <p className="font-medium text-lg">এই মুহূর্তে কোনো আসন্ন ইভেন্ট নেই।</p>
          </div>
        ) : (
          <div className="w-full space-y-4 text-left">
            {events.map((event) => (
              <div key={event.id} className="p-4 bg-slate-50 rounded-lg border-l-4 border-[#1a5d3b]">
                <h4 className="font-bold text-[#1a5d3b] mb-1">{event.title}</h4>
                <p className="text-xs text-slate-500">{new Date(event.date).toLocaleDateString('bn-BD')}</p>
              </div>
            ))}
          </div>
        )}
        
        <button className="mt-8 text-[#1a5d3b] hover:text-[#2a8d5b] text-sm font-bold flex items-center gap-2 transition-colors">
          পূর্ববর্তী ইভেন্ট দেখুন <MoveRight size={16} />
        </button>
      </div>
    </div>
  );
}
