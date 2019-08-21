<template>
  <!-- text-center text-xs-left -->
  <div class="wrap" style>
    <v-flex xs7>
      <h2
        class="pink--text font-weight-bold"
        style="white-space: nowrap;margin-left:60px;font-size:17px;"
      >Attendance Calender</h2>
      <!-- <h2 class="pink--text font-weight-bold">Attendance Calendar</h2> -->
    </v-flex>
    <ejs-calendar
      id="calendar"
      ref="CalendarInstance"
      v-model="dd"
      :change="onCreate"
      style="margin-left:25px;"
    ></ejs-calendar>
    <!-- <h3 class="font-weight-bold purple--text text-xs-left" style="margin-left:55px">Working Details</h3> -->
    <!-- grid-list-md  -->
    <v-container grid-list-md style="margin-top:-20px;margin-left:25px;">
      <v-flex xs6 sm6 md6>
        <v-select
          style="width:200px;"
          v-model="selectedClient"
          :items="clientsData"
          :disabled="!isEditing"
          label="Client"
          item-text="client_name"
          item-value="client_id"
          required
        ></v-select>
      </v-flex>
      <v-flex xs6 sm6 md6>
        <v-text-field
          autofocus
          style="width:200px;"
          label="Hours Worked"
          type="number"
          :disabled="!isEditing"
          v-model="work_hours"
          v-on:keyup.enter="submitForm"
          required
        ></v-text-field>
      </v-flex>
      <v-flex align-center left style="margin-top:-30px;margin-right:25px;">
        <v-btn color="warning" icon @click.native="changeEditingFlag()" :disabled="isDataFlag==0">
          <v-icon>{{iconName}}</v-icon>
        </v-btn>
        <v-btn color="success" icon :disabled="!isEditing" @click.native="submitForm()">
          <!-- && isDataFlag==1  -->
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
      isEditing: false,
      iconName: "edit",
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
    changeEditingFlag() {
      if (this.isEditing) {
        this.iconName = "edit";
        this.isEditing = false;
      } else {
        this.iconName = "close";
        this.isEditing = true;
      }
    },
    getDetailsOfDateandWork() {
      var dFormat = [
        this.dd.getUTCFullYear(),
        this.dd.getUTCMonth() + 1,
        this.dd.getUTCDate()
      ].join("-");
      this.$http
        .post(
          "https://labourlogapis.azurewebsites.net/workForceCalenderDetailsByIdandDate/",
          {
            workforce_id: this.workForceObj.workforce_id,
            work_date: dFormat
          }
        )
        .then(res => {
          this.getWorkDetails = res.data;
          /* console.log(this.getWorkDetails); */
          if (this.getWorkDetails.length === 1) {
            this.selectedClient = this.getWorkDetails[0].client_id;
            this.work_hours = this.getWorkDetails[0].work_hours;
            this.isDataFlag = true;
            this.isEditing = false;
          } else {
            this.selectedClient = this.clientsData[0].client_id;

            this.work_hours = 0;
            this.isDataFlag = false;
            this.isEditing = true;
            this.iconName = "edit";
          }
        })
        .catch(err => console.log(err));
    },
    onCreate: function(args) {
      let calendarObj = this.$refs.CalendarInstance;
      this.dialog = true;
      var dFormat = [
        this.dd.getUTCFullYear(),
        this.dd.getUTCMonth() + 1,
        this.dd.getUTCDate()
      ].join("-");
      this.getDetailsOfDateandWork();
    },
    updateForm() {
      if (this.isDataFlag) {
        this.$http
          .put("https://labourlogapis.azurewebsites.net/WorkForceWorkUpdate/", {
            workforce_work_id: this.getWorkDetails[0].workforce_work_id,
            client_id: this.selectedClient,
            work_hours: this.work_hours
          })
          .then(result => {
            this.message = "Details updated successfully!";
            this.snackbar = true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    submitForm() {
      if (this.isDataFlag) {
        this.updateForm();
        this.iconName = "edit";
        this.isEditing = false;
      } else {
        var dFormat = [
          this.dd.getUTCFullYear(),
          this.dd.getUTCMonth() + 1,
          this.dd.getUTCDate()
        ].join("-");
        this.$http
          .post(
            "https://labourlogapis.azurewebsites.net/Workforcesworkingdetails",
            {
              client_id: this.selectedClient,
              workforce_id: this.workForceObj.workforce_id,
              work_date: dFormat,
              work_hours: this.work_hours
            }
          )
          .then(res => {
            this.message = "Details submitted successfully!";
            this.snackbar = true;
            this.isEditing = false;
            this.isDataFlag = true;
            this.iconName = "edit";
            this.getDetailsOfDateandWork();
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";

.wrap {
  margin: 175px 0px 175px -60px;
  width: 300px;
  height: 300px;

  border: dashed 1px black;
  height: 535px;
  margin-top: 200px;
  background-color: rgb(246, 250, 248);
}
</style>
