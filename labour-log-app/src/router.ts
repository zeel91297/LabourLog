import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Sources from './views/Sources.vue'
import WorkForces from './views/Workforces.vue'
import Clients from './views/Clients.vue'
import ClientInvoiceDateSelect from './views/ClientInvoiceDateSelect.vue'
import ClientInvoice from './views/ClientInvoice.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  /* base: process.env.BASE_URL, */
  routes: [
    {
      path: '/',
      name: 'root',
      component: WorkForces
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sources',
      name: 'sources',
      component: Sources
    },
    {
      path: '/workforces',
      name: 'workforces',
      component: WorkForces
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients

    },
    {
      path: '/invoiceDateSelect/:id',
      name: 'invoiceDateSelect',
      component: ClientInvoiceDateSelect

    },
    {
      path: '/ClientInvoice/:id',
      name: 'ClientInvoice',
      component: ClientInvoice

    }
  ]
})
