import Vue from 'vue'

export default {
  getAllSources () {
    return Vue.http.get('http://localhost:3000/Sources/show')
  }
}
