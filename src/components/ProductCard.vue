<template>
  <v-card>
    <v-img
      :src="product.thumbnail || product.images[0]"
      height="200"
      @click="open"
      style="cursor:pointer;"
    />

    <v-card-title
      @click="open"
      style="cursor:pointer;"
    >
      {{ product.title }}
    </v-card-title>
    <div class="price-box">
      <span class="discounted-price">
        Rs {{ discountedPrice }}
      </span>

      <span class="original-price">
        Rs {{ product.price }}
      </span>
    </div>
    <div class="info-row">
      <span class="rating">{{ product.rating }} Rating</span>
      <span class="discount">{{ product.discountPercentage }}% OFF</span>
    </div>

    <v-card-actions>
      <v-btn
        @click.stop="add"
        variant="flat"
        rounded="lg"
        size="small"
        class="custom-black-btn"
      >
        Add To Cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useRouter } from 'vue-router'
import { addToCart } from '@/store/cart'
import { getDiscountedPrice } from '@/utils/price'

export default {
  props: ['product'],
  setup(props) {
    const router = useRouter()

    const discountedPrice = getDiscountedPrice(
      props.product.price,
      props.product.discountPercentage
    )

    function open() {
      router.push({ name: 'product', params: { id: props.product.id } })
    }

    function add() {
      addToCart(props.product, 1)
      alert('Added to cart')
    }

    return { open, add, discountedPrice }
  },
}
</script>


<style scoped>
.custom-black-btn {
  background-color: #000 !important;
  color: #fff !important;
  padding: 4px 10px !important;
  font-size: 12px !important;
}
.custom-black-btn:hover {
  background-color: #222 !important;
}

.price-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
}

.discounted-price {
  font-size: 18px;
  font-weight: bold;
  color: #1b5e20; /* green */
}

.original-price {
  text-decoration: line-through;
  color: #888;
  font-size: 14px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 0;
  margin-bottom: 5px;
}

.rating {
  font-size: 14px;
  color: #ffa500;
  font-weight: bold;
}

.discount {
  font-size: 14px;
  color: #e53935;
  font-weight: bold;
}
</style>
