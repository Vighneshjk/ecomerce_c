import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface WishlistItem {
    productId: string
    variantId?: string
    name: string
    slug: string
    price: number
    image: string
    colorName?: string
}

interface WishlistStore {
    items: WishlistItem[]
    addItem: (item: WishlistItem) => void
    removeItem: (productId: string, variantId?: string) => void
    toggleItem: (item: WishlistItem) => void
    isWishlisted: (productId: string, variantId?: string) => boolean
    getCount: () => number
    clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => {
                if (!get().isWishlisted(item.productId, item.variantId)) {
                    set({ items: [...get().items, item] })
                }
            },
            removeItem: (productId, variantId) => {
                set({
                    items: get().items.filter(
                        (i) => !(i.productId === productId && i.variantId === variantId)
                    ),
                })
            },
            toggleItem: (item) => {
                if (get().isWishlisted(item.productId, item.variantId)) {
                    get().removeItem(item.productId, item.variantId)
                } else {
                    get().addItem(item)
                }
            },
            isWishlisted: (productId, variantId) => {
                return get().items.some(
                    (i) => i.productId === productId && i.variantId === variantId
                )
            },
            getCount: () => get().items.length,
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'akela-wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
