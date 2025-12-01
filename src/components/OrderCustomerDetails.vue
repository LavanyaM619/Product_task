<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="font-weight-bold">Customer Details:</v-list-item-title>
      <v-list-item-subtitle>
        <v-row>
          <v-col cols="12" sm="6">
            <strong>Name:</strong> {{ name }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Email:</strong> {{ email }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Address:</strong> {{ address }}
          </v-col>
          <v-col cols="12" sm="6" v-if="phone">
            <strong>Phone:</strong> {{ phone }}
          </v-col>
        </v-row>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>

export default {
  name: 'OrderCustomerDetails',
  props: {
    name: String,
    email: String,
    address: String,
    phone: String
  }
}
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
</style>
