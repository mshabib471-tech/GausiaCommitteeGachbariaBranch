import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Lock, Plus, Newspaper, Calendar as CalendarIcon, LogOut } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [contacts, setContacts] = useState([{ name: '', phone: '' }]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'habib1577' && password === 'habib1577') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handlePostNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newsTitle,
        content: newsContent,
        contacts,
        password: 'habib1577'
      })
    });
    if (res.ok) {
      setMessage('News posted successfully!');
      setNewsTitle('');
      setNewsContent('');
      setContacts([{ name: '', phone: '' }]);
    }
  };

  const handlePostEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: eventTitle,
        date: eventDate,
        password: 'habib1577'
      })
    });
    if (res.ok) {
      setMessage('Event posted successfully!');
      setEventTitle('');
      setEventDate('');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl border border-slate-100">
          <div className="flex justify-center mb-6 text-[#1a5d3b]">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a5d3b] focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1a5d3b] focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-[#1a5d3b] text-white py-3 rounded-lg font-bold hover:bg-[#2a8d5b] transition-colors">
              Login
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-[#1a5d3b]">Admin Dashboard</h2>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8 relative">
          {message}
          <button onClick={() => setMessage('')} className="absolute right-4 top-3 font-bold">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* News Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-[#1a5d3b]">
            <Newspaper size={24} />
            <h3 className="text-xl font-bold">Post New News</h3>
          </div>
          <form onSubmit={handlePostNews} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">News Title (Bengali)</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg" 
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-lg h-32" 
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium">Contacts</label>
              {contacts.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input 
                    placeholder="Name" 
                    className="flex-1 px-3 py-1.5 border rounded-lg"
                    value={c.name}
                    onChange={(e) => {
                      const next = [...contacts];
                      next[i].name = e.target.value;
                      setContacts(next);
                    }}
                  />
                  <input 
                    placeholder="Phone" 
                    className="flex-1 px-3 py-1.5 border rounded-lg"
                    value={c.phone}
                    onChange={(e) => {
                      const next = [...contacts];
                      next[i].phone = e.target.value;
                      setContacts(next);
                    }}
                  />
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => setContacts([...contacts, { name: '', phone: '' }])}
                className="text-xs text-[#1a5d3b] flex items-center gap-1"
              >
                <Plus size={14} /> Add more contact
              </button>
            </div>
            <button className="w-full bg-[#1a5d3b] text-white py-2 rounded-lg font-bold">Post News</button>
          </form>
        </div>

        {/* Event Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 h-fit">
          <div className="flex items-center gap-3 mb-6 text-[#1a5d3b]">
            <CalendarIcon size={24} />
            <h3 className="text-xl font-bold">Post New Event</h3>
          </div>
          <form onSubmit={handlePostEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Title</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg" 
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border rounded-lg" 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required 
              />
            </div>
            <button className="w-full bg-[#1a5d3b] text-white py-2 rounded-lg font-bold">Post Event</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
