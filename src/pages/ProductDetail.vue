<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="product.thumbnail || product.images[0]" height="300px"/>
      </v-col>
      <v-col cols="12" md="6">
        <h2>{{ product.title }}</h2>
        <div>${{ product.price }}</div>
        <div>{{ product.description }}</div>
        <v-btn color="primary" @click="addToCart(product)">Add to Cart</v-btn>
      
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { addToCart } from '@/store/cart'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`)
  product.value = await res.json()
})
</script>
