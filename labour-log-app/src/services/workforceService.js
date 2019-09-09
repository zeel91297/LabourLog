import Vue from 'vue'

export default {
  getAllWorkForces () {
    return Vue.http.get('https://labourlogapis.azurewebsites.net/workforces')
  },

  getAllWorkforceSourceJob () {
    return Vue.http.get('https://labourlogapis.azurewebsites.net/WorkforceSourceJob')
  }
}
