import { createRouter, createWebHistory } from 'vue-router'
import Administration from '../views/Administration'
import Game from '../views/Game'
import Results from '../views/Results'

const routes = [
  {
    path: '/',
    name: 'Administration',
    component: Administration,
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/results',
    name: 'Results',
    component: Results,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router