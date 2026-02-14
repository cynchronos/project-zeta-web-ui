'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FiAlertCircle, FiX } from 'react-icons/fi'

const DISMISS_DURATION = 3000

const ErrorToast = ({ message, onDismiss }) => {
  const [visible, setVisible] = useState(false)
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  useEffect(() => {
    if (!message) { setVisible(false); return }

    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismissRef.current?.(), 300)
    }, DISMISS_DURATION)

    return () => clearTimeout(timer)
  }, [message])

  if (!message && !visible) return null

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onDismissRef.current?.(), 300)
  }

  return (
    <div className={`absolute left-0 right-0 z-20 px-6 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
      <div className="w-full text-red-400 text-xs bg-red-950/80 backdrop-blur-sm border border-red-500/20 rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-lg shadow-red-500/10">
        <FiAlertCircle className="text-red-400 shrink-0" size={14} />
        <span className="flex-1">{message}</span>
        <button
          type="button"
          onClick={handleClose}
          className="text-red-400/50 hover:text-red-400 transition-colors shrink-0 p-0.5"
        >
          <FiX size={12} />
        </button>
      </div>
    </div>
  )
}

export default ErrorToast
