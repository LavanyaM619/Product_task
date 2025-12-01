<template>
  <v-container>
    <Header />
    <Cart /> 
    <v-row>
      <v-col cols="12" md="4" v-for="p in products" :key="p.id">
        <ProductCard :product="p" />
      </v-col>
    </v-row>
    <Footer/>
  </v-container>
</template>

<script>

import ProductCard from '@/components/ProductCard.vue'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'

export default {
  components: { ProductCard, Header,Footer },
  data() { return { products: [] } },
  async created() {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await fetch(`${apiUrl}/products?limit=15`)
    const data = await res.json()
    this.products = data.products
  },
}
</script>
