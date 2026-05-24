'use client'

import { motion } from 'framer-motion'
import { skills } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-gray-300 text-lg">
            Technologies and tools I work with to create amazing web experiences
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* Frontend */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">Frontend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.frontend.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-700/50 p-6 rounded-lg text-center"
                >
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold">{skill.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Design System */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">Design System</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.designSystem.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-700/50 p-6 rounded-lg text-center"
                >
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold">{skill.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Backend & DevOps */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">Backend & DevOps</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.backendAndDevOps.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-700/50 p-6 rounded-lg text-center"
                >
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold">{skill.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emerging / Niche */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">Emerging / Niche</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.emerging.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-dark-700/50 p-6 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{skill.icon}</div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                      <p className="text-gray-300 text-sm">{skill.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
