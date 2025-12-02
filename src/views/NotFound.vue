<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}
h1 {
  font-size: 3rem;
  color: #ff5252;
}
p {
  margin: 20px 0;
  font-size: 1.2rem;
}
</style>
