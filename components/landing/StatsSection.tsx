"use client"

import { BookOpen, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

export function StatsSection() {
  return (
    <section className="py-16 bg-white sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-[#1E293B] mb-2">
              1000+
            </h3>
            <p className="text-gray-600">Courses Available</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-[#1E293B] mb-2">
              50,000+
            </h3>
            <p className="text-gray-600">Active Students</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-[#1E293B] mb-2">500+</h3>
            <p className="text-gray-600">Expert Instructors</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

