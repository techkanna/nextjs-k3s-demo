'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'
import { trackCTAClick } from '../services/analytics'


export default function Contact() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <motion.a
            href="mailto:senthilkannan@techkanna.com"
            className="flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackCTAClick({ctaName:'contact-email', ctaType: 'contact-cta', additionalData: {
              section: 'contact',
              action: 'send_email',
              platform: 'email',
              email: 'senthilkannan@techkanna.com'
            }})}
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </motion.a>

          <div className="flex gap-4">
            <motion.a
              href="https://github.com/techkanna"
              className="p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => trackCTAClick({ctaName: 'contact-github', ctaType: 'contact-cta', additionalData: {
                section: 'contact',
                action: 'visit_profile',
                platform: 'github',
                url: 'https://github.com/techkanna'
              }})}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/techkanna"
              className="p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => trackCTAClick({ctaName: 'contact-linkedin', ctaType: 'contact-cta', additionalData: {
                section: 'contact',
                action: 'visit_profile',
                platform: 'linkedin',
                url: 'https://www.linkedin.com/in/techkanna'
              }})}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
