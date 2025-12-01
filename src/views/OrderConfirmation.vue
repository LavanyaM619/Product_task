<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="4">
          <v-card-title class="text-h5">Order Confirmation</v-card-title>
          <v-card-text>
            <div v-if="order">
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Order ID:</v-list-item-title>
                    <v-list-item-subtitle>{{ order.orderId }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <OrderCustomerDetails
                  :name="order.customer?.name || order.name"
                  :email="order.customer?.email || order.email"
                  :address="order.customer?.address || order.address"
                  :phone="order.customer?.phone || order.phone"
                />
               <OrderSummary/>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Total Amount:</v-list-item-title>
                    <v-list-item-subtitle>{{ computedTotalAmount | currency }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Order Date:</v-list-item-title>
                    <v-list-item-subtitle>{{ formattedDate }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div v-else>
              <v-alert type="error">No order details found.</v-alert>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="$router.push('/')">Back to Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import OrderCustomerDetails from '@/components/OrderCustomerDetails.vue';
import OrderSummary from '@/components/OrderSummary.vue';
import { getDiscountedPrice } from '@/utils/price';

export default {
  name: 'OrderConfirmation',
  components: {
    OrderCustomerDetails,
      OrderSummary
  },
  data() {
    return {
      order: null
    }
  },
  computed: {
    formattedDate() {
      if (!this.order?.createdAt) return '';
      return new Date(this.order.createdAt).toLocaleString();
    },
    computedTotalAmount() {
      if (!this.order || !Array.isArray(this.order.products)) return 0;
      return this.order.products.reduce((sum, p) => {
        const price = getDiscountedPrice(p.price, p.discountPercentage);
        return sum + (Number(price) * (p.quantity || 1));
      }, 0);
    }
  },
  created() {
    if (this.$route.params.order) {
      this.order = this.$route.params.order;
    } else {
      try {
        const lastOrder = localStorage.getItem('last-order');
        this.order = lastOrder ? JSON.parse(lastOrder) : null;
      } catch (e) {
        this.order = null;
      }
    }
  }
}
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
</style>
