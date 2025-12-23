import axios from 'axios';

const BASE_URL = 'http://localhost:8081/product';

export const getAllProductsApi = async () => {
    const response = await axios.get(`${BASE_URL}/get-all-product`);
    return response.data; 
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

// api get all category 
export const getAllCategoriesApi = async () => {
    const response = await axios.get('http://localhost:8081/category/get-all');
    return response.data;
};

