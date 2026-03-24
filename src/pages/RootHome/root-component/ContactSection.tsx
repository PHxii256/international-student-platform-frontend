import { motion } from 'framer-motion';
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';
import {SectionHeading} from "../SectionHeading.tsx";
export function ContactSection() {
  return (
    <section className="py-20 bg-white dark:bg-navy-500 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Contact Us"
          subtitle="Have questions? Our International Office is here to help you every step of the way." />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            className="bg-gray-50 dark:bg-navy-600 p-8 rounded-2xl border border-gray-100 dark:border-navy-500">

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-500 bg-white dark:bg-navy-500 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="John Doe" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-500 bg-white dark:bg-navy-500 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    placeholder="john@example.com" />

                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country of Residence
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-500 bg-white dark:bg-navy-500 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all appearance-none">
                  <option value="">Select a country</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="ae">United Arab Emirates</option>
                  <option value="kw">Kuwait</option>
                  <option value="jo">Jordan</option>
                  <option value="ng">Nigeria</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-navy-500 bg-white dark:bg-navy-500 text-navy-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  placeholder="How can we help you?">
                </textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-accent hover:bg-accent-600 text-white font-bold shadow-lg shadow-accent/30 transition-all hover:-translate-y-1">

                Send Message
              </button>
            </form>
          </motion.div>

          {/* Info & Map */}
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
            className="flex flex-col gap-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-600 dark:text-white mb-1">
                    Call Us
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    +20 2 38247455
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Ext: 101, 102
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-600 dark:text-white mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    international@must.edu.eg
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    admission@must.edu.eg
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex-1 bg-gray-100 dark:bg-navy-600 rounded-2xl border border-gray-200 dark:border-navy-500 overflow-hidden relative min-h-[300px] flex items-center justify-center group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-navy-500 shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                  <MapPinIcon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-bold text-navy-600 dark:text-white mb-2">
                  MUST Campus
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
                  Al-Motamayez District, 6th of October City, Giza, Egypt
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}