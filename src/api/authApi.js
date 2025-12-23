// src/api/authApi.js (Thay thế cho mockAuth.js)
import axios from 'axios';


const BASE_URL = 'http://localhost:8081/auth'; 

/**
 
 * @param {string} email
 * @param {string} password
 * @returns Promise<UserObject & { token: string }>
 */
export const loginApi = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, 
            { email, passwordHash: password }, 
            { headers: { 'Content-Type': 'application/json' } } 
        );

        const data = response.data;
        
        if (data.status !== 200 || !data.token) {
             throw new Error(data.message || 'Login failed due to incomplete response.');
        }

        const token = data.token;
        const role = data.role; 
        
        
        
       
       
        const user = {
            id: null, // Không có ID, đặt là null hoặc 0
            email: email, // Lấy email từ request
            fullName: 'Unknown', // Không có Full Name
            role: role,
        };

        // Lưu token vào localStorage và gán vào header mặc định của Axios
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Lưu user object vào Local Storage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        
        return user;
        
    } catch (error) {
      
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};


export const signupApi = async (username, fullName, email, password) => { 
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            username,
            fullName,
            email,
            passwordHash : password, 
        });

        const data = response.data;
        if (data.status !== 200) {
            throw new Error(data.message || 'Signup failed');
        }

        return data.message;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const setupAxiosToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    return false;
};


export const initMockUsers = () => {  };