
const routes = [
  {
    name: 'IndexPage',
    path: '/',
    component: () => import('../pages/IndexPage.vue'),
  },

  {
    name: 'UserDetails',
    path: '/:id',
    component: () => import('../pages/UserPage.vue'),
  },

  {
    name: 'Register',
    path: '/Register',
    component: () => import('../components/Register.vue'),
  },

  {
    name: 'AdminPage',
    path: '/:id',
    component: () => import('../pages/AdminPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
