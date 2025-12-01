<template>
  <v-container>
    <Cart />
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
  </v-container>
</template>

<script>
import Cart from '@/components/Cart.vue'
import { addToCart } from '@/store/cart'

export default {
  components: { Cart },
  props: ['id'],
  data() { 
    return { 
      product: {}, 
      qty: 1,
      loaded: false
    } 
  },
  async created() {
    const res = await fetch(`https://dummyjson.com/products/${this.$route.params.id}`)
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
