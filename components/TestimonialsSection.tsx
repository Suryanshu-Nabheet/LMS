"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Suryanshu Nabheet",
    role: "Founder & Instructor",
    content:
      "CourseX has transformed my career. The quality of courses and instructors is outstanding!",
    rating: 5,
  },
  {
    name: "Suryanshu Nabheet",
    role: "Founder & Instructor",
    content:
      "I've learned so much in such a short time. The platform is intuitive and the content is top-notch.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    content:
      "The best investment I've made in my professional development. Highly recommend!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-[#1E293B] mb-12">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-[#F8FAFC] p-6 rounded-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-[#1E293B]">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

