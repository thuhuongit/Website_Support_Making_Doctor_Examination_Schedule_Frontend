import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    const tok = sessionStorage.getItem("activeLoginToken");
    if (stored && tok) {
      const u = JSON.parse(stored);
      return u.loginToken === tok ? u : null;
    }
    return null;
  });

useEffect(() => {
  const handleStorage = (e) => {
    if (e.key === 'tokens') {
      const newTokens = e.newValue ? JSON.parse(e.newValue) : null;
      if (!newTokens) {
        setUser(null);
      } else if (newTokens.accessToken !== currentAccessToken) {
        // token khác => logout
        setUser(null);
      } else {
        // token giống => giữ login
      }
    }
  };

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
