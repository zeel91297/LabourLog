import Vue from 'vue'
import Router from 'vue-router'

import Sources from '@/components/Sources.vue'
import WorkForces from '@/components/Workforces.vue'
import Clients from '@/components/Clients.vue'
import ClientInvoiceDateSelect from '@/components/ClientInvoiceDateSelect.vue'
import ClientInvoice from '@/components/ClientInvoice.vue'
import PageNotFound from '@/components/404.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  /* base: process.env.BASE_URL, */
  // base: '',
  routes: [
    {
      path: '/',
      name: 'root',
      component: WorkForces
    },
    {
      path: '/sources',
      name: 'sources',
      component: Sources
      // meta:{
      //  guest:true
      // }
    },
    {
      path: '/workforces',
      name: 'workforces',
      component: WorkForces
      // meta:{
      //   requiresAuth: false
      // }
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
      // component: () => import('@/components/ClientInvoiceDateSelect.vue')

    },
    {
      path: '/ClientInvoice/:id/:date1/:date2',
      name: 'ClientInvoice',
      component: ClientInvoice
      // component: () => import('@/components/ClientInvoice.vue')
    },
    {
      path: '*',
      name: 'notFound',
      component: PageNotFound
    }
  ]
})
