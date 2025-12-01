
<template>
  <v-container class="pa-8">
    <v-card class="pa-6" elevation="2">
      <v-card-title class="text-h5 mb-4">Order Confirmation</v-card-title>
      <v-card-text>
        <div v-if="order.value && order.value.orderId">
          <v-row>
            <v-col cols="12" md="6">
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Order ID</v-list-item-title>
                    <v-list-item-subtitle>{{ order.value.orderId }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Name</v-list-item-title>
                    <v-list-item-subtitle>{{ order.value.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Address</v-list-item-title>
                    <v-list-item-subtitle>{{ order.value.address }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Phone</v-list-item-title>
                    <v-list-item-subtitle>{{ order.value.phone }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ order.value.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Total Amount</v-list-item-title>
                    <v-list-item-subtitle>{{ order.value.totalAmount }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Order Date</v-list-item-title>
                    <v-list-item-subtitle>{{ formattedDate }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="pa-2">
                <v-card-title class="text-h6">Products</v-card-title>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item v-for="product in order.value.products" :key="product.id">
                    <v-list-item-avatar>
                      <v-img :src="product.image" alt="Product image" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ product.title }}</v-list-item-title>
                      <v-list-item-subtitle>Price: {{ product.price }} | Qty: {{ product.quantity }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-alert type="error" prominent>
            No order details found. Please complete a checkout first.
          </v-alert>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const order = ref(route.params.order || (history.state && history.state.order) || {})

onMounted(() => {
  if (!order.value) {
    const lastOrder = localStorage.getItem('last-order')
    if (lastOrder) {
      order.value = JSON.parse(lastOrder)
    }
  }
})

const formattedDate = computed(() => {
  if (!order.value || !order.value.createdAt) return ''
  return new Date(order.value.createdAt).toLocaleString()
})
</script>
