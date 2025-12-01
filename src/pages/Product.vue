<template>
  <v-container class="py-6">
    <h2 class="text-center mb-6 font-weight-bold">All Products</h2>
    <v-row dense>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card
          @click="goToProduct(product.id)"
          class="hover-card pa-2"
          elevation="6"
          rounded="xl"
          style="cursor:pointer; transition:0.3s"
        >
          <v-img
            :src="product.thumbnail || product.images[0]"
            height="200px"
            cover
            class="rounded-lg"
          />
          <v-card-title class="text-h6 mt-2">
            {{ product.title }}
          </v-card-title>
          <v-card-subtitle>
            <strong class="text-primary">Rs {{ product.price }}</strong>
          </v-card-subtitle>
          <v-chip class="my-2" color="primary" text-color="white" label small>
            {{ product.category }}
          </v-chip>
          <p class="text-grey-darken-1 text-body-2">
            {{ product.description.substring(0,60) }}...
          </p>
          <div class="d-flex align-center justify-space-between mt-3">
            <v-rating
              :model-value="product.rating"
              length="5"
              size="18"
              half-increments
              color="amber"
              readonly
            />
            <v-chip :color="product.stock>20?'green':'red'" text-color="white" small>
              {{ product.stock > 20? 'In Stock':'Low Stock' }}
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const products = ref([])
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL

function goToProduct(id) {
  router.push(`/product/${id}`)
}

async function fetchProducts() {
  const res = await fetch(`${apiUrl}/products?limit=100`)
  const data = await res.json()
  products.value = data.products
}

onMounted(fetchProducts)
</script>

<style scoped>
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
</style>
