import { useEffect, useState } from 'react';
import AcademicStaffProfileCard, { AcademicStaffProfileCardProps } from '../../../components/AcademicStaffProfileCard';

export default function AcademicStaff() {
  const [staffList, setStaffList] = useState<AcademicStaffProfileCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const baseUrl = import.meta.env.VITE_CMS_URL || import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
        const res = await fetch(`${baseUrl}/api/academic-staffs?populate=*`);
        const json = await res.json();

        if (json.data) {
          const formattedStaff = json.data.map((item: any) => {
            const attrs = item.attributes || item;
            const mediaImage = attrs.imageUrl || attrs.image || attrs.avatar;
            const mediaCv = attrs.cvUrl || attrs.cvurl || attrs.cvDocument || attrs.cv;
            
            const imagePath = mediaImage?.url || mediaImage?.data?.attributes?.url;
            const cvPath = mediaCv?.url || mediaCv?.data?.attributes?.url;

            return {
              name: attrs.name,
              role: attrs.role,
              specialty: attrs.specialty || '',
              email: attrs.email || '',
              bio: attrs.bio || '',
              cvLabel: attrs.cvLabel || attrs.cvlabel || 'Download CV (PDF)',
              qualifications: attrs.qualifications || [],
              researchDirections: attrs.researchDirections || [],
              experience: attrs.experience || [],
              imageUrl: imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '/accademics/image-not-hero.png',
              cvUrl: cvPath ? (cvPath.startsWith('http') ? cvPath : `${baseUrl}${cvPath}`) : '#'
            };
          });
          setStaffList(formattedStaff);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-12 sm:px-8 lg:px-10">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 sm:text-left">Academic Staff</h2>
      {isLoading ? (
        <div className="animate-pulse text-emerald-600">Loading Staff...</div>
      ) : staffList.length > 0 ? (
        <div className="flex flex-col gap-8">
          {staffList.map((member, index) => (
            <AcademicStaffProfileCard key={index} {...member} />
          ))}
        </div>
      ) : (
        <div className="text-slate-500">No staff profiles found.</div>
      )}
    </section>
  );
}