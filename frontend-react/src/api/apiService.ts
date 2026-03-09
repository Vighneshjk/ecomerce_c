import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    description: string;
    image: string;
    model_3d_url: string;
    category: Category;
}

export const apiService = {
    getProducts: async (category?: string, page = 1) => {
        const params = { category, page };
        const response = await api.get('/products/', { params });
        return response.data;
    },

    getProduct: async (id: string | number) => {
        const response = await api.get<Product>(`/products/${id}/`);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/categories/');
        return response.data;
    },

    addToCart: async (productId: number) => {
        const cartId = localStorage.getItem('cart_id') || '';
        const response = await api.post('/carts/add_item/', {
            product_id: productId,
            cart_id: cartId,
        });

        if (response.data.cart_id && !cartId) {
            localStorage.setItem('cart_id', response.data.cart_id);
        }

        return response.data;
    },

    getCart: async () => {
        const cartId = localStorage.getItem('cart_id');
        if (!cartId) return { items: [] };

        const response = await api.get(`/carts/`, { params: { cart_id: cartId } });
        if (response.data.length > 0) {
            return response.data[0];
        }
        return { items: [] };
    },
};
