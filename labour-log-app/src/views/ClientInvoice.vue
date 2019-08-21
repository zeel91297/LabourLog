<template>
  <div style="width:80%;margin-left:10%;margin-top:5%;">
    <!-- id ->  {{myid}}
      <br>
      date1 ->  {{date1}}
      <br>
      date2 ->  {{date2}}
    <br>-->
    <v-data-table :headers="headers" :items="clientInvoiceData" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.WorkForce_Name }}</td>
        <td class="text-xs-left">{{ props.item.Date }}</td>
        <td class="text-xs-left">{{ props.item.WorkForce_Bill_Rate }}</td>
        <td class="text-xs-left">{{ props.item.Working_Hours }}</td>
        <td class="text-xs-left">{{ props.item.Total }}</td>
      </template>
      <template v-slot:footer>
        <td class="text-xs-left">
          <strong>Total Amount</strong>
        </td>
        <td width="23%" class="text-xs-left"></td>
        <td width="23%" class="text-xs-left"></td>
        <td width="23%" class="text-xs-left"></td>
        <td width="28%"  class="text-xs-left">
          <strong>{{total_amount}}</strong>
        </td>
      </template>
    </v-data-table>
    <!--
    <v-data-table
      :headers="headers"
      :items="clientInvoiceData"
      :items-per-page="5"
      class="elevation-1"

    ></v-data-table>-->
    <!-- <download-excel :data="json_data" name="filename.xls">
      Download Data
      <img src="download_icon.png" />
    </download-excel>-->
    <download-excel
      class="btn btn-default"
      :data="clientInvoiceData"
      worksheet="My Worksheet"
      name="filename.xls"
    >
      <img
        src="https://frplockbypass.info/wp-content/uploads/2018/04/Free-frp-bypass-apk-300x150.png"
        width="200"
        style="margin-top:20px;"
        class="downlode"
      />
    </download-excel>
  </div>
</template>
<script type="text/javascript" scoped>
import invoice from '../services/invoice'
import Vue from 'vue'

export default {
  data () {
    return {
      clientInvoiceData: [],
      myid: null,
      date1: null,
      date2: null,
      total_amount: 0,
      file_name: null,
      headers: [
        {
          text: 'WorkForce Name',
          align: 'left',
          // sortable: false,
          value: 'WorkForce_Name'
        },
        { text: 'Work Date', value: 'Date' },
        { text: 'Bill Rate', value: 'WorkForce_Bill_Rate' },
        { text: 'Working Hours', value: 'Working_Hours' },
        { text: 'Total Rate', value: 'Total' }
      ],

      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ]
    }
  },
  created () {
    var url = this.$route.params.id
    var str = url.split('&')
    this.myid = str[0]
    this.date1 = str[1]
    this.date2 = str[2]
    this.getClientInvoice()
  },
  methods: {
    getClientInvoice () {
      invoice
        .getClientInvoicerecord(this.$route.params.id)
        .then(result => {
          this.clientInvoiceData = result.data

          console.log(this.clientInvoiceData)
          for (var i = 0; i < this.clientInvoiceData.length; i++) {
            this.total_amount += this.clientInvoiceData[i].Total
          }
          console.log(this.total_amount)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.downlode {
}
.downlode:hover {
  cursor: pointer;
}
</style>
