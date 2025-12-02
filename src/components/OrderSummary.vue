<template>
  <div>
    <h3>Order Summary</h3>

    <v-table class="cart-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Line Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="it in items" :key="it.product?.id">
          <td>
            <img :src="it.product?.thumbnail || it.product?.images?.[0]" width="40" />
          </td>
          <td>{{ it.product?.title }}</td>
          <td>Rs {{ getDiscountedPrice(it.product?.price, it.product?.discountPercentage) }}</td>
          <td>{{ it.qty }}</td>
          <td>
            Rs {{
              (getDiscountedPrice(it.product?.price, it.product?.discountPercentage) * it.qty).toFixed(2)
            }}
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-right font-weight-bold mt-4">
      Total: Rs {{ total.toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { cartItems, cartTotal } from "@/store/cart"
import { getDiscountedPrice } from "@/utils/price"

const props = defineProps({
  products: {
    type: Array,
    default: null
  }
})

const items = computed(() => {
  if (props.products) {
    return props.products.map(p => ({
      product: {
        id: p.id,
        title: p.title,
        price: p.price,
        discountPercentage: p.discountPercentage,
        thumbnail: p.image,
        images: [p.image]
      },
      qty: p.quantity
    }))
  }
  return cartItems.value
})

const total = computed(() => {
  return items.value.reduce((sum, it) => {
    const price = getDiscountedPrice(it.product.price, it.product.discountPercentage)
    return sum + price * it.qty
  }, 0)
})
</script>

<style scoped>
.cart-table {
  width: 100%;
  border-collapse: collapse;
}
.cart-table th,
.cart-table td {
  padding: 8px 6px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
</style>
