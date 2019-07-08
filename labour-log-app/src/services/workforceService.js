import Vue from 'vue'

export default {
  getAllWorkForces () {
    return Vue.http.get('http://localhost:3000/workforces')
  },

  getAllWorkforceSourceJob () {
    return Vue.http.get('http://localhost:3000/WorkforceSourceJob')
  }
}
