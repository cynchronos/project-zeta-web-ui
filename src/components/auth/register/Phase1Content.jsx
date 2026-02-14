'use client'
import Image from 'next/image'
import React from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const Phase1Content = ({ formData, handleInputChange, showPassword, setShowPassword }) => {
  return (
    <div className="grid grid-cols-2 gap-8 w-full">
      {/* Grid 1 — Image / Icon */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-64 h-64 rounded-2xl flex items-center justify-center">
          <Image
            src="/assets/images/rand-register-image-1.png"
            width={500}
            height={500}
            className="w-full h-full object-contain"
            alt="Register Illustration"
          />
        </div>
        <p className="text-sm text-white/60 font-medium">Connect to Other People!</p>
      </div>

      {/* Grid 2 — Form */}
      <div className="flex flex-col gap-3">
        {/* Username */}
        <div>
          <label className="text-xs text-white/50 mb-1 block">Username</label>
          <input
            type="text"
            name="username"
            placeholder="your_username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full h-10 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3 text-white text-sm placeholder:text-white/30 focus:border-[#00DF99]/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-white/50 mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-10 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3 text-white text-sm placeholder:text-white/30 focus:border-[#00DF99]/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-xs text-white/50 mb-1 block">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full h-10 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3 pr-10 text-white text-sm placeholder:text-white/30 focus:border-[#00DF99]/50 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/70 transition-colors"
            >
              {showPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-xs text-white/50 mb-1 block">Confirm Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full h-10 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3 pr-10 text-white text-sm placeholder:text-white/30 focus:border-[#00DF99]/50 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white/70 transition-colors"
            >
              {showPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Phase1Content
