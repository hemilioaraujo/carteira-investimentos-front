import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AtivosView from '../views/AtivosView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/ativos', name: 'ativos', component: AtivosView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
