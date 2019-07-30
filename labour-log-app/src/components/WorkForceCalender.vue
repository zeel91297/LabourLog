<template>
  <div class="wrap">
    <h2 class="pink--text font-weight-bold text-xs-left">Attendance Calendar</h2>
    <ejs-calendar id="calendar" ref="CalendarInstance" v-model="dd" :change="onCreate"></ejs-calendar>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Working Details</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <!-- <v-flex xs12 sm6>
              <v-text-field
                v-model="dd"
                label="Date (read only text field)"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </v-flex>-->
            <v-flex xs12 sm12>
              <v-text-field name="name" label="Date" v-model="dd" readonly prepend-icon="event"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                v-model="selectedClient"
                :items="clientsData"
                label="Client"
                item-text="client_name"
                item-value="client_id"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Hours Worked" v-model="work_hours" required></v-text-field>
            </v-flex>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" flat @click="resetForm">Clear</v-btn>
          <v-btn color="success" flat @click="submitForm">Save</v-btn>
          <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import clientsServices from "../services/clientsServices";
export default {
  data() {
    return {
      isMultiSelection: true,
      // dd: new Date("1/1/2019"),
      dd: new Date(),
      dialog: false,
      clientsData: [],
      selectedClient: null,
      work_hours: 0
    };
  },
  props: {
    workForceObj: {
      type: Object,
      required: true
    }
  },
  created() {
    //  this.getDate();
    clientsServices
      .getAllClients()
      .then(result => {
        this.clientsData = result.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getDate() {
      // console.log('-> '+this.dd)
    },
    onCreate: function(args) {
      let calendarObj = this.$refs.CalendarInstance;
      /* console.log(calendarObj.value); */
      // this.dd=calendarObj.value
      console.log(this.dd + " date");
      console.log(this.selectedClient);
      this.dialog = true;
      // this.getDate();
    },
    resetForm() {},
    submitForm() {
      var dFormat =
        [
          this.dd.getUTCFullYear(),
          this.dd.getUTCMonth() + 1,
          this.dd.getUTCDate()
        ].join("-") +
        " " +
        [
          this.dd.getUTCHours(),
          this.dd.getUTCMinutes(),
          this.dd.getUTCSeconds()
        ].join(":");
      /* console.log(
        this.selectedClient +
          ' ' +
          this.workForceObj.workforce_id +
          ' ' +
          this.dd +
          ' ' +
          this.work_hours +
          ' ' +
          dFormat
      ) */
      this.$http
        .post("http://localhost:3000/Workforcesworkingdetails", {
          client_id: this.selectedClient,
          workforce_id: this.workForceObj.workforce_id,
          work_date: dFormat,
          work_hours: this.work_hours
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

.wrap {
  margin: 35px auto;
  width: 440px;
  height: 300px;
}
</style>
