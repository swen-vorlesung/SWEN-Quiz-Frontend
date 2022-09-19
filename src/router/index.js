import { createRouter, createWebHistory } from 'vue-router'
import Administration from '../views/Administration'
import WaitingRoom from '../views/WaitingRoom'
import Game from '../views/Game'

const routes = [
  {
    path: '/',
    name: 'Administration',
    component: Administration,
  },
  {
    path: '/quiz/:sessionId/waitingroom/',
    name: 'Waiting-Room',
    component: WaitingRoom,
  },
  {
    path: '/quiz/:sessionId/questions/',
    name: 'Game',
    component: Game,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router