import { createContext, useContext, useState, useEffect } from 'react';
import { userApi } from '../services/api';

const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const saveUserData = (authUser, authToken) => {
    localStorage.setItem('authUser', JSON.stringify(authUser));
    localStorage.setItem('authToken', authToken);
    setUser(authUser);
    setToken(authToken);
  };

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await userApi.login(username, password);
      const { token: newToken, role, user: userData } = response.data;
      const payload = parseJwt(newToken);
      const authUser = {
        username: userData?.username || username || payload?.username || payload?.sub || 'Bruker',
        role:
          userData?.role ||
          role ||
          payload?.role ||
          (Array.isArray(payload?.roles) ? payload.roles[0] : undefined) ||
          'user',
      };
      saveUserData(authUser, newToken);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const register = async (username, password, role = 'user') => {
    try {
      setError(null);
      const response = await userApi.register(username, password, role);
      const { token: newToken, role: returnedRole, user: userData } = response.data;
      const payload = parseJwt(newToken);
      const authUser = {
        username: userData?.username || username || payload?.username || payload?.sub || 'Bruker',
        role:
          userData?.role ||
          returnedRole ||
          role ||
          payload?.role ||
          (Array.isArray(payload?.roles) ? payload.roles[0] : undefined) ||
          'user',
      };
      saveUserData(authUser, newToken);
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
