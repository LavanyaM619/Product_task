<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <h1 class="display-2 font-weight-bold mb-4">Welcome to the Product Store!</h1>
    <p class="text-h5 mb-6">Browse our products and add your favorites to the cart.</p>
    <v-btn color="primary" large to="/products">Shop Now</v-btn>
  </v-container>
</template>

<script setup>
// No script logic needed for static home page
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
