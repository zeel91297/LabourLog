import Vue from 'vue'

export default {
  getAllSources () {
    return Vue.http.get('')
  }
}
