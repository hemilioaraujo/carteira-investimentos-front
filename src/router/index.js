import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AtivosView from '../views/AtivosView.vue'
import CorretorasView from '@/views/CorretorasView.vue'
import TiposOrdensView from '../views/TiposOrdensView.vue'
import TransacoesView from '@/views/TransacoesView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/ativos', name: 'ativos', component: AtivosView },
  { path: '/corretoras', name: 'corretoras', component: CorretorasView },
  { path: '/tiposOrdens', name: 'tiposOrdens', component: TiposOrdensView },
  { path: '/transacoes', name: 'transacoes', component: TransacoesView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
