import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, signupApi, setupAxiosToken } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
        // Thiết lập token đã lưu cho Axios header
        setupAxiosToken();
    }, [user]);

  // useEffect(() => {
  //       if (user) {
  //           // Lưu thông tin user (không bao gồm token)
  //           localStorage.setItem("currentUser", JSON.stringify(user));
  //       } else {
  //           localStorage.removeItem("currentUser");
  //       }
  //   }, [user]);

  const login = async (email, password) => {
        // Gọi API Đăng nhập thật
        const userObj = await loginApi(email, password); 
         
        // Cập nhật state User sau khi đăng nhập thành công
        setUser(userObj); 
        return userObj;
    };

  const signup = async (fullName, email, password) => {
        
        await signupApi(fullName, fullName, email, password);

        
        return { success: true, message: "Registration successful. Please log in." }; 
    };
    
    const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
