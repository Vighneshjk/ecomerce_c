import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  faceShape?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('akela_access_token');
    const savedUser = localStorage.getItem('akela_user');
    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    const response = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.detail || 'Login failed. Please check your credentials.');
    }
    
    setUser(data.user);
    localStorage.setItem('akela_user', JSON.stringify(data.user));
    localStorage.setItem('akela_access_token', data.access);
    localStorage.setItem('akela_refresh_token', data.refresh);
  };

  const register = async (name: string, email: string, pass: string) => {
    const response = await fetch('/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        email, 
        password: pass,
        confirm_password: pass 
      }),
    });
    
    const data = await response.json();
    if (!response.ok) {
      let errorMessage = data.error || 'Registration failed';
      if (data.details && typeof data.details === 'object') {
        const detailValues = Object.values(data.details).flat();
        if (detailValues.length > 0) {
          errorMessage = detailValues[0] as string;
        }
      }
      throw new Error(errorMessage);
    }
    
    setUser(data.user);
    localStorage.setItem('akela_user', JSON.stringify(data.user));
    localStorage.setItem('akela_access_token', data.access);
    localStorage.setItem('akela_refresh_token', data.refresh);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('akela_user');
    localStorage.removeItem('akela_access_token');
    localStorage.removeItem('akela_refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
