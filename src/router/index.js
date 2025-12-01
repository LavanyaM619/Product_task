import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import CartPage from '@/pages/CartPage.vue'


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/products', name: 'products', component: ProductList },
  { path: '/product/:id', name: 'product', component: ProductDetail, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
