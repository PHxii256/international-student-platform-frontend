import { useEffect, useState } from 'react';
import NewStudyPlanResources from '../../../components/NewStudyPlanResources';
import ResourcesComponent from '../../../components/ResourcesComponent';
import { postgradStudyPlanConfig, undergradStudyPlanConfig } from '../../../components/newStudyPlanResourcesMockData';
import { mockGenericReources } from '../../../components/genericResourcesMockData';

export default function StudyPlans() {
  const [undergradConfig, setUndergradConfig] = useState<any>(undergradStudyPlanConfig);
  const [postgradConfig, setPostgradConfig] = useState<any>(postgradStudyPlanConfig);

  useEffect(() => {
    const fetchStudyPlans = async () => {
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

          const getMultipleFiles = (mediaArray: any) => {
            const items = mediaArray?.data || mediaArray || [];
            if (!Array.isArray(items)) return [];
            return items.map((file: any, index: number) => {
              const path = file?.attributes?.url || file?.url;
              const finalPath = path ? (path.startsWith('http') ? path : `${baseUrl}${path}`) : '#';
              const name = file?.attributes?.name || file?.name || `Professional Diploma ${index + 1}`;
              return { id: `prof-${index}`, title: name, url: finalPath };
            });
          };

          setUndergradConfig({
            mode: 'undergrad-specialties',
            title: 'Study Plans (Undergrad)',
            specialties: {
              cs: { label: 'Computer Science', resourcesByCurriculum: { old: attrs.Undergrad_CS_Old_Curriculum ? [{ id: 'ug-cs-old', title: 'CS - Old', url: getFileUrl(attrs.Undergrad_CS_Old_Curriculum) }] : [], new: attrs.Undergrad_CS_New_Curriculum ? [{ id: 'ug-cs-new', title: 'CS - New', url: getFileUrl(attrs.Undergrad_CS_New_Curriculum) }] : [] } },
              is: { label: 'Information System', resourcesByCurriculum: { old: attrs.Undergrad_IS_Old_Curriculum ? [{ id: 'ug-is-old', title: 'IS - Old', url: getFileUrl(attrs.Undergrad_IS_Old_Curriculum) }] : [], new: attrs.Undergrad_IS_New_Curriculum ? [{ id: 'ug-is-new', title: 'IS - New', url: getFileUrl(attrs.Undergrad_IS_New_Curriculum) }] : [] } },
              ai: { label: 'Artificial Intelligence', resourcesByCurriculum: { old: attrs.Undergrad_AI_Old_Curriculum ? [{ id: 'ug-ai-old', title: 'AI - Old', url: getFileUrl(attrs.Undergrad_AI_Old_Curriculum) }] : [], new: attrs.Undergrad_AI_New_Curriculum ? [{ id: 'ug-ai-new', title: 'AI - New', url: getFileUrl(attrs.Undergrad_AI_New_Curriculum) }] : [] } },
            },
          });

          setPostgradConfig({
            mode: 'degree-tracks',
            title: 'Study Plans (Postgrad)',
            tracks: {
              msc: { type: 'research', label: 'M. SC', resourcesBySpecialty: { CS: attrs.Postgrad_CS ? [{ id: 'pg-msc-cs', title: 'MSc Computer Science', url: getFileUrl(attrs.Postgrad_CS) }] : [], IS: attrs.Postgrad_AI ? [{ id: 'pg-msc-is', title: 'MSc Artificial Intelligence', url: getFileUrl(attrs.Postgrad_AI) }] : [] } },
              phd: { type: 'research', label: 'PH.D', resourcesBySpecialty: { CS: attrs.Postgrad_CS ? [{ id: 'pg-phd-cs', title: 'PhD Computer Science', url: getFileUrl(attrs.Postgrad_CS) }] : [], IS: attrs.Postgrad_AI ? [{ id: 'pg-phd-is', title: 'PhD Artificial Intelligence', url: getFileUrl(attrs.Postgrad_AI) }] : [] } },
              professional: { type: 'professional', label: 'Professional Degrees', resources: getMultipleFiles(attrs.Professional_diplomas) },
            },
          });
        }
      } catch (error) {
        console.error('Error fetching study plans:', error);
      }
    };
    fetchStudyPlans();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-10 space-y-8">
        <NewStudyPlanResources config={undergradConfig} />
        <NewStudyPlanResources config={postgradConfig} />
        <ResourcesComponent config={mockGenericReources} />
      </div>
    </section>
  );
}