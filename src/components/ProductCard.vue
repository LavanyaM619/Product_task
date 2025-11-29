
<template>
  <v-card>
    <v-img :src="product.thumbnail || product.images[0]" height="200" @click="open" style="cursor:pointer;" />
    <v-card-title @click="open" style="cursor:pointer;">{{ product.title }}</v-card-title>
    <v-card-subtitle>${{ product.price }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
  @click.stop="add"
  color="primary"
  variant="flat"
  rounded="lg"
  size="large"
  class="px-6"
>
  Add to Cart
</v-btn>

    </v-card-actions>
  </v-card>
</template>


<script>
import { useRouter } from 'vue-router'
import { addToCart } from '@/store/cart'
export default {
  props: ['product'],
  setup(props) {
    const router = useRouter()
    function open() {
      router.push({ name: 'product', params: { id: props.product.id } })
    }
    function add() {
      addToCart(props.product, 1)
      alert('Added to cart')
    }
    return { open, add }
  },
}
</script>
