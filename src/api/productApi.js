import axios from 'axios';

const BASE_URL = 'http://localhost:8081/product';

export const getAllProductsApi = async () => {
    const response = await axios.get(`${BASE_URL}/get-all-product`);
    return response.data; // Trả về đối tượng Response.java
};

export const getProductByIdApi = async (productId) => {
    const response = await axios.get(`${BASE_URL}/get-product/${productId}`);
    return response.data;
};

export const searchProductApi = async (searchValue) => {
    const response = await axios.get(`${BASE_URL}/search-product`, {
        params: { searchValue }
    });
    return response.data;
};

// Gọi API lấy Category (Bạn đã tạo ReaderController, hãy đảm bảo có CategoryController tương tự)
export const getAllCategoriesApi = async () => {
    const response = await axios.get('http://localhost:8081/category/get-all');
    return response.data;
};

