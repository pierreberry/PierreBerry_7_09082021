import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Credential from '../views/Credential.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/credential',
    name: 'Credential',
    component: Credential
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/profil',
    name: 'Profil',
    props: true,
    component: () => import('../views/Profil.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
