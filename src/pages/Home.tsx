import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Marquee from '../components/Marquee';
import NewsSection from '../components/NewsSection';
import EventsSidebar from '../components/EventsSidebar';

export default function Home() {
  const [data, setData] = useState<{ news: any[], events: any[] }>({ news: [], events: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a5d3b]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="-mx-4 sm:-mx-10 -mt-8 mb-8">
        <Marquee text={data.news[0]?.title || "গাউসিয়া কমিটি বাংলাদেশ, গাছবাড়িয়া সরকারি কলেজ শাখা।"} />
      </div>
      
      <div className="flex flex-col lg:flex-row gap-10">
        <NewsSection news={data.news} />
        <EventsSidebar events={data.events} />
      </div>
    </Layout>
  );
}
