import  { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ClockIcon, BookOpenIcon } from 'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";
const programs = [
    {
        id: 1,
        name: 'BSc in Computer Science',
        faculty: 'Computer Science',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 144
    },
    {
        id: 2,
        name: 'BSc in Artificial Intelligence',
        faculty: 'Computer Science',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 144
    },
    {
        id: 3,
        name: 'Bachelor of Medicine and Surgery',
        faculty: 'Medicine',
        degree: 'Bachelor',
        duration: '5 Years + 2',
        credits: 230
    },
    {
        id: 4,
        name: 'BSc in Civil Engineering',
        faculty: 'Engineering',
        degree: 'Bachelor',
        duration: '5 Years',
        credits: 165
    },
    {
        id: 5,
        name: 'BSc in Mechatronics',
        faculty: 'Engineering',
        degree: 'Bachelor',
        duration: '5 Years',
        credits: 165
    },
    {
        id: 6,
        name: 'Bachelor of Pharmacy (PharmD)',
        faculty: 'Pharmacy',
        degree: 'Bachelor',
        duration: '5 Years + 1',
        credits: 175
    },
    {
        id: 7,
        name: 'BBA in Marketing',
        faculty: 'Business',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 132
    },
    {
        id: 8,
        name: 'BBA in Finance',
        faculty: 'Business',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 132
    },
    {
        id: 9,
        name: 'BA in Mass Communication',
        faculty: 'Mass Communication',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 132
    },
    {
        id: 10,
        name: 'BA in English Language',
        faculty: 'Languages',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 132
    },
    {
        id: 11,
        name: 'BSc in Biotechnology',
        faculty: 'Biotechnology',
        degree: 'Bachelor',
        duration: '4 Years',
        credits: 140
    },
    {
        id: 12,
        name: 'Master of Business Administration',
        faculty: 'Business',
        degree: 'Master',
        duration: '2 Years',
        credits: 48
    }];

export function ProgramsSection() {
    const [searchTerm, setSearchTerm] = useState('');
    const [facultyFilter, setFacultyFilter] = useState('All');
    const [degreeFilter, setDegreeFilter] = useState('All');
    const faculties = [
        'All',
        ...Array.from(new Set(programs.map((p) => p.faculty)))];

    const degrees = ['All', ...Array.from(new Set(programs.map((p) => p.degree)))];
    const filteredPrograms = programs.filter((p) => {
        const matchesSearch = p.name.
        toLowerCase().
        includes(searchTerm.toLowerCase());
        const matchesFaculty =
            facultyFilter === 'All' || p.faculty === facultyFilter;
        const matchesDegree = degreeFilter === 'All' || p.degree === degreeFilter;
        return matchesSearch && matchesFaculty && matchesDegree;
    });
    return (
        <section
            id="academics"
            className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title="Academic Programs"
                    subtitle="Find the perfect program to match your career aspirations from our comprehensive academic offerings." />


                {/* Filters */}
                <div className="bg-white dark:bg-navy-500 p-6 rounded-xl shadow-sm mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-6 relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search programs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-600 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all" />

                        </div>
                        <div className="md:col-span-3">
                            <select
                                value={facultyFilter}
                                onChange={(e) => setFacultyFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-600 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">

                                {faculties.map((f) =>
                                    <option key={f} value={f}>
                                        {f === 'All' ? 'All Faculties' : f}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <select
                                value={degreeFilter}
                                onChange={(e) => setDegreeFilter(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-600 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">

                                {degrees.map((d) =>
                                    <option key={d} value={d}>
                                        {d === 'All' ? 'All Degrees' : d}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPrograms.length > 0 ?
                        filteredPrograms.map((program, index) =>
                                <motion.div
                                    key={program.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05
                                    }}
                                    className="bg-white dark:bg-navy-500 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-navy-600 flex flex-col">

                                    <div className="mb-4 flex justify-between items-start">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                    {program.faculty}
                  </span>
                                        <span className="inline-block px-3 py-1 bg-navy-100 dark:bg-navy-600 text-navy-600 dark:text-gray-300 text-xs font-semibold rounded-full">
                    {program.degree}
                  </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-navy-600 dark:text-white mb-4 flex-1">
                                        {program.name}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="w-4 h-4" />
                                            <span>{program.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpenIcon className="w-4 h-4" />
                                            <span>{program.credits} Credits</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-navy-600 text-navy-600 dark:text-white font-medium hover:bg-accent hover:text-white hover:border-accent transition-colors duration-300">
                                        View Details
                                    </button>
                                </motion.div>
                        ) :

                        <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                            No programs found matching your criteria.
                        </div>
                    }
                </div>
            </div>
        </section>);

}