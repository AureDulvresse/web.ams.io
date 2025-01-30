import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginCredentials, RegisterData, User } from "@/src/types/auth";
import { AUTH_CONFIG } from "@/auth.config";
import { authApi } from "@/src/lib/auth";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(AUTH_CONFIG.storage.ACCESS_TOKEN);
      const storedUser = localStorage.getItem(AUTH_CONFIG.storage.USER);

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          logout();
        }
      }
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: ({ user, access, refresh }) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_CONFIG.storage.ACCESS_TOKEN, access);
        localStorage.setItem(AUTH_CONFIG.storage.REFRESH_TOKEN, refresh);
        localStorage.setItem(AUTH_CONFIG.storage.USER, JSON.stringify(user));
      }
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed", error);
      throw Error("Error: ", error);
    },
  });

  const login = async (credentials: LoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: () => {
      router.push("/verify-email");
    },
    onError: (error) => {
      console.error("Registration failed", error);
    },
  });

  const register = async (data: RegisterData) => {
    return registerMutation.mutateAsync(data);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_CONFIG.storage.ACCESS_TOKEN);
      localStorage.removeItem(AUTH_CONFIG.storage.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_CONFIG.storage.USER);
    }
    setUser(null);
    queryClient.removeQueries();
    router.push("/login");
  };

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    enabled:
      typeof window !== "undefined"
        ? !!localStorage.getItem(AUTH_CONFIG.storage.ACCESS_TOKEN)
        : false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    user,
    login,
    register,
    logout,
    profile: profileQuery.data,
    isAuthenticated: !!user,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
};
