"use client";

import React, { createContext, ReactNode } from "react";
import {
  AuthContextType,
  User,
  LoginCredentials,
  RegisterData,
} from "@/types/auth";
import { useAuth } from "@/src/hooks/use-auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async (credentials: LoginCredentials) => ({
    user: {} as User,
    access: "" as string,
    refresh: "" as string,
  }),
  register: async (data: RegisterData) => { },
  logout: () => { },
  isAuthenticated: false,
  isLoading: false,
  loginError: null,
  registerError: null,
  profile: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuth();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
