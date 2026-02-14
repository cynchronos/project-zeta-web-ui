'use client'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { reduxStore } from '@/lib/redux/store'

const StoreProvider = ({ children }) => {
  const storeRef = useRef(null)
  if (!storeRef.current) {
    storeRef.current = reduxStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider