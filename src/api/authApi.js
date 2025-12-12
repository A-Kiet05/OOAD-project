// src/api/authApi.js (Thay thế cho mockAuth.js)
import axios from 'axios';

// Đảm bảo BASE_URL là cổng của Spring Boot (8081)
const BASE_URL = 'http://localhost:8081/auth'; 

/**
 * Hàm gọi API Đăng nhập
 * @param {string} email
 * @param {string} password
 * @returns Promise<UserObject & { token: string }>
 */
export const loginApi = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, 
            { email, passwordHash: password }, 
            { headers: { 'Content-Type': 'application/json' } } // Thêm headers 
        );

        const data = response.data;
        
        if (data.status !== 200 || !data.token) {
             throw new Error(data.message || 'Login failed due to incomplete response.');
        }

        const token = data.token;
        const role = data.role; // Lấy role từ phản hồi
        
        // --- VẤN ĐỀ NẰM Ở ĐÂY: KHÔNG CÓ BIẾN 'user' TRONG PHẢN HỒI ---
        
        // Vì Backend không trả về user ID và Full Name, chúng ta chỉ có thể tạo User Object
        // với những gì có sẵn, và sử dụng email làm định danh tạm thời.
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

        // Trả về đối tượng user đã tạo
        return user;
        
    } catch (error) {
        // ... (xử lý lỗi)
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

/**
 * Hàm gọi API Đăng ký
 */
export const signupApi = async (username, fullName, email, password) => { 
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            username,
            fullName,
            email,
            passwordHash : password, // <-- Gửi mật khẩu thô, Backend sẽ hash
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

// Hàm khởi tạo cũ không cần dùng nữa
export const initMockUsers = () => { /* Không làm gì */ };