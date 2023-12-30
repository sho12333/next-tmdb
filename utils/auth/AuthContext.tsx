'use client'

import { ReactNode, createContext, useState, useContext, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { app } from '../firebase'

export type UserType = User | null

export type AuthContextProps = {
  user: UserType
}

export type AuthProps = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter()
  const auth = getAuth(app)
  const [user, setUser] = useState<UserType>(null)
  const value = {
    user,
  }

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      !user && (await router.push('/auth/login'))
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
