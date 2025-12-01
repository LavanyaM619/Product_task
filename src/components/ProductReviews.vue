<template>
  <v-col cols="12" class="product-reviews">
    <v-card elevation="2" class="pa-4 mt-4">
      <h3 class="mb-3">Customer Reviews</h3>
      <v-list v-if="reviews && reviews.length">
        <v-list-item v-for="(review, idx) in reviews" :key="idx" class="mb-2">
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ review.reviewerName }}</strong>
              <span class="grey--text">({{ new Date(review.date).toLocaleDateString() }})</span>
              <span class="amber--text ml-2">Rating: {{ review.rating }}/5</span>
            </v-list-item-title>
            <v-list-item-subtitle>{{ review.comment }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-else class="grey--text">No reviews yet.</div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['reviews']
}
</script>

<style scoped>
.product-reviews {
  width: 100%;
}
</style>
