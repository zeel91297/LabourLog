<template>
  <v-layout>
    <v-flex xs10 sm40 offset-sm>
      <v-card>
        <v-img src="https://www.themailcompany.es/wp-content/uploads/header_01.jpg" height="130px"></v-img>

        <v-card-title primary-title>
          <div style="font-size:15px;">{{todos[0].value}}</div>
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
              <tr>
                <td style colspan="2">
                  <table class="todo-list" border="0" style="width:100%;">
                    <tr v-for="todo in todos" :key="todo.client_id">
                      <td width="37%" style="text-align:right;font-size:12px;white-space: nowrap">
                        <b>{{todo.heading}}</b>
                      </td>
                      <td width="auto" style=" word-break: break-all;">
                        <div
                          v-show="todo.edit == false"
                          style="text-align:left;margin-left:10px;font-size:12px;"
                        >
                          <label>{{todo.value}}</label>
                        </div>
                        <v-text-field
                          v-show="todo.edit == true"
                          v-model="todo.value"
                          style="width:90%;font-size:12px;"
                          :class="['myAnchor-' + clientObj.client_id+'-'+todo.index ]"
                        ></v-text-field>
                        <!-- v-on:blur="todo.edit=false; $emit('update')" -->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="text-align:left">
                  <a :href="/invoiceDateSelect/+clientObj.client_id">generate invoice</a>
                  <!-- </div> -->
                </td>
                <td>
                  <v-btn
                    v-show="show_edit_save_icon==false"
                    dark
                    color="cyan"
                    icon
                    @click="getfocus(todos)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    v-show="show_edit_save_icon==true"
                    color="success"
                    icon
                    @click="getfocusout(todos)"
                  >
                    <v-icon>done</v-icon>
                  </v-btn>
                </td>
              </tr>
            </table>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" scoped></script>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
import JQuery from "jquery";
let $ = JQuery;
$(".my-button").click(function() {
  $(".aaa").focus();
});
export default {
  props: {
    clientObj: {
      type: Object,
      required: true
    }
  },
  created() {
    // console.log(this.clientObj);
    this.assignClientDetails();
  },
  data: () => ({
    show: false,

    todos: [
      { heading: "Name:", value: "one value", edit: false, index: 1 },
      { heading: "Email ID:", value: "one value", edit: false, index: 2 },
      { heading: "Contact No:", value: "otro titulo", edit: false, index: 3 },
      { heading: "Workers Working:", value: "13", edit: false, index: 4 }
      // { title: "one value", edit: false }
    ],
    currName: "",
    currEmailId: "",
    currContactNo: "",
    currWorkersWorking: "",
    editedTodo: null,
    message: "",
    snackbar: false,
    index: 1,
    show_edit_save_icon: false
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
    update_fun(indexValue) {
      this.updateForm();
      $(
        ".myAnchor-" + this.clientObj.client_id + "-" + (indexValue + 1)
      ).focus();
    },
    updateForm() {
      if (this.todos[0].value != this.currName) {
        console.log(this.todos[0].value + " -> " + this.currName);
        this.currName = this.todos[0].value;
        this.$http
          .put("https://labourlogapis.azurewebsites.net/clientNameUpdate/", {
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
          .put("https://labourlogapis.azurewebsites.net/clientEmailIdUpdate/", {
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
          .put(
            "https://labourlogapis.azurewebsites.net/clientContactNoUpdate/",
            {
              client_id: this.clientObj.client_id,
              client_contact: this.todos[2].value
            }
          )
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
    },
    getfocus(todos) {
      this.show_edit_save_icon = true;
      todos[0].edit = true;
      todos[1].edit = true;
      todos[2].edit = true;
      $(".myAnchor-" + this.clientObj.client_id + "-" + todos[0].index).focus();
    },
    getfocusout(todos) {
      this.updateForm();
      this.show_edit_save_icon = false;
      todos[0].edit = false;
      todos[1].edit = false;
      todos[2].edit = false;
    },
    edit_icon_show() {
      this.show_edit_save_icon = true;
    },
    save_icon_show() {
      if (
        this.todos[0].edit == false &&
        this.todos[1].edit == false &&
        this.todos[2].edit == false
      ) {
        // alert('in');
        this.show_edit_save_icon = false;
      }
      // this.show_edit_save_icon = true;
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
