import React from 'react';

// Define the interface for the PDF links we get from Strapi
export interface AcademicSchedulesProps {
  semesterUrl?: string;
  quiz1Url?: string;
  quiz2Url?: string;
  finalsUrl?: string;
}

export default function Schedules({ 
  semesterUrl = '#', 
  quiz1Url = '#', 
  quiz2Url = '#', 
  finalsUrl = '#' 
}: AcademicSchedulesProps) {
  
  // We organize the data into categories to match your UI layout
  const categories = [
    {
      title: 'Normal Schedule',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      items: [
        { term: 'Semester Schedule', desc: 'Complete lecture schedule for the current semester', url: semesterUrl },
      ],
    },
    {
      title: 'Exams',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      items: [
        { term: 'Quiz 1', desc: 'First midterm/quiz exam timetable', url: quiz1Url },
        { term: 'Quiz 2', desc: 'Second midterm/quiz exam timetable', url: quiz2Url },
        { term: 'Finals', desc: 'Final examination timetable', url: finalsUrl },
      ],
    }
  ];

  return (
    <section className="w-full bg-[#0b132b] py-20 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">Academic Schedules</h2>
          <p className="text-gray-400 text-lg lg:text-xl">
            Access live lecture schedules and exam timetables updated from the registrar.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {categories.map((category, idx) => (
            <div key={idx} className="flex-1 bg-slate-800 rounded-3xl border border-slate-700 shadow-xl overflow-hidden flex flex-col">
              <div className="bg-[#0f1d36] p-6 border-b border-slate-700 flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-xl">{category.icon}</div>
                <h3 className="text-white text-2xl font-bold">{category.title}</h3>
              </div>
              
              <div className="p-6 flex-1 space-y-6">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="bg-[#0f1d36] rounded-2xl p-6 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-500/20 p-3 rounded-xl shrink-0 mt-1">
                        <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-bold mb-1">{item.term}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition flex items-center justify-center shrink-0"
                    >
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}