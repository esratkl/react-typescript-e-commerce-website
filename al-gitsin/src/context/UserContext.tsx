import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserInfo {
  email: string;
  username: string;
  address: string;
  phone: string;
  card: string;
  orders: string[];
}

interface UserContextType {
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<string | null>;
  register: (userData: UserInfo & { password: string }) => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (username: string, password: string) => {
    const raw = localStorage.getItem(`user_${username}`);
    if (!raw) return 'Böyle bir kullanıcı yok';
    const data = JSON.parse(raw);
    if (data.password !== password) return 'Hatalı şifre';
    const { password: _, ...userData } = data;
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return null;
  };

  const register = async (userData: UserInfo & { password: string }) => {
    const { username } = userData;
    if (localStorage.getItem(`user_${username}`)) {
      throw new Error('Bu kullanıcı zaten var');
    }
    localStorage.setItem(`user_${username}`, JSON.stringify(userData));
    const { password, ...rest } = userData;
    setUser(rest);
    localStorage.setItem('currentUser', JSON.stringify(rest));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('UserContext kullanılamadı');
  return ctx;
};