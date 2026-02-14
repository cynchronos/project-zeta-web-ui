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
            {
              !isClient || isLoading || isFetching ? (
                <aside className={`grow flex flex-col w-full h-full bg-${backgroundLayout} ${opacity ? 'bg-opacity-' + opacity : ''} backdrop-blur-xl rounded-lg shadow-neon overflow-y-auto text-white`}>
                  <div className="w-full p-6 animate-pulse" aria-hidden="true">
                    <div className="space-y-8">

                      {/* Baris 1: Kartu KPI */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="h-32 rounded-lg bg-white/5"></div>
                        <div className="h-32 rounded-lg bg-white/5"></div>
                        <div className="h-32 rounded-lg bg-white/5"></div>
                        <div className="h-32 rounded-lg bg-white/5 hidden md:block lg:hidden"></div>
                      </div>

                      {/* Baris 2: Grafik */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 h-72 rounded-lg bg-white/5"></div>
                        <div className="h-72 rounded-lg bg-white/5"></div>
                      </div>

                      {/* Baris 3: Tabel */}
                      <div className="rounded-lg bg-white/5 p-4 space-y-4">
                        {/* Header Tabel (opsional) */}
                        <div className="h-6 rounded bg-white/10 w-1/4"></div>
                        {/* Baris Tabel */}
                        <div className="space-y-3">
                          <div className="h-4 rounded bg-white/10"></div>
                          <div className="h-4 rounded bg-white/10"></div>
                          <div className="h-4 rounded bg-white/10 w-5/6"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </aside>
              ) : (
                <aside className={`grow flex flex-col w-full h-full bg-${backgroundLayout} ${opacity ? 'bg-opacity-' + opacity : ''} backdrop-blur-xl rounded-lg shadow-neon overflow-y-auto text-white`}>
                  {children}
                </aside>
              )
            }
          </div>
        </div>
      </main>
    </ConversationSocketProvider>
  )
}

export default DashboardLayout