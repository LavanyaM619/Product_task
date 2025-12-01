<template>
  <v-card class="product-details-card d-flex flex-row pa-4" elevation="3">
    <v-img
      :src="product.images?.[0] || ''"
      class="product-image"
      aspect-ratio="1"
      contain
    />
    <div class="product-info pl-6">
      <h1 class="mb-2 font-weight-bold">{{ product.title }}</h1>
      <p class="text-subtitle-1 mb-4">{{ product.description }}</p>

    <div class="price-box">
      <span v-if="product.discountPercentage" class="discounted-price">
        Rs {{ discountedPrice }}
      </span>
      <span class="original-price" :class="{ 'ml-2': product.discountPercentage }">
        Rs {{ product.price }}
      </span>
    </div>
    <div class="info-row">
      <span class="rating">{{ product.rating }} Rating</span><br></br>
      <span class="discount">{{ product.discountPercentage }}% OFF</span>
    </div>

      <!-- Quantity Input -->
      <v-text-field 
        v-model.number="qty" 
        label="Quantity" 
        type="number" 
        :min="1" 
        :max="product.stock || 99" 
        class="mb-3" 
        style="max-width: 120px;" 
        outlined
      />

      <div class="d-flex">
        <v-btn 
          @click="addToCart" 
          :disabled="product.stock === 0" 
          color="black" 
          class="mr-2"
        >
          Add to Cart
        </v-btn>
        <v-btn 
          @click="checkout" 
          :disabled="product.stock === 0" 
          color="primary"
        >
          Checkout
        </v-btn>
      </div>
      <v-snackbar v-model="snackbar" color="success" :timeout="2000">
        Added to cart!
      </v-snackbar>

      <div v-if="product.stock === 0" class="red--text mt-2 font-weight-bold">
        Out of Stock
      </div>
    </div>
  </v-card>
</template>

<script>
import { addToCart } from '@/store/cart'
import { getDiscountedPrice } from '@/utils/price'

export default {
  props: ['product'],
  data() {
    return {
      qty: 1,
      snackbar: false
    }
  },
  computed: {
    discountedPrice() {
      return getDiscountedPrice(
        this.product.price,
        this.product.discountPercentage
      )
    }
  },
  methods: {
    addToCart() {
      addToCart(this.product, this.qty)
      this.snackbar = true
    },
    checkout() {
      addToCart(this.product, this.qty)
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
.product-image {
  width: 300px;
  min-width: 220px;
  max-width: 320px;
  border-radius: 12px 0 0 12px;
  object-fit: contain;
  background: #fafafa;
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<style scoped>
.price-box {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}
.discounted-price {
  color: #1b5e20;
  font-size: 1.4rem;
  font-weight: bold;
}
.original-price {
  text-decoration: line-through;
  color: #888;
  margin-left: 8px;
}
</style>
