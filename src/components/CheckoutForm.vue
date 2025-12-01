<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <v-alert v-if="errorMessages.length" type="error" prominent class="mb-4">
      <div v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</div>
    </v-alert>
      <v-alert v-if="successMessage" type="success" prominent class="mb-4">
        {{ successMessage }}
      </v-alert>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
    <v-text-field v-model="address" label="Address" required></v-text-field>
    <v-text-field v-model="phone" label="Phone" required></v-text-field>
    <v-btn type="submit" color="primary" class="mt-4">Submit Order</v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cartItems } from '@/store/cart.js'
import { clearCart } from '@/store/cart.js'

const name = ref('')
const email = ref('')
const address = ref('')
const phone = ref('')
const errorMessages = ref([])
  const successMessage = ref('')
const router = useRouter()

function validate() {
  const errors = []
  if (!name.value) errors.push('Name is required')
  if (!email.value) errors.push('Email is required')
  else if (!/^\S+@\S+\.\S+$/.test(email.value)) errors.push('Email must be valid')
  if (!address.value) errors.push('Address is required')
  if (!phone.value) errors.push('Phone is required')
  return errors
}

async function onSubmit() {
  errorMessages.value = []
  const errors = validate()
  if (errors.length) {
    errorMessages.value = errors
    return
  }
  const products = cartItems.value
    .map(item => {
      const id = item.product.id ? String(item.product.id) : ''
      let image = ''
      if (typeof item.product.image === 'string' && item.product.image) {
        image = item.product.image
      } else if (typeof item.product.thumbnail === 'string' && item.product.thumbnail) {
        image = item.product.thumbnail
      } else if (Array.isArray(item.product.images) && item.product.images[0]) {
        image = item.product.images[0]
      }
      return {
        id,
        image: String(image),
        title: item.product.title || '',
        price: Number(item.product.price),
        quantity: Number(item.qty)
      }
    })
    .filter(p => p.id && p.image)
  try {
    const res = await fetch('https://wwoecxrmqanzrqbjfwcd.supabase.co/functions/v1/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        address: address.value,
        phone: phone.value,
        email: email.value,
        products
      })
    })
    const data = await res.json()
    console.log('Checkout API response:', { status: res.status, ok: res.ok, data })
    const order = data.data || data
    if (!res.ok || data.error) {
      errorMessages.value = data.details || [data.error || 'Checkout failed']
      return
    }
    localStorage.setItem('last-order', JSON.stringify(order))
    clearCart()
    successMessage.value = 'Order placed successfully!'
    setTimeout(() => {
      router.push({ name: 'order-confirmation', params: { order } })
    }, 1200)
  } catch (e) {
    errorMessages.value = [e?.message || 'Network or server error']
  }
}
</script>
