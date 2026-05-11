import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('../views/Skills.vue'),
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('../views/Timeline.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('../views/ProjectDetail.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blog.vue'),
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('../views/BlogPost.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
