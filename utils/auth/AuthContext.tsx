'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';
import { useSession, signIn, SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

type AuthContextProps = {
  user: any;
  status: 'authenticated' | 'loading' | 'unauthenticated';
};

type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

function AuthenticationLogic({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      if (pathname !== '/auth/register' && pathname !== '/auth/login') {
        router.push('/auth/login');
      }
    }
  }, [status, pathname, router]);

  const value = {
    user: session?.user || null,
    status,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: AuthProps) {
  return (
    <SessionProvider>
      <AuthenticationLogic>{children}</AuthenticationLogic>
    </SessionProvider>
  );
}

export function useRequireAuth() {
  const { user, status } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  return { user, isLoading: status === 'loading' };
}
