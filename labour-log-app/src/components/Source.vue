<template>
  <v-card app>
    <v-layout justify-space-between pa-3>
      <v-flex d-flex text-xs-center>
        <v-scroll-y-transition mode="out-in">
          <v-flex xs12>
            <v-card>
              <v-layout>
                <v-flex xs5>
                  <v-img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light"
                    class="mb-4"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <v-layout text-xs-left wrap>
                      <table>
                        <!-- <tr>
                        <td> <v-flex tag="strong"><i class="material-icons">
                          store_mall_directory
                        </i></v-flex>
                        </td>
                        <td v-if="edit_check=true"><v-flex>{{sourceObj.source_name}}</v-flex></td>
                        <td v-if="edit_check=false"><v-text-field></v-text-field></td>
                        </tr>
                        <tr>
                        <td><v-flex tag="strong" ><v-icon>phone</v-icon></v-flex></td>
                        <td><v-flex>{{sourceObj.source_contact}}</v-flex></td>
                        </tr>
                        <tr>
                        <td> <v-flex tag="strong"><v-icon>mail</v-icon></v-flex></td>
                        <td><v-flex text-xs-right>{{sourceObj.source_email}}</v-flex></td>
                        </tr>-->
                        <tr>
                          <td style colspan="2">
                            <table class="todo-list" border="0" style="width:100%;">
                              <tr v-for="todo in todos" :key="todo.source_id">
                                <td width="37%" style="white-space: nowrap;">
                                  <b>{{todo.heading}}</b>
                                </td>
                                <!-- style=" word-break: break-all;" -->
                                <td width="auto" style=" word-break: break-all;">
                                  <div
                                    v-show="todo.edit == false"
                                    style="text-align:left;margin-left:10px;font-size:20px;"
                                  >
                                    <label @click="todo.edit = true" style>{{todo.value}}</label>
                                  </div>
                                  <v-text-field
                                    v-show="todo.edit == true"
                                    v-model="todo.value"
                                    v-on:blur="todo.edit=false; $emit('update')"
                                    @keyup.enter="todo.edit=false; $emit('update');update_fun();save_icon_show()"
                                    style="width:90%;font-size:12px;"
                                  />
                                </td>
                              </tr>
                              <tr>
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
                          </td>
                        </tr>
                      </table>
                    </v-layout>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" scoped></script>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script>
import JQuery from "jquery";
let $ = JQuery;
$(".my-button").click(function() {
  $(".aaa").focus();
});

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  props: {
    sourceObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      active: [],
      avatar: null,
      open: [],
      users: [],
      show: false,
      todos: [
        { heading: "Name:", value: "one value", edit: false },
        { heading: "Email", value: "second value", edit: false },
        { heading: "Phone:", value: "third value", edit: false }
      ],
      currName: "",
      currEmail: "",
      currphone: "",
      /* editedTOdo: null, */
      snackbar: false,
      message: "",
      show_edit_save_icon: false
    };
  },
  computed: {
    items() {
      return [
        {
          name: "Users",
          children: this.users
        }
      ];
    },
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.users.find(user => user.id === id);
    }
  },

  watch: {
    selected: "randomAvatar"
  },
  created() {
    // alert("called");
    this.assignsourceDetails();
  },

  methods: {
    assignsourceDetails() {
      this.todos[0].value = this.sourceObj.source_name;
      this.todos[1].value = this.sourceObj.source_email;
      this.todos[2].value = this.sourceObj.source_contact;
      this.currName = this.sourceObj.source_name;
      this.currphone = this.sourceObj.source_contact;
      this.currEmail = this.sourceObj.source_email;
    },
    update_fun() {
      let source_id = this.sourceObj.source_id;
      this.$http
        .put("http://localhost:3000/Sources/update/" + source_id, {
          source_name: this.todos[0].value,
          source_contact: this.todos[2].value,
          source_email: this.todos[1].value
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateForm() {},
    getfocus(todos) {
      this.show_edit_save_icon = true;
      todos[0].edit = true;
      todos[1].edit = true;
      todos[2].edit = true;
    },
    getfocusout(todos) {
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
</style>
