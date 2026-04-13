import { useEffect, useState } from 'react';
import { RelatedEventsCarousel } from '../components/EventsNewsCarousels';

export default function EventsPage() {
  const [eventsList, setEventsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const baseUrl = import.meta.env.VITE_CMS_URL || import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      const res = await fetch(`${baseUrl}/api/events?populate=*`);
      const json = await res.json();
      
      if (json.data) {
        setEventsList(json.data.map((item: any) => {
          const attrs = item.attributes || item;
          const media = attrs.imageUrl || attrs.image;
          const imagePath = media?.url || media?.data?.attributes?.url;
          return {
            id: item.id.toString(),
            title: attrs.title,
            description: attrs.description,
            day: attrs.day,
            month: attrs.month,
            timeRange: attrs.timeRange,
            href: attrs.href || '#',
            imageUrl: imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '/accademics/events/event-1.jpg'
          };
        }));
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-12 bg-[#070d19]">
      <RelatedEventsCarousel events={eventsList} />
    </div>
  );
}