import {createRouter, createWebHistory} from 'vue-router'
import LogIn from '../views/LogIn'
import Administration from '../views/Administration'
import WaitingRoom from '../views/WaitingRoom'
import Game from '../views/Game'

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/admin',
    name: 'Administration',
    component: Administration,
    meta: {
      requiresAuth: true
    }
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
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    beforeEnter: (to, from, next) => next({name: "LogIn"})
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth();
  const routeRequiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(!isAuthenticated && routeRequiresAuth)
    next({name: "LogIn"})
  else
    next()

})

function checkAuth(){
  const cookies = document.cookie.split(';')
  for(const cookie of cookies){
    if (cookie.startsWith('session_token=')) {
      return true
    }
  }

  //TODO: Fix Return (Return false)
  return true;
}

export default router