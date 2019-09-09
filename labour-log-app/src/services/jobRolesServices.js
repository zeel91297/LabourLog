import Vue from 'vue'

export default {
  getAllJobRoles () {
    return Vue.http.get('https://labourlogapis.azurewebsites.net/jobRoles')
  }
}
