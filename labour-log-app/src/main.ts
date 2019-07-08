import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import VueResource from 'vue-resource'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import { CalendarPlugin } from '@syncfusion/ej2-vue-calendars'

Vue.config.productionTip = false

// index.js or main.js

Vue.use(Vuetify)
Vue.use(CalendarPlugin)
Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
