<template>
  <header class="header">
    <div class="header-content">
      <h1 class="logo">Logo</h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/products" class="nav-link">Products</router-link>
      </nav>
      <CartIcon class="cart-icon" />
    </div>
  </header>
</template>

<script setup>

import CartIcon from '@/components/CartIcon.vue'
</script>

<style scoped>
.header {
  background: #000000;
  padding: 1px;
  color: white;
  text-align: center;
  font-size: 20px;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  z-index: 999;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 10px;
  margin-bottom: 0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}


  .cart-icon {
    margin-left: 24px;
  }
.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  transition: text-decoration 0.2s;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
