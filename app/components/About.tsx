'use client'

import { motion } from 'framer-motion'
import { Code, Users, Award } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto text-left">
            I'm a UI Engineer with 7 years of experience building scalable, high-performance user interfaces with React.js and Next.js. Over time, I've expanded my skillset beyond frontend to include backend development, database design, DevOps, and AI integration.
            <br />
            <br />
            While my professional work has focused on frontend leadership, I have built and showcased multiple proof-of-concepts (POCs) in full-stack and AI-driven applications, gaining practical hands-on experience in Next.js, PostgreSQL, Docker, Proxmox, and AI APIs.
            <br />
            <br />
            My goal is to bridge my strong frontend expertise with full-stack problem solving, delivering end-to-end solutions that are scalable, modern, and AI-ready. test
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Code className="w-8 h-8" />, title: 'Clean Code', desc: 'Writing maintainable, scalable code' },
            { icon: <Users className="w-8 h-8" />, title: 'Team Leadership', desc: 'Mentoring and leading development teams' },
            { icon: <Award className="w-8 h-8" />, title: 'Best Practices', desc: 'Following industry standards and patterns' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-dark-700/50 rounded-lg"
            >
              <div className="text-primary-400 mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
