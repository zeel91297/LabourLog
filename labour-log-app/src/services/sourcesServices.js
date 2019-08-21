import Vue from 'vue'

export default {
  getAllSources () {
    return Vue.http.get('https://labourlogapis.azurewebsites.net/Sources/show')
  }
}
