'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/projects'
import { trackCTAClick } from '../services/analytics'

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-300 text-lg">
            A showcase of my recent work and side projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              onClick={() => trackCTAClick({ctaName:'project-demo', ctaType: 'project-cta', additionalData: {
                project_title: project.title,
                project_index: index,
                action: 'view_demo',
                platform: 'external'
              }})}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-700/50 rounded-lg overflow-hidden hover:bg-dark-700 transition-colors duration-200 h-full"
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="text-4xl mb-4">{project.image}</div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary-600/20 text-primary-300 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div>
                  <p
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
