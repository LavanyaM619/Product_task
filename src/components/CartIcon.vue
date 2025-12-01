<template>
  <div>
    <span @click="show = !show" style="cursor:pointer;">
      <v-badge :content="totalCount" color="red" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </span>

    <v-dialog v-model="show" max-width="900">
      <v-card>
        <v-card-title>Cart</v-card-title>
        <v-card-text>
          <div v-if="items.length === 0">Cart is empty</div>
          <div v-else>
            <v-table class="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Original Price</th>
                  <th>Discounted Price</th>
                  <th>Discount %</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="it in items" :key="it.product.id">
                  <td><img :src="it.product.thumbnail || it.product.images[0]" width="50" /></td>
                  <td>{{ it.product.title }}</td>
                  <td>
                    <span style="text-decoration:line-through; color:#888;">
                      Rs {{  it.product.price }}
                    </span>
                  </td>
                  <td>
                    <span style="color:#333;">
                      Rs {{ getDiscountedPrice(it.product.price, it.product.discountPercentage) }}
                    </span>
                  </td>
                  <td>
                    <span style="color:#e53935; font-weight:bold;">
                      {{ it.product.discountPercentage }}%
                    </span>
                  </td>
                  <td>
                    <v-btn variant="text" class="cart-btn" @click="decrease(it)">
                      <v-icon>mdi-minus</v-icon>
                    </v-btn>
                    <span class="mx-2">{{ it.qty }}</span>
                    <v-btn variant="text" class="cart-btn" @click="increase(it)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <span style="color:green; font-weight:bold;">
                      Rs {{ (getDiscountedPrice(it.product.price, it.product.discountPercentage) * it.qty).toFixed(2) }}
                    </span>
                  </td>
                  <td>
                    <v-btn variant="text" class="cart-btn" color="red" @click="remove(it)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
            <div class="text-right font-weight-bold mt-4">
              Total: Rs {{ total.toFixed(2) }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { cartItems, cartTotal, addToCart, removeFromCart } from '@/store/cart'
import { computed, ref } from 'vue'
import { getDiscountedPrice } from '@/utils/price'

export default {
  setup() {
    const show = ref(false)
    const items = cartItems
    const total = cartTotal
    const totalCount = computed(() =>
      items.value.reduce((sum, it) => sum + it.qty, 0)
    )
    const increase = (item) => addToCart(item.product, 1)
    const decrease = (item) => {
      if (item.qty > 1) {
        addToCart(item.product, -1)
      } else {
        removeFromCart(item.product.id)
      }
    }
    const remove = (item) => removeFromCart(item.product.id)

    return { show, items, total, totalCount, increase, decrease, remove, getDiscountedPrice }
  }
}
</script>

<style scoped>
.v-card {
  min-width: 850px;
}
.cart-table {
  width: 100%;
  border-collapse: collapse;
}
.cart-table th, .cart-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.cart-btn {
  min-width: 32px;
  min-height: 32px;
  border-radius: 4px !important;
  box-shadow: none;
  margin: 0 2px;
}
.cart-btn .v-icon {
  font-size: 20px;
}
</style>
