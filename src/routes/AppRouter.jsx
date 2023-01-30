import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LogInPage } from '../auth';
import { CalendarPage, LoadingPage } from '../calendar/index';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, []);

  if(status === 'checking') return <LoadingPage/>

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path='/auth/*' element={<LogInPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
          )
          : (
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )
      }
      
    </Routes>
  )
}