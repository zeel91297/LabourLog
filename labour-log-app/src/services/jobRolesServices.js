import Vue from 'vue'

export default {
  getAllJobRoles () {
    return Vue.http.get('http://localhost:3000/jobRoles')
  }
}
