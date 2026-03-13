import { useCartStore } from "@/store/cartStore"

export const useCart = () => {
    const store = useCartStore()

    return {
        items: store.items,
        isOpen: store.isOpen,
        addItem: store.addItem,
        removeItem: store.removeItem,
        updateQuantity: store.updateQuantity,
        clearCart: store.clearCart,
        toggleCart: store.toggleCart,
        openCart: store.openCart,
        closeCart: store.closeCart,
        totalItems: store.getTotalItems(),
        subtotal: store.getSubtotal(),
        itemCount: store.items.length,
    }
}
