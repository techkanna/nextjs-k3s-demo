'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-gray-300 text-lg">
            My professional journey in web development
          </p>
        </motion.div>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-700/50 p-6 rounded-lg max-w-3xl mx-auto"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{job.position}</h3>
                  <p className="text-primary-400 font-medium">{job.company}</p>
                </div>
                <div className="text-sm text-gray-400 mt-2 md:mt-0">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-4 h-4" />
                    {job.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                </div>
              </div>
              <ul className="text-gray-300 space-y-2">
                {job.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start">
                    <span className="text-primary-400 mr-3 mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
