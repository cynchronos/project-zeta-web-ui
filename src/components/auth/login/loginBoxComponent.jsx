'use client'
import React, { useState } from 'react'
import { useLogin } from '@/hooks/auth/useLogin'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FiAlertCircle, FiX } from 'react-icons/fi'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import Link from 'next/link'
import Image from 'next/image'

const LoginBoxComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)

  const {
    loginData,
    isLoading,
    isError,
    error,
    handleInputChange,
    handleLogin,
  } = useLogin()

  // Show error toast when isError changes
  React.useEffect(() => {
    if (isError) setErrorVisible(true)
    else setErrorVisible(false)
  }, [isError])

  // Auto-dismiss error after 4s
  React.useEffect(() => {
    if (!errorVisible) return
    const timer = setTimeout(() => setErrorVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [errorVisible])

  const errorMsg = error?.data?.message || 'Login failed. Please try again.'

  return (
    <div className="flex flex-col w-full max-w-4xl bg-[#111316]/60 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden shadow-2xl">

      {/* ── Top gradient accent ─────────────────────────── */}
      <div className="w-full h-[2px] bg-gradient-to-r from-[#00DF99] via-[#00C9BD] to-transparent" />

      {/* ── Floating error toast ────────────────────────── */}
      <div className="relative">
        <div className={`absolute left-0 right-0 z-20 px-6 pt-3 transition-all duration-300 ${errorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className="w-full text-red-400 text-xs bg-red-950/80 backdrop-blur-sm border border-red-500/20 rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-lg shadow-red-500/10">
            <FiAlertCircle className="text-red-400 shrink-0" size={14} />
            <span className="flex-1">{errorMsg}</span>
            <button type="button" onClick={() => setErrorVisible(false)} className="text-red-400/50 hover:text-red-400 transition-colors shrink-0 p-0.5">
              <FiX size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ——— Two-column grid ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* ── Left Column — Illustration ─────────────────── */}
        <div className="hidden lg:flex flex-col items-center justify-center p-10 border-r border-white/5">
          <div className="w-56 h-56 flex items-center justify-center mb-4">
            <Image
              src="/assets/images/rand-register-image-1.png"
              width={400}
              height={400}
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(0,223,153,0.15)]"
              alt="Login Illustration"
            />
          </div>
          <h2 className="text-lg font-semibold text-white/90 mb-1">Welcome Back!</h2>
          <p className="text-sm text-white/40 text-center max-w-[200px]">Sign in to continue your journey</p>
        </div>

        {/* ── Right Column — Form ────────────────────────── */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-10">

          {/* Header — mobile only shows icon */}
          <div className="flex flex-col items-start gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00DF99]/20 to-[#00C9BD]/10 border border-[#00DF99]/20 flex items-center justify-center lg:hidden">
              <HiOutlineChatBubbleLeftRight className="text-[#00DF99] text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Sign In</h1>
              <p className="text-sm text-white/40 mt-1">Enter your credentials to access your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Username */}
            <div>
              <label className="text-xs text-white/50 mb-1.5 block font-medium">Username</label>
              <input
                type="text"
                name="username"
                placeholder="your username"
                value={loginData.username}
                onChange={handleInputChange}
                className="w-full h-11 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3.5 text-white text-sm placeholder:text-white/25 focus:border-[#00DF99]/50 focus:outline-none focus:ring-1 focus:ring-[#00DF99]/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-white/50 mb-1.5 block font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleInputChange}
                  className="w-full h-11 bg-[#181A1D]/60 border border-[#2E3137] rounded-lg px-3.5 pr-11 text-white text-sm placeholder:text-white/25 focus:border-[#00DF99]/50 focus:outline-none focus:ring-1 focus:ring-[#00DF99]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-[#00DF99] to-[#00C9BD] rounded-lg hover:shadow-[0_0_20px_rgba(0,223,153,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-lg" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-white/40">
              Don&apos;t have an account?{' '}
              <Link
                href="/dashboard/register"
                className="text-[#00DF99] hover:text-[#00DF99]/80 transition-colors font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom gradient accent ──────────────────────── */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00DF99]/30 to-transparent" />
    </div>
  )
}

export default LoginBoxComponent