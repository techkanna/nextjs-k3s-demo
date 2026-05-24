import { SYSTEM_DESIGN } from "../constants/system-diagram";
import { MermaidChart } from "./MermaidChart";
import { motion } from 'framer-motion'

export default function Infrastructure() {
    return (
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4">System Design & Self-Hosted Infrastructure</h2>
                    <p className="text-gray-300 text-lg">
                    A visual overview of my home-lab server architecture, virtualization setup, and the self-hosted services powering my projects.
                    </p>
                </motion.div>
                
                <MermaidChart chartDefinition={SYSTEM_DESIGN} />
            </div>
        </section>
    )
}