import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { mockUser, mockAdmin } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    let authenticatedUser: User | null = null;

    if (email === "admin@example.com" && password === "admin123") {
      authenticatedUser = mockAdmin;
    } else if (email === "user@example.com" && password === "user123") {
      authenticatedUser = mockUser;
    } else if (email.includes("@") && password.length >= 6) {
      // Allow any valid email/password for demo purposes
      authenticatedUser = {
        ...mockUser,
        email,
        id: `user_${Date.now()}`,
      };
    }

    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${authenticatedUser.firstName}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login Failed",
        description:
          "Invalid email or password. Try admin@example.com/admin123 or user@example.com/user123",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock registration logic
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    toast({
      title: "Registration Successful",
      description: `Welcome to our store, ${newUser.firstName}!`,
    });

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
