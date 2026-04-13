import { useEffect, useState } from 'react';
import NewStudyPlanResources from '../../../components/NewStudyPlanResources';
import { postgradStudyPlanConfig } from '../../../components/newStudyPlanResourcesMockData';

export default function Postgraduate() {
  const [config, setConfig] = useState<any>(postgradStudyPlanConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseUrl = import.meta.env.VITE_CMS_URL || import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        const res = await fetch(`${baseUrl}/api/study-plans?populate=*`);
        const json = await res.json();

        if (json.data && json.data.length > 0) {
          const attrs = json.data[0].attributes || json.data[0];
          const getFileUrl = (field: any) => {
            const path = field?.url || field?.data?.attributes?.url;
            return path ? (path.startsWith('http') ? path : `${baseUrl}${path}`) : '#';
          };
          const getMultipleFiles = (media: any) => {
            const items = media?.data || media || [];
            return Array.isArray(items) ? items.map((f: any, i: number) => ({
              id: `prof-${i}`, title: f?.attributes?.name || f?.name || `Diploma ${i + 1}`, url: f?.url ? (f.url.startsWith('http') ? f.url : `${baseUrl}${f.url}`) : '#'
            })) : [];
          };

          setConfig({
            mode: 'degree-tracks',
            title: 'Postgraduate Study Plans',
            tracks: {
              msc: {
                type: 'research', label: 'M. SC',
                resourcesBySpecialty: {
                  CS: attrs.Postgrad_CS ? [{ id: 'pg-msc-cs', title: 'MSc Computer Science', url: getFileUrl(attrs.Postgrad_CS) }] : [],
                  IS: attrs.Postgrad_AI ? [{ id: 'pg-msc-is', title: 'MSc Artificial Intelligence', url: getFileUrl(attrs.Postgrad_AI) }] : [],
                },
              },
              phd: {
                type: 'research', label: 'PH.D',
                resourcesBySpecialty: {
                  CS: attrs.Postgrad_CS ? [{ id: 'pg-phd-cs', title: 'PhD Computer Science', url: getFileUrl(attrs.Postgrad_CS) }] : [],
                  IS: attrs.Postgrad_AI ? [{ id: 'pg-phd-is', title: 'PhD Artificial Intelligence', url: getFileUrl(attrs.Postgrad_AI) }] : [],
                },
              },
              professional: {
                type: 'professional', label: 'Professional Degrees',
                resources: getMultipleFiles(attrs.Professional_diplomas),
              },
            },
          });
        }
      } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };
    fetchPlans();
  }, []);

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Postgraduate Programs</h1>
        {isLoading ? <div className="animate-pulse text-emerald-600">Loading Plans...</div> : <NewStudyPlanResources config={config} />}
      </div>
    </div>
  );
}