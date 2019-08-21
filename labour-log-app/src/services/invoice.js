import Vue from 'vue'

export default {

  getClientInvoicerecord (req) {
    //     var url= req;
    //     var str=url.split("&");
    //     var JSONObj = { 'client_id ': str[0], 'work_date1': str[1], 'work_date2': str[2]}
    //    console.log(JSONObj);
    //    console.log('============');
    //    console.log(JSON.stringify(JSONObj, null, '    '));
    return Vue.http.get('https://labourlogapis.azurewebsites.net/ClientInvoiceGenerate/' + req)
  }

}
