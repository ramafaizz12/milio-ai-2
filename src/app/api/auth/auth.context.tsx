// libs/auth/auth.context.tsx
'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getToken } from 'libs/api-client/token_service';
interface AuthContextType {
  isAuthenticated: boolean;
}
const queryClient = new QueryClient();
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push('/');
    } else {
      router.push('/auth/sign-in-1');
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthContext.Provider>
  );
};
