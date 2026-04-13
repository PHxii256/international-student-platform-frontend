import { useEffect, useState } from 'react';
import { NewsCarousel } from '../components/EventsNewsCarousels';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const baseUrl = import.meta.env.VITE_CMS_URL || import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const res = await fetch(`${baseUrl}/api/news-items?populate=*`);
      const json = await res.json();
      
      if (json.data) {
        setNewsList(json.data.map((item: any) => {
          const attrs = item.attributes || item;
          const media = attrs.imageUrl || attrs.image;
          const imagePath = media?.url || media?.data?.attributes?.url;
          return {
            id: item.id.toString(),
            title: attrs.title,
            description: attrs.description,
            href: attrs.href || '#',
            imageUrl: imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '/accademics/news/news-1.jpg'
          };
        }));
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="p-12 bg-[#070d19]">
      <NewsCarousel news={newsList} />
    </div>
  );
}