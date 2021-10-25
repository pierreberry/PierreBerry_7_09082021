import { createRouter, createWebHashHistory } from 'vue-router'
import Credential from '../views/Credential.vue'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import Profil from '../views/Profil.vue'

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
    component: Profil,
    props: true
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
