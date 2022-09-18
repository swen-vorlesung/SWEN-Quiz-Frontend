import { createRouter, createWebHistory } from 'vue-router'
import Administration from '../views/Administration'
import WaitingRoom from '../views/WaitingRoom'
import Game from '../views/Game'
import Results from '../views/Results'

const routes = [
  {
    path: '/',
    name: 'Administration',
    component: Administration,
  },
  {
    path: '/waitingroom/:sessionId',
    name: 'Waiting-Room',
    component: WaitingRoom,
  },
  {
    path: '/game/:sessionId',
    name: 'Game',
    component: Game,
  },
  {
    path: '/results/:sessionId',
    name: 'Results',
    component: Results,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router