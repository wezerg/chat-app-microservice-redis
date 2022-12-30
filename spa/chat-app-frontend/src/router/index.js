import { createRouter, createWebHistory } from 'vue-router'
import { useAuthService } from '../services/authService';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const {user} = useAuthService();
function isAuth(){
    if (!user.value) {
        return {path: '/', name: 'home'};   
    }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
