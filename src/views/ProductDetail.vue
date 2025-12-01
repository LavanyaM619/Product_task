<template>
  <v-container>
      <Header />
    <v-row v-if="loaded">
      <v-col cols="12" md="6">
        <v-img :src="product.images && product.images.length ? product.images[0] : ''" />
      </v-col>
      <v-col cols="12" md="6">
        <h1>{{ product.title }}</h1>
        <p>{{ product.description }}</p>
        <p>Price: Rs {{ product.price }}</p>
        <v-text-field v-model.number="qty" label="Quantity" type="number" :min="1" />
        <v-btn @click="add">Add to Cart</v-btn>
      </v-col>
    </v-row>
    <div v-else>Loading...</div>
       <Footer/>
  </v-container>
</template>

<script>

import { addToCart } from '@/store/cart'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

const apiUrl = import.meta.env.VITE_API_URL

export default {
  components: { Header, Footer },
  props: ['id'],
  data() { 
    return { 
      product: {}, 
      qty: 1,
      loaded: false
    } 
  },
  async created() {
    
    const res = await fetch(`${apiUrl}/products/${this.$route.params.id}`)
    this.product = await res.json()
    this.loaded = true
  },
  methods: {
    add() { 
      addToCart(this.product, this.qty)
      this.$router.push('/cart')
    }
  }
}
</script>
