import React, { useState } from 'react';
import { MoveRight, Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Contact {
  name: string;
  phone: string;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  contacts: Contact[];
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const formatForLink = (phone: string) => {
    // Convert Bengali digits to English for the links
    const bengaliToEnglish: { [key: string]: string } = {
      '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
      '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };
    const englishPhone = phone.split('').map(char => bengaliToEnglish[char] || char).join('');
    const cleaned = englishPhone.replace(/\D/g, '');
    // Ensure +88 prefix
    if (cleaned.startsWith('88')) return `+${cleaned}`;
    if (cleaned.startsWith('0')) return `+88${cleaned}`;
    return `+880${cleaned}`;
  };

  return (
    <div className="flex-1 space-y-8">
      <div className="flex justify-between items-center border-l-4 border-[#c1a051] pl-4 bg-white p-4 rounded-r-lg shadow-sm">
        <h2 className="text-[#1a5d3b] text-2xl font-bold">সাম্প্রতিক সংবাদ</h2>
        <button className="text-slate-500 hover:text-[#1a5d3b] text-sm font-medium flex items-center gap-2 transition-colors">
          সব সংবাদ <MoveRight size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <div className="bg-[#1a5d3b]/5 px-6 py-4 border-b border-slate-50">
              <h3 className="text-[#1a5d3b] text-xl sm:text-2xl font-bold leading-tight">
                {item.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-slate-700 text-base sm:text-lg font-medium mb-8 leading-relaxed">
                {item.content}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {item.contacts.map((contact, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedContact(contact)}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-[#1a5d3b]/10 transition-colors group border border-slate-100"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[#1a5d3b] text-sm font-semibold">{contact.name}</span>
                      <span className="text-red-600 font-mono font-bold">{contact.phone}</span>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <Phone size={18} className="text-[#1a5d3b]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {selectedContact && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedContact(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-2xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#1a5d3b] text-white">
                <div>
                  <h4 className="font-bold text-lg">{selectedContact.name}</h4>
                  <p className="text-white/80 text-sm font-mono">{selectedContact.phone}</p>
                </div>
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 space-y-3">
                <a 
                  href={`tel:${formatForLink(selectedContact.phone)}`}
                  className="flex items-center gap-4 w-full p-4 bg-[#1a5d3b] text-white rounded-xl hover:bg-[#2a8d5b] transition-colors font-bold justify-center"
                >
                  <Phone size={24} />
                  সরাসরি কল করুন
                </a>
                
                <a 
                  href={`https://wa.me/${formatForLink(selectedContact.phone).replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors font-bold justify-center"
                >
                  <MessageCircle size={24} />
                  হোয়াটসঅ্যাপে মেসেজ দিন
                </a>
              </div>
              
              <div className="p-4 bg-slate-50 text-center">
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="text-slate-500 text-sm font-medium hover:text-slate-700"
                >
                  ফিরে যান
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
