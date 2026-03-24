import { motion } from 'framer-motion';
import { GlobeIcon, UsersIcon, HeartIcon, ShieldIcon } from 'lucide-react';
const features = [
    {
        icon: GlobeIcon,
        title: 'Why Study at MUST',
        points: [
            'Globally recognized degrees',
            'Diverse multicultural environment',
            'Strategic location in Egypt',
            'State-of-the-art facilities']

    },
    {
        icon: UsersIcon,
        title: 'Student Services',
        points: [
            'Dedicated international office',
            'Visa and residency assistance',
            'Airport pickup services',
            'Orientation programs']

    },
    {
        icon: HeartIcon,
        title: 'Campus Life',
        points: [
            'Vibrant student clubs',
            'Modern sports complex',
            'On-campus housing options',
            'Various dining facilities']

    },
    {
        icon: ShieldIcon,
        title: 'Support System',
        points: [
            'Academic advising',
            'Counseling services',
            '24/7 campus security',
            'On-campus hospital access']

    }];

export function InternationalStudents() {
    return (
        <section
            id="international"
            className="py-20 bg-navy-600 text-white relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
                            International Students
                            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-accent rounded-full"></span>
                        </h2>
                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
                            A home away from home. We provide comprehensive support to ensure
                            your success and well-being.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) =>
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}
                                viewport={{
                                    once: true
                                }}
                                transition={{
                                    delay: index * 0.1
                                }}
                                className="bg-navy-500/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-accent/50 transition-colors">

                                <feature.icon className="w-10 h-10 text-accent mb-4" />
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <ul className="space-y-2">
                                    {feature.points.map((point, i) =>
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-gray-300">

                                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"></div>
                                            {point}
                                        </li>
                                    )}
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 group">

                        {/* Image Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-br from-navy-500 to-navy-600 flex items-center justify-center">
                            <div className="text-center p-8">
                                <GlobeIcon className="w-20 h-20 text-white/20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500" />
                                <p className="text-white/50 font-medium">
                                    International Campus Life
                                </p>
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-navy-600 via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl font-bold mb-2">
                                Join Our Global Community
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Connect with students from over 50 countries and build lifelong
                                friendships.
                            </p>
                            <button className="px-6 py-3 bg-accent hover:bg-accent-600 text-white rounded-lg font-medium transition-colors w-fit">
                                Learn More About Student Life
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>);

}