import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
  },
  {
    path: '/pokemon/:id',
    name: 'Pokemon',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pokemon.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
