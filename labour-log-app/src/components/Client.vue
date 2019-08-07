<template>
  <v-layout>
    <v-flex xs10 sm40 offset-sm>
      <v-card>
        <v-img src="https://www.themailcompany.es/wp-content/uploads/header_01.jpg" height="130px"></v-img>

        <v-card-title primary-title>
          <div>{{todos[0].value}}</div>
          <!-- <span class="grey--text">1,000 miles of wonder</span> -->
        </v-card-title>

        <v-card-actions>
          <!-- <v-btn flat>Share</v-btn> -->
          <v-btn text color="purple" @click="show = !show">View More</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            <table style="width:100%">
              <!-- <tr>
                <td style="text-align:left">
                  <b>Email ID:</b>
                </td>
                <td style="text-align:left">{{clientObj.client_email}}</td>
              </tr>
              <tr>
                <td style="text-align:left">
                  <b>Contact NO:</b>
                </td>
                <td style="text-align:left">{{clientObj.client_contact}}</td>
              </tr>
              <tr>
                <td style="text-align:left">
                  <b>No of Workers currently Working:</b>
                </td>
                <td style="text-align:left">13</td>
              </tr>-->

              <tr>
                <td style="text-align:left" colspan="2">
                  <table class="todo-list" border="0" style="width:100%;">
                    <tr v-for="todo in todos" :key="todo.client_id">
                      <td width="45%" style="white-space: nowrap;">
                        <b>{{todo.heading}}</b>
                      </td>
                      <td width="55%" style=" word-break: break-all;">
                        <div v-show="todo.edit == false">
                          <label @click="todo.edit = true" style>{{todo.value}}</label>
                        </div>
                        <input
                          v-show="todo.edit == true"
                          v-model="todo.value"
                          v-on:blur="todo.edit=false; $emit('update')"
                          @keyup.enter="todo.edit=false; $emit('update');update_fun();"
                          style="width:90%;"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">
                  <!-- <div class="text-xs-center"> -->
                  <!-- <v-btn
                      round
                      color="primary"
                      dark
                      window.location.href=this.$router.push('workforces')
                  >GENERATE INVOICE</v-btn>-->
                  <a :href="/invoiceDateSelect/+clientObj.client_id">generate invoice</a>
                  <!-- </div> -->
                </td>
              </tr>
            </table>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
export default {
  props: {
    clientObj: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.clientObj);
    this.assignClientDetails();
  },
  data: () => ({
    show: false,

    todos: [
      { heading: "Name:", value: "one value", edit: false },
      { heading: "Email ID:", value: "one value", edit: false },
      { heading: "Contact NO:", value: "otro titulo", edit: false },
      { heading: "Workers Working:", value: "13", edit: false }
      // { title: "one value", edit: false }
    ],
    currName: "",
    currEmailId: "",
    currContactNo: "",
    currWorkersWorking: "",
    editedTodo: null,
    message: "",
    snackbar: false
  }),
  methods: {
    editTodo: function(todo) {
      this.editedTodo = todo;
    },
    assignClientDetails() {
      this.todos[0].value = this.clientObj.client_name;
      this.todos[1].value = this.clientObj.client_email;
      this.todos[2].value = this.clientObj.client_contact;
      this.currName = this.clientObj.client_name;
      this.currEmailId = this.clientObj.client_email;
      this.currContactNo = this.clientObj.client_contact;
      console.log(this.todos);
    },
    update_fun() {
      if (this.todos[0].value != this.currName) {
        console.log(this.todos[0].value + " -> " + this.currName);
        this.currName = this.todos[0].value;
        this.$http
          .put("http://localhost:3000/clientNameUpdate/", {
            client_id: this.clientObj.client_id,
            client_name: this.todos[0].value
          })
          .then(result => {
            console.log(result);
            this.message = " Client Name updated successfully!";
            this.snackbar = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.todos[1].value != this.currEmailId) {
        console.log(this.todos[1].value + " -> " + this.currEmailId);
        this.currEmailId = this.todos[1].value;
        this.$http
          .put("http://localhost:3000/clientEmailIdUpdate/", {
            client_id: this.clientObj.client_id,
            client_email: this.todos[1].value
          })
          .then(result => {
            console.log(result);
            this.message = " Client Email Id updated successfully!";
            this.snackbar = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.todos[2].value != this.currContactNo) {
        console.log(this.todos[2].value + " -> " + this.currContactNo);
        this.currContactNo = this.todos[2].value;
        this.$http
          .put("http://localhost:3000/clientContactNoUpdate/", {
            client_id: this.clientObj.client_id,
            client_contact: this.todos[2].value
          })
          .then(result => {
            console.log(result);
            this.message = " Client Contact No updated successfully!";
            this.snackbar = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("no change");
      }
    }
  }
};
</script>

<style>
.todo {
  background-color: green;
}

.editing {
  background-color: red;
}
</style>
