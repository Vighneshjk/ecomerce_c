import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    id: string
    productId: string
    variantId: string
    name: string
    slug: string
    price: number
    comparePrice?: number
    colorName: string
    colorHex: string
    image: string
    quantity: number
    stock: number
}

interface CartStore {
    items: CartItem[]
    isOpen: boolean
    addItem: (product: any, variant: any, quantity: number) => void
    removeItem: (productId: string, variantId: string) => void
    updateQuantity: (productId: string, variantId: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
    // Computed (using derived state)
    getTotalItems: () => number
    getSubtotal: () => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product, variant, quantity) => {
                const items = get().items
                const existingItem = items.find(
                    (i) => i.productId === product.id && i.variantId === variant.id
                )

                if (existingItem) {
                    const newQuantity = Math.min(existingItem.quantity + quantity, variant.stock)
                    set({
                        items: items.map((i) =>
                            i.productId === product.id && i.variantId === variant.id
                                ? { ...i, quantity: newQuantity }
                                : i
                        ),
                    })
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                id: `${product.id}-${variant.id}`,
                                productId: product.id,
                                variantId: variant.id,
                                name: product.name,
                                slug: product.slug,
                                price: product.price,
                                comparePrice: product.comparePrice,
                                colorName: variant.colorName,
                                colorHex: variant.colorHex,
                                image: product.image || product.images?.[0]?.url,
                                quantity: Math.min(quantity, variant.stock),
                                stock: variant.stock,
                            },
                        ],
                    })
                }
            },
            removeItem: (productId, variantId) => {
                set({
                    items: get().items.filter(
                        (i) => !(i.productId === productId && i.variantId === variantId)
                    ),
                })
            },
            updateQuantity: (productId, variantId, quantity) => {
                set({
                    items: get().items.map((i) =>
                        i.productId === productId && i.variantId === variantId
                            ? { ...i, quantity: Math.min(quantity, i.stock) }
                            : i
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            getSubtotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'akela-cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
