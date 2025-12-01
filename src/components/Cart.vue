<template>
  <v-sheet class="pa-4">
    <div v-if="items.length === 0">Cart empty</div>
    <div v-else>
      <div v-for="it in items" :key="it.id" class="d-flex align-center mb-2">
        <img :src="it.product.thumbnail || it.product.images[0]" width="60" />
        <div class="ml-3">
          <div>{{ it.product.title }}</div>
          <div>Rs {{ it.product.price }}</div>
          <v-text-field v-model.number="it.qty" @change="update(it)" type="number" :min="1" style="width:100px"/>
          <v-btn @click="remove(it.id)">Remove</v-btn>
        </div>
        <div class="ml-auto">Rs {{ (it.product.price * it.qty).toFixed(2) }}</div>
      </div>
      <div class="text-right font-weight-bold">Total: Rs {{ total.toFixed(2) }}</div>
    </div>
    <div class="mt-4">
      <v-btn color="primary" @click="addToCart(sampleProduct)">Add to Cart</v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { cartItems, cartTotal, setQty, removeFromCart, addToCart } from '@/store/cart'
import { computed } from 'vue'

export default {
  setup() {
    const items = cartItems
    const total = cartTotal
    function update(it) { setQty(it.id, it.qty) }
    function remove(id) { removeFromCart(id) }
    
    const sampleProduct = {
      id: 1,
      title: 'Sample Product',
      price: 99.99,
      thumbnail: '',
      images: []
    }
    function addToCartHandler(product) {
      addToCart(product)
    }
    return { items, total, update, remove, addToCart: addToCartHandler, sampleProduct }
  }
}
</script>
