import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../api/apiService';

interface CartContextType {
    cartItemsCount: number;
    refreshCartCount: () => Promise<void>;
    addToCart: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const refreshCartCount = useCallback(async () => {
        try {
            const cart = await apiService.getCart();
            const total = cart.items.reduce((acc: number, curr: any) => acc + curr.quantity, 0);
            setCartItemsCount(total);
        } catch (error) {
            console.error('Failed to refresh cart count:', error);
        }
    }, []);

    const addToCart = async (productId: number) => {
        try {
            const res = await apiService.addToCart(productId);
            const total = res.items.reduce((acc: number, curr: any) => acc + curr.quantity, 0);
            setCartItemsCount(total);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    useEffect(() => {
        refreshCartCount();
    }, [refreshCartCount]);

    return (
        <CartContext.Provider value={{ cartItemsCount, refreshCartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
