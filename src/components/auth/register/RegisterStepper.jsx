'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FiKey, FiUser, FiFileText, FiCheck } from 'react-icons/fi'

const STEPS = [
  { label: 'Account', icon: FiKey },
  { label: 'User', icon: FiUser },
  { label: 'EULA', icon: FiFileText },
]

const RegisterStepper = ({ currentPhase }) => {
  return (
    <div className="w-full px-6 py-4">
      <div className="relative flex items-center justify-between">
        {/* Background line — positioned to vertically center on circles (top of circle area) */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/10 mx-[3.25rem]" />

        {/* Animated progress line — same vertical centering */}
        <motion.div
          className="absolute top-5 left-0 h-[2px] mx-[3.25rem]"
          style={{
            background: 'linear-gradient(90deg, #00DF99, #00C9BD)',
            boxShadow: '0 0 8px #00DF99',
          }}
          initial={{ width: '0%' }}
          animate={{
            width: currentPhase === 0
              ? '0%'
              : currentPhase === 1
                ? 'calc(50%)'
                : 'calc(100%)',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Step circles */}
        {STEPS.map((step, index) => {
          const isCompleted = index < currentPhase
          const isActive = index === currentPhase

          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                  ${isCompleted
                    ? 'bg-gradient-to-br from-[#00DF99] to-[#00C9BD] border-[#00DF99]'
                    : isActive
                      ? 'bg-[#111316] border-[#00DF99]'
                      : 'bg-[#111316] border-white/20'
                  }
                `}
                animate={isActive ? {
                  boxShadow: ['0 0 0px #00DF99', '0 0 12px #00DF99', '0 0 0px #00DF99'],
                } : {}}
                transition={isActive ? { duration: 2, repeat: Infinity } : {}}
              >
                {isCompleted ? (
                  <FiCheck className="text-white text-lg" />
                ) : (
                  <step.icon className={`text-lg ${isActive ? 'text-[#00DF99]' : 'text-white/40'}`} />
                )}
              </motion.div>
              <span className={`mt-2 text-xs font-medium ${isActive || isCompleted ? 'text-[#00DF99]' : 'text-white/40'}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RegisterStepper
