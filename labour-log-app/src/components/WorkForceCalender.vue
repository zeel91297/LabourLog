<template>
  <div class="wrap" >
    <h2 class="pink--text font-weight-bold text-xs-left">Attendance Calendar</h2>
    <ejs-calendar
      id="calendar"
      ref="CalendarInstance"
      v-model="dd"
      @click="onCreate"
      :change="onCreate"
    ></ejs-calendar>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMultiSelection: true,
      // dd: new Date("1/1/2019"),
      dd: new Date(),
      dialog: false
    }
  },
  methods: {
    onCreate: function (args) {
      let calendarObj = this.$refs.CalendarInstance
      console.log(calendarObj.value)
      this.dialog = true
    }
  }
}
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
