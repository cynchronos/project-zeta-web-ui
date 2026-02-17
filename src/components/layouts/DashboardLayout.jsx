'use client'
import React, { useState } from 'react'
import { ConversationSocketProvider } from '@/lib/sockets/conversationContext'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import SidebarPage from '../dashboard/sidebar'
import { useGetAccountQuery } from '@/lib/redux/api/slices/accountApi'
import { setCredentials } from '@/lib/redux/slices/authSlice'

const DashboardLayout = ({ children, backgroundLayout, opacity = 80 }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const { account, token } = useSelector((state) => state.auth);
  const { data: accountData, isLoading, isFetching, isError, error } = useGetAccountQuery(undefined, { skip: !token || !isClient });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!token || isError) {
      router.push('/dashboard/login');
    }
  }, [isClient, token, router, isError]);

  useEffect(() => {
    if (accountData && !account) {
      dispatch(setCredentials({ account: accountData.data, access_token: token }));
    }
    console.log(account)
  }, [accountData, account, dispatch, token]);
  return (
    <ConversationSocketProvider>
      <main className="w-screen h-screen bg-dashboard_bg bg-cover bg-center">
        <div className="flex flex-col w-full h-full backdrop-blur-2xl justify-center items-center p-10">
          <div className="flex w-full h-full gap-x-10">
            <aside><SidebarPage data={accountData} /></aside>
            <aside className={`grow flex flex-col w-full h-full bg-${backgroundLayout} ${opacity ? 'bg-opacity-' + opacity : ''} backdrop-blur-xl rounded-lg shadow-neon overflow-y-auto text-white`}>
              {children}
            </aside>
          </div>
        </div>
      </main>
    </ConversationSocketProvider>
  )
}

export default DashboardLayout