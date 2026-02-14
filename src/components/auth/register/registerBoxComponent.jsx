'use client'
import React from 'react'
import { useRegister } from '@/hooks/auth/useRegister'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Link from 'next/link'
import RegisterStepper from './RegisterStepper'
import SlideTransition from './SlideTransition'
import Phase1Content from './Phase1Content'
import Phase2Content from './Phase2Content'
import Phase3Content from './Phase3Content'
import ErrorToast from './ErrorToast'

const RegisterBoxComponent = () => {
  const {
    currentPhase,
    direction,
    formData,
    showPassword,
    isLoading,
    errorMessage,
    setErrorMessage,
    setShowPassword,
    handleInputChange,
    handleFileChange,
    handleNext,
    handlePrev,
    handleRegister,
  } = useRegister()

  const phaseContent = [
    <Phase1Content
      key="phase1"
      formData={formData}
      handleInputChange={handleInputChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />,
    <Phase2Content
      key="phase2"
      formData={formData}
      handleInputChange={handleInputChange}
      handleFileChange={handleFileChange}
    />,
    <Phase3Content
      key="phase3"
      formData={formData}
      handleInputChange={handleInputChange}
    />,
  ]

  return (
    <div className="flex flex-col w-full max-w-4xl bg-[#111316]/60 backdrop-blur-xl rounded-xl border border-white/5 overflow-hidden shadow-2xl">

      {/* ── Top gradient accent ──────────────────────── */}
      <div className="w-full h-[2px] bg-gradient-to-r from-[#00DF99] via-[#00C9BD] to-transparent" />

      {/* ── Back to Signin ───────────────────────────── */}
      <div className="px-6 py-4">
        <Link
          href="/dashboard/login"
          className="text-xs text-white/50 hover:text-[#00DF99] transition-colors flex items-center gap-1"
        >
          ← Back to Signin
        </Link>
      </div>

      {/* ── Error message (floating) ────────────────── */}
      <div className="relative">
        <ErrorToast message={errorMessage} onDismiss={() => setErrorMessage('')} />
      </div>

      {/* ── Stepper ──────────────────────────────────── */}
      <RegisterStepper currentPhase={currentPhase} />

      {/* ── Content with slide animation ─────────────── */}
      <SlideTransition activeKey={currentPhase} direction={direction}>
        {phaseContent[currentPhase]}
      </SlideTransition>


      {/* ── Navigation buttons ───────────────────────── */}
      <div className="px-6 pb-5 pt-3 flex justify-between items-center">
        {currentPhase > 0 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-5 py-2 text-sm text-white/70 border border-[#2E3137] rounded-lg hover:border-[#00DF99]/50 hover:text-white transition-all hover:bg-[#00DF99]/5"
          >
            Previous
          </button>
        ) : (
          <div />
        )}

        {currentPhase < 2 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00DF99] to-[#00C9BD] rounded-lg hover:shadow-[0_0_15px_rgba(0,223,153,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-lg" />
            ) : (
              'Next'
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRegister}
            disabled={isLoading || !formData.eulaAccepted}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00DF99] to-[#00C9BD] rounded-lg hover:shadow-[0_0_15px_rgba(0,223,153,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-lg" />
            ) : (
              'Register'
            )}
          </button>
        )}
      </div>

      {/* ── Bottom gradient accent ────────────────────── */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00DF99]/30 to-transparent" />

      {/* ── Custom scrollbar styles ───────────────────── */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 223, 153, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 223, 153, 0.5);
        }
      `}</style>
    </div>
  )
}

export default RegisterBoxComponent