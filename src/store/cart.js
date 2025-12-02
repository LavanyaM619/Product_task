import { reactive, computed, watch } from 'vue'

const state = reactive({
  items: JSON.parse(localStorage.getItem('cart-items') || '[]')
})

export const cartItems = computed(() => state.items.map(it => ({
  ...it,
  product: it.product
})))

import { getDiscountedPrice } from '@/utils/price'

export const cartTotal = computed(() =>
  state.items.reduce((sum, it) => sum + (parseFloat(getDiscountedPrice(it.product.price, it.product.discountPercentage)) * it.qty), 0)
)

export function addToCart(product, delta = 1) {
  const found = state.items.find(it => it.product.id === product.id)
  if (found) {
    found.qty += delta
    if (found.qty < 1) {
      const idx = state.items.findIndex(it => it.product.id === product.id)
      if (idx !== -1) state.items.splice(idx, 1)
    }
  } else if (delta > 0) {
    state.items.push({ id: product.id, product, qty: delta })
  }
}

export function setQty(id, qty) {
  const it = state.items.find(it => it.id === id)
  if (it && qty > 0) it.qty = qty
}

export function removeFromCart(id) {
  const idx = state.items.findIndex(it => it.id === id)
  if (idx !== -1) state.items.splice(idx, 1)
}


export function clearCart() {
  state.items.splice(0, state.items.length)
}

// Persist cart to localStorage
watch(
  () => state.items,
  (val) => {
    localStorage.setItem('cart-items', JSON.stringify(val))
  },
  { deep: true }
)
