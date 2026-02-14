'use client'
import { useState } from 'react'
import {
  useRegisterPhase1Mutation,
  useRegisterPhase2Mutation,
  useRegisterFinalMutation,
} from '@/lib/redux/api/slices/accountApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useRegister = () => {
  const router = useRouter()

  // RTK mutations for each phase
  const [registerPhase1, { isLoading: isLoadingP1 }] = useRegisterPhase1Mutation()
  const [registerPhase2, { isLoading: isLoadingP2 }] = useRegisterPhase2Mutation()
  const [registerFinal, { isLoading: isLoadingFinal }] = useRegisterFinalMutation()

  // current phase index (0, 1, 2)
  const [currentPhase, setCurrentPhase] = useState(0)

  // slide direction for animation: 1 = forward (right-to-left), -1 = backward (left-to-right)
  const [direction, setDirection] = useState(1)

  // single error message shown one at a time
  const [errorMessage, setErrorMessage] = useState('')

  // helper to parse API error
  function parseApiErrors(err) {
    const data = err?.data
    if (data?.errors && typeof data.errors === 'object') {
      // backend returns { errors: { username: '...', email: '...' } }
      const firstError = Object.values(data.errors)[0]
      setErrorMessage(firstError)
    } else if (data?.message) {
      setErrorMessage(data.message)
    } else {
      setErrorMessage('Registration failed. Please try again.')
    }
  }

  // form data for all phases
  const [formData, setFormData] = useState({
    // phase 1
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // phase 2
    name: '',
    bio: '',
    profileImage: null,
    // phase 3
    eulaAccepted: false,
  })

  // show/hide password
  const [showPassword, setShowPassword] = useState(false)

  // handle input change
  function handleInputChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // handle file input (profile Image)
  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }))
    }
  }

  // tempId stored in sessionStorage for security (auto-clears on tab close)
  const TEMP_ID_KEY = 'register_tempId'

  function getTempId() {
    return sessionStorage.getItem(TEMP_ID_KEY)
  }

  function saveTempId(id) {
    sessionStorage.setItem(TEMP_ID_KEY, id)
  }

  function clearTempId() {
    sessionStorage.removeItem(TEMP_ID_KEY)
  }

  // go to next phase (with API call)
  async function handleNext(e) {
    e?.preventDefault()
    setErrorMessage('')
    try {
      if (currentPhase === 0) {
        // client-side validation — show only the first error
        if (!formData.username.trim()) { setErrorMessage('Username is required'); return }
        if (!formData.email.trim()) { setErrorMessage('Email is required'); return }
        if (!formData.password) { setErrorMessage('Password is required'); return }
        if (formData.password !== formData.confirmPassword) { setErrorMessage('Passwords do not match'); return }

        const res = await registerPhase1({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          tempId: getTempId(),
        }).unwrap()
        saveTempId(res.data)
      } else if (currentPhase === 1) {
        if (!formData.name.trim()) { setErrorMessage('Display name is required'); return }

        const phase2Data = {
          tempId: getTempId(),
          display_name: formData.name,
          description: formData.bio,
        }
        if (formData.profileImage) {
          phase2Data.profile_image = formData.profileImage.name
        }
        await registerPhase2(phase2Data).unwrap()
      }
      setErrorMessage('')
      setDirection(1)
      setCurrentPhase((prev) => Math.min(prev + 1, 2))
    } catch (err) {
      console.error('Register phase error:', err)
      parseApiErrors(err)
    }
  }

  // go to previous phase
  function handlePrev(e) {
    e?.preventDefault()
    setErrorMessage('')
    setDirection(-1)
    setCurrentPhase((prev) => Math.max(prev - 1, 0))
  }

  // final submit
  async function handleRegister(e) {
    e?.preventDefault()
    setErrorMessage('')
    try {
      if (!formData.eulaAccepted) {
        setErrorMessage('You must accept the EULA to continue')
        return
      }
      await registerFinal({
        tempId: getTempId(),
        eulaAccepted: formData.eulaAccepted,
      }).unwrap()
      clearTempId()
      toast.success('Registration successful! Redirecting to login...', { position: 'top-center' })
      router.push('/dashboard/login')
    } catch (err) {
      console.error('Register final error:', err)
      const data = err?.data
      const msg = data?.message || 'Registration failed. Please try again.'
      toast.error(msg, { position: 'top-center' })
    }
  }

  const isLoading = isLoadingP1 || isLoadingP2 || isLoadingFinal

  return {
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
  }
}

