import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";
const faqData = [
    {
        category: 'Admission',
        questions: [
            {
                q: 'What is the deadline for international applications?',
                a: 'The deadline for the Fall semester is usually August 15th, and for the Spring semester is January 15th. However, we recommend applying early as spots fill up quickly.'
            },
            {
                q: 'Do I need to take an English proficiency test?',
                a: 'Yes, if you are applying to programs taught in English and you are not from an English-speaking country, you must provide IELTS (min 5.5) or TOEFL scores.'
            },
            {
                q: 'Can I transfer credits from another university?',
                a: 'Yes, transfer students are welcome. You must submit official transcripts and course descriptions for evaluation by the respective faculty.'
            }]

    },
    {
        category: 'Fees',
        questions: [
            {
                q: 'How can I pay my tuition fees?',
                a: 'International students can pay via bank transfer in USD or through our secure online payment portal using credit cards.'
            },
            {
                q: 'Are there scholarships available for international students?',
                a: 'MUST offers merit-based scholarships for outstanding international students. Details are announced before the start of each academic year.'
            }]

    },
    {
        category: 'Visa',
        questions: [
            {
                q: 'Does the university help with student visas?',
                a: 'Yes, once you are accepted and pay the initial fees, our International Office will provide you with the necessary documents to apply for a student visa at the Egyptian embassy in your country.'
            },
            {
                q: 'How do I renew my residency in Egypt?',
                a: 'Our student services team assists all enrolled international students with the annual residency renewal process.'
            }]

    },
    {
        category: 'Housing',
        questions: [
            {
                q: 'Is on-campus housing available?',
                a: 'Yes, MUST provides fully equipped on-campus dormitories separate for male and female students, with 24/7 security and amenities.'
            },
            {
                q: 'How much does housing cost?',
                a: 'Housing fees vary depending on room type (single, double) and range from $1,500 to $3,000 per academic year.'
            }]

    }];

export function FAQ() {
    const [activeCategory, setActiveCategory] = useState('Admission');
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const currentQuestions =
        faqData.find((c) => c.category === activeCategory)?.questions || [];
    return (
        <section
            id="faq"
            className="py-20 bg-gray-50 dark:bg-navy-600 transition-colors duration-300">

            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <SectionHeading
                    title="Frequently Asked Questions"
                    subtitle="Find quick answers to common questions about studying at MUST." />


                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {faqData.map((cat) =>
                        <button
                            key={cat.category}
                            onClick={() => {
                                setActiveCategory(cat.category);
                                setOpenIndex(0);
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.category ? 'bg-accent text-white shadow-md' : 'bg-white dark:bg-navy-500 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-400'}`}>

                            {cat.category}
                        </button>
                    )}
                </div>

                {/* Accordion */}
                <div className="space-y-4">
                    {currentQuestions.map((item, index) =>
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 10
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: index * 0.1
                                }}
                                className="bg-white dark:bg-navy-500 rounded-xl shadow-sm border border-gray-100 dark:border-navy-500 overflow-hidden">

                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none">

                <span className="font-bold text-navy-600 dark:text-white pr-8">
                  {item.q}
                </span>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === index ? 'bg-accent text-white' : 'bg-gray-100 dark:bg-navy-600 text-gray-500 dark:text-gray-400'}`}>

                                        <ChevronDownIcon
                                            className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />

                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index &&
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0
                                            }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0
                                            }}
                                            transition={{
                                                duration: 0.3
                                            }}
                                            className="overflow-hidden">

                                            <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-navy-600 pt-4 mt-2">
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </motion.div>
                    )}
                </div>
            </div>
        </section>);

}