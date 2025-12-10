import { createContext, useContext, useEffect, useState } from "react";
import { initMockUsers, login as mockLogin, signup as mockSignup } from "../api/mockAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("mockCurrentUser");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    initMockUsers();
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("mockCurrentUser", JSON.stringify(user));
    else localStorage.removeItem("mockCurrentUser");
  }, [user]);

  const login = async (email, password) => {
    const u = await mockLogin(email, password);
    setUser({ id: u.id, email: u.email, fullName: u.fullName, role: u.role });
    return u;
  };

  const signup = async (fullName, email, password) => {
    const u = await mockSignup(fullName, email, password);
    const userObj = { id: u.id, email: u.email, fullName: u.fullName, role: u.role };
    setUser(userObj);
    return userObj;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
