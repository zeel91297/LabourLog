import Vue from 'vue'

export default {
  getAllClients () {
    return Vue.http.get('http://localhost:3000/clients')
  }
}
