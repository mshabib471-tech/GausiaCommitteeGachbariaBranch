import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(express.json());

// Simple JSON storage
const DATA_FILE = path.join(__dirname, 'data.json');

const getInitialData = () => ({
  news: [
    {
      id: 1,
      title: 'গাছবাড়িয়া সরকারি কলেজ শাখার পূর্ণাঙ্গ কমিটি অতি শীঘ্রই ঘোষণা করা হবে, ইনশাআল্লাহ।',
      content: 'যারা স্বেচ্ছায় প্রস্তাবিত কমিটিতে থাকতে আগ্রহী, তারা নিম্নোক্ত নম্বরগুলোতে যোগাযোগ করতে পারেন।',
      contacts: [
        { name: 'মোঃ ইফতেখার ইভান', phone: '০১৮৪০০৯৩৪৮৫' },
        { name: 'মাঃ মামুনুল ইসলাম', phone: '০১৮৬৭৭০৬৩৬৫' }
      ],
      createdAt: new Date().toISOString()
    }
  ],
  events: []
});

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(getInitialData(), null, 2));
}

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const setData = (data: any) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// API Routes
app.get('/api/data', (req, res) => {
  res.json(getData());
});

app.post('/api/news', (req, res) => {
  const { title, content, contacts, password } = req.body;
  if (password !== 'habib1577') return res.status(401).json({ error: 'Unauthorized' });
  
  const data = getData();
  const newPost = {
    id: Date.now(),
    title,
    content,
    contacts: contacts || [],
    createdAt: new Date().toISOString()
  };
  data.news.unshift(newPost);
  setData(data);
  res.json(newPost);
});

app.post('/api/events', (req, res) => {
  const { title, date, password } = req.body;
  if (password !== 'habib1577') return res.status(401).json({ error: 'Unauthorized' });
  
  const data = getData();
  const newEvent = {
    id: Date.now(),
    title,
    date,
    createdAt: new Date().toISOString()
  };
  data.events.unshift(newEvent);
  setData(data);
  res.json(newEvent);
});

app.get('/admin.html', (req, res) => {
  res.redirect('/admin');
});

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
