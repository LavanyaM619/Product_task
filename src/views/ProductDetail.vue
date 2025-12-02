<template>
  <v-container>
    <Header />
    <v-row v-if="loaded">
      <ProductDetails :product="product" />
      <ProductReviews :reviews="product.reviews" />
    </v-row>
    <div v-else>Loading...</div>
    <Footer/>
  </v-container>
</template>

<script>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import ProductDetails from '@/components/ProductDetails.vue'
import ProductReviews from '@/components/ProductReviews.vue'

const apiUrl = import.meta.env.VITE_API_URL

export default {
  components: { Header, Footer, ProductDetails, ProductReviews },
  data() {
    return { product: {}, loaded: false }
  },
  async created() {
    const res = await fetch(`${apiUrl}/products/${this.$route.params.id}`)
    this.product = await res.json()
    this.loaded = true
  },
  methods: {
    goToCheckout() {
      this.$router.push({
        name: 'checkout',
        query: {
          id: this.product.id,
          title: this.product.title,
          price: this.product.price,
          image: this.product.thumbnail || (this.product.images && this.product.images[0]) || '',
          quantity: 1 // or qty if you implement a quantity selector
        }
      })
    }
  }
}
</script>
