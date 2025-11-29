import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import CartPage from '@/pages/CartPage.vue'

const routes = [
  { path: '/', name: 'home', component: ProductList },
  { path: '/product/:id', name: 'product', component: ProductDetail, props: true },
  { path: '/cart', component: CartPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
