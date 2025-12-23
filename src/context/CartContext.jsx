// src/context/CartContext.jsx

import { useState, useEffect } from 'react';
// Import CartContext từ file CartContextValue.js
import { CartContext } from './CartContextValue'; 

const getInitialCart = () => {
    try {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Failed to parse saved cart:', error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialCart());
    
    // THÊM STATE ĐỂ QUẢN LÝ TRẠNG THÁI SIDEBAR
    const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

    const openCartSidebar = () => setIsCartSidebarOpen(true);
    const closeCartSidebar = () => setIsCartSidebarOpen(false);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        
        // KÍCH HOẠT MỞ SIDEBAR NGAY SAU KHI THÊM
        openCartSidebar();
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
        closeCartSidebar();
    };

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
                isCartSidebarOpen,
                openCartSidebar,
                closeCartSidebar
            }}
        >
            {children}
        </CartContext.Provider>
    );
};