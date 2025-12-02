<template>
  <v-container>
    <v-card class="pa-6" max-width="700" style="margin:auto;">
        <Header/>
      <v-card-title>Checkout</v-card-title>
      <v-card-text>
        <CheckoutForm 
          v-model:name="name" 
          v-model:email="email"
          v-model:address="address"
          v-model:phone="phone"
        />
        <div class="mt-8">
          <OrderSummary />
        </div>
      </v-card-text>
    </v-card>
    <Footer/>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CheckoutForm from '@/components/CheckoutForm.vue'
import OrderSummary from '@/components/OrderSummary.vue'
import { cartItems } from '@/store/cart'
import { getDiscountedPrice } from '@/utils/price'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

const name = ref('')
const email = ref('')
const address = ref('')
const phone = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()

const items = computed(() => {
  if (route.query.id) {
    return [{
      product: {
        id: route.query.id,
        title: route.query.title,
        price: Number(route.query.price),
        thumbnail: route.query.image,
      },
      qty: Number(route.query.quantity) || 1
    }]
  }
  return cartItems.value
})

const canSubmit = computed(() => name.value && email.value && address.value && phone.value && !loading.value)

async function submitCheckout() {
  if (!canSubmit.value) return
  loading.value = true
  const products = items.value.map(it => ({
    id: it.product.id,
    image: it.product.thumbnail || (it.product.images && it.product.images[0]) || '',
    title: it.product.title,
    price: Number(getDiscountedPrice(it.product.price, it.product.discountPercentage)),
    quantity: it.qty
  }))
  const payload = {
    name: name.value,
    address: address.value,
    phone: phone.value,
    email: email.value,
    products
  }
  try {
    const res = await fetch('https://wwoecxrmqanzrqbjfwcd.supabase.co/functions/v1/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    console.log('API response:', data)
    if (data && data.orderId) {
      const { clearCart } = await import('@/store/cart')
      clearCart()
      router.push({ name: 'order-confirmation', params: { order: data } })
    }
  } catch (e) {
    console.error('Network error', e)
  } finally {
    loading.value = false
  }
}
</script>
