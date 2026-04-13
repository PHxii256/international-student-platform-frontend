import { useEffect, useState } from 'react';
import NewStudyPlanResources from '../../../components/NewStudyPlanResources';
import { undergradStudyPlanConfig } from '../../../components/newStudyPlanResourcesMockData';

export default function Undergraduate() {
  const [config, setConfig] = useState<any>(undergradStudyPlanConfig);
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

          setConfig({
            mode: 'undergrad-specialties',
            title: 'Undergraduate Study Plans',
            specialties: {
              cs: {
                label: 'Computer Science',
                resourcesByCurriculum: {
                  old: attrs.Undergrad_CS_Old_Curriculum ? [{ id: 'ug-cs-old', title: 'CS - Old', url: getFileUrl(attrs.Undergrad_CS_Old_Curriculum) }] : [],
                  new: attrs.Undergrad_CS_New_Curriculum ? [{ id: 'ug-cs-new', title: 'CS - New', url: getFileUrl(attrs.Undergrad_CS_New_Curriculum) }] : [],
                },
              },
              is: {
                label: 'Information System',
                resourcesByCurriculum: {
                  old: attrs.Undergrad_IS_Old_Curriculum ? [{ id: 'ug-is-old', title: 'IS - Old', url: getFileUrl(attrs.Undergrad_IS_Old_Curriculum) }] : [],
                  new: attrs.Undergrad_IS_New_Curriculum ? [{ id: 'ug-is-new', title: 'IS - New', url: getFileUrl(attrs.Undergrad_IS_New_Curriculum) }] : [],
                },
              },
              ai: {
                label: 'Artificial Intelligence',
                resourcesByCurriculum: {
                  old: attrs.Undergrad_AI_Old_Curriculum ? [{ id: 'ug-ai-old', title: 'AI - Old', url: getFileUrl(attrs.Undergrad_AI_Old_Curriculum) }] : [],
                  new: attrs.Undergrad_AI_New_Curriculum ? [{ id: 'ug-ai-new', title: 'AI - New', url: getFileUrl(attrs.Undergrad_AI_New_Curriculum) }] : [],
                },
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
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Undergraduate Studies</h1>
        {isLoading ? <div className="animate-pulse text-emerald-600">Loading Plans...</div> : <NewStudyPlanResources config={config} />}
      </div>
    </div>
  );
}