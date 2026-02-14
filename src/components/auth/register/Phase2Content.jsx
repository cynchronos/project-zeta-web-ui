'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'

const Phase2Content = ({ formData, handleInputChange, handleFileChange }) => {
  const fileInputRef = useRef(null)

  return (
    <div className="grid grid-cols-[2fr_3fr] gap-8 w-full">
      {/* Grid 1 — Profile Picture */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-40 h-40 rounded-full border-2 border-[#00DF99]/40 flex items-center justify-center cursor-pointer hover:border-[#00DF99] transition-colors overflow-hidden group"
        >
          {formData.profileImage ? (
            <Image
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <FiUser className="text-[#00DF99]/60 text-3xl group-hover:text-[#00DF99] transition-colors" />
              <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">Upload</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs text-[#00DF99] hover:text-[#00DF99]/80 transition-colors border border-[#00DF99]/30 rounded-md px-5 py-1.5 hover:bg-[#00DF99]/10"
        >
          Change
        </button>
      </div>

      {/* Grid 2 — Name + Bio */}
      <div className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="text-xs text-white/50 mb-1 block">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Display Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full h-10 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3 text-white text-sm placeholder:text-white/30 focus:border-[#00DF99]/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-xs text-white/50 mb-1 block">Bio</label>
          <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={formData.bio}
            onChange={handleInputChange}
            rows={6}
            className="w-full bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:border-[#00DF99]/50 focus:outline-none transition-colors resize-none custom-scrollbar"
          />
        </div>
      </div>
    </div>
  )
}

export default Phase2Content
