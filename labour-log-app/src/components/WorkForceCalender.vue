<template>
  <div class="wrap text-center">
    <h2 class="pink--text font-weight-bold text-xs-left">Attendance Calendar</h2>
    <ejs-calendar id="calendar" ref="CalendarInstance" v-model="dd" :change="onCreate"></ejs-calendar>
    <!-- <h3 class="font-weight-bold purple--text text-xs-left" style="margin-left:55px">Working Details</h3> -->
    <v-container grid-list-md style="margin-top:-33px;">
      <v-flex xs6 sm6 md6>
        <v-select
          v-model="selectedClient"
          :items="clientsData"
          label="Client"
          item-text="client_name"
          item-value="client_id"
          required
        ></v-select>
      </v-flex>
      <v-flex xs6 sm6 md6>
        <v-text-field label="Hours Worked" v-model="work_hours" required></v-text-field>
      </v-flex>
      <v-flex align-start left style="margin-top:-30px;">
        <v-btn color="primary" icon :disabled="isDataFlag==1" @click.native="resetForm()">
          <v-icon>clear</v-icon>
        </v-btn>
        <v-btn color="warning" icon :disabled="isDataFlag==0" @click.native="updateForm()">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn color="success" icon :disabled="isDataFlag==1" @click.native="submitForm()">
          <v-icon>save</v-icon>
        </v-btn>
      </v-flex>
      <v-snackbar v-model="snackbar" :timeout="timeout" bottom>{{message}}</v-snackbar>
    </v-container>
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
      work_hours: 0,
      getWorkDetails: [],
      isDataFlag: false,
      snackbar: false,
      message: "",
      timeout: 1000
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
    this.getDetailsOfDateandWork();
  },
  methods: {
    getDetailsOfDateandWork() {
      var dFormat = [
        this.dd.getUTCFullYear(),
        this.dd.getUTCMonth() + 1,
        this.dd.getUTCDate()
      ].join("-");
      this.$http
        .post("http://localhost:3000/workForceCalenderDetailsByIdandDate/", {
          workforce_id: this.workForceObj.workforce_id,
          work_date: dFormat
        })
        .then(res => {
          this.getWorkDetails = res.data;
          console.log(this.getWorkDetails);
          if (this.getWorkDetails.length === 1) {
            console.log(this.getWorkDetails);
            this.selectedClient = this.getWorkDetails[0].client_id;
            this.work_hours = this.getWorkDetails[0].work_hours;
            this.isDataFlag = true;
          } else {
            this.selectedClient = null;
            this.work_hours = 0;
            this.isDataFlag = false;
          }
        })
        .catch(err => console.log(err));
    },
    onCreate: function(args) {
      let calendarObj = this.$refs.CalendarInstance;
      /* console.log(calendarObj.value); */
      // this.dd=calendarObj.value
      /* console.log(this.dd + " date"); */
      /* console.log(this.selectedClient); */
      this.dialog = true;
      var dFormat = [
        this.dd.getUTCFullYear(),
        this.dd.getUTCMonth() + 1,
        this.dd.getUTCDate()
      ].join("-");
      /* +
        " " +
        [
          this.dd.getUTCHours(),
          this.dd.getUTCMinutes(),
          this.dd.getUTCSeconds()
        ].join(":"); */
      console.log("sending dFormat " + dFormat);
      this.getDetailsOfDateandWork();
    },
    resetForm() {
      this.selectedClient = null;
      this.work_hours = 0;
    },
    updateForm() {
      if (this.isDataFlag) {
        this.$http
          .put("http://localhost:3000/WorkForceWorkUpdate/", {
            workforce_work_id: this.getWorkDetails[0].workforce_work_id,
            client_id: this.selectedClient,
            work_hours: this.work_hours
          })
          .then(result => {
            console.log(result);
            this.message = "Details updated successfully!";
            this.snackbar = true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submitForm() {
      var dFormat = [
        this.dd.getUTCFullYear(),
        this.dd.getUTCMonth() + 1,
        this.dd.getUTCDate()
      ].join(
        "-"
      ); /* +
        " " +
        [
          this.dd.getUTCHours(),
          this.dd.getUTCMinutes(),
          this.dd.getUTCSeconds()
        ].join(":"); */
      this.$http
        .post("http://localhost:3000/Workforcesworkingdetails", {
          client_id: this.selectedClient,
          workforce_id: this.workForceObj.workforce_id,
          work_date: dFormat,
          work_hours: this.work_hours
        })
        .then(res => {
          /* console.log(res); */
          this.selectedClient = null;
          this.work_hours = 0;
          this.message = "Details submitted successfully!";
          this.snackbar = true;
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
