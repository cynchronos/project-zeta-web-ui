'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

const SlideTransition = ({ activeKey, direction, children }) => {
  return (
    <div className="relative px-6 pb-2 min-h-[360px] overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeKey}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.25 },
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default SlideTransition
