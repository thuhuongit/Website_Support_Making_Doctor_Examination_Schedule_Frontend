import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const activeToken = sessionStorage.getItem("activeLoginToken");

    if (storedUser && activeToken) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.loginToken === activeToken) {
        return parsedUser;
      }
    }
    return null;
  });

  useEffect(() => {
    const onStorageChange = (e) => {
      if (e.key === "user") {
        const updatedUser = e.newValue ? JSON.parse(e.newValue) : null;
        const activeToken = sessionStorage.getItem("activeLoginToken");

        if (updatedUser?.loginToken === activeToken) {
          setUser(updatedUser);
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
