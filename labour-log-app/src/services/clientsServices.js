import Vue from 'vue'

export default {
  getAllClients () {
    return Vue.http.get('http://localhost:3000/clients')
  },
  addClient (req) {
    var JSONObj = { 'client_name ': req.client_name, 'client_contact': req.client_contact, 'client_email': req.client_email, 'client_bill_rate': 20 }
    Vue.http.post('http://localhost:3000/clients' + JSON.stringify(JSONObj, null, '    '))
  }
}
