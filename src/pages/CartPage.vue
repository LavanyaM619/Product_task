<template>
  <v-container>
    <v-btn color="primary" class="mb-4" @click="goToProducts">
      Back to Product List
    </v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goToProducts() {
  router.push('/')
}
</script>
