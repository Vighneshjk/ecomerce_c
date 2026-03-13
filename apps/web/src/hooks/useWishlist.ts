import { useWishlistStore } from "@/store/wishlistStore"

export const useWishlist = () => {
    const store = useWishlistStore()

    return {
        items: store.items,
        addItem: store.addItem,
        removeItem: store.removeItem,
        toggleItem: store.toggleItem,
        isWishlisted: store.isWishlisted,
        count: store.getCount(),
        clearWishlist: store.clearWishlist,
    }
}
