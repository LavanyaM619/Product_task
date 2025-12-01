<template>
  <div>
    <span @click="show = !show" style="cursor:pointer;">
      <v-badge :content="totalCount" color="red" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </span>
    <v-dialog v-model="show" max-width="500">
      <v-card>
        <v-card-title>Cart</v-card-title>
        <v-card-text>
          <div v-if="items.length === 0">Cart is empty</div>
          <div v-else>
            <div v-for="it in items" :key="it.id" class="d-flex align-center mb-2">
              <img :src="it.product.thumbnail || it.product.images[0]" width="40" />
              <div class="ml-2">{{ it.product.title }} (x{{ it.qty }})</div>
              <div class="ml-auto">Rs {{ (it.product.price * it.qty).toFixed(2) }}</div>
            </div>
            <div class="text-right font-weight-bold">Total: Rs {{ total.toFixed(2) }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { cartItems, cartTotal } from '@/store/cart'
import { computed, ref } from 'vue'

export default {
  setup() {
    const show = ref(false)
    const items = cartItems
    const total = cartTotal
    const totalCount = computed(() => items.value.reduce((sum, it) => sum + it.qty, 0))
    return { show, items, total, totalCount }
  }
}
</script>
