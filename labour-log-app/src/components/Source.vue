<template >
  <v-card app style="width:370px;margin-top:10px;" v-bind:class="cardHeightBig?'big':'small'">
    <!-- <v-layout justify-space-between pa-3>
      <v-flex d-flex text-xs-center>
        <v-scroll-y-transition mode="out-in">
          <v-flex xs6>
            <v-card>
              <v-layout>
                <v-flex xs5>
                  <v-img
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light"
                    class="mb-4"
                    height="120px"
                    contain
                  ></v-img>
                </v-flex>
              </v-layout>

            </v-card>
          </v-flex>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>-->
    <v-layout style="height:100px;">
      <v-layout style="margin-left:-30px;margin-right:-30px;">
        <v-flex>
          <v-img
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light"
            class="mb-4"
            height="100px"
            contain
            style="margin-top:15px;"
          ></v-img>
        </v-flex>
      </v-layout>
      <table
        class="todo-list"
        border="0"
        style="font-size:12px;margin-top:40px;margin-right:20px;"
        width="100%"
      >
        <tr v-for="todo in todos" :key="todo.source_id">
          <td width="15%" style="white-space: nowrap;">
            <b>{{todo.heading}}</b>
          </td>
          <!-- style=" word-break: break-all;" -->
          <td width="auto" style=" word-break: break-all;">
            <div v-show="todo.edit == false" style="text-align:left;margin-left:10px;">
              <label  style>{{todo.value}}</label>
            </div>
            <v-text-field v-show="todo.edit == true" v-model="todo.value" style="width:90%;" />
          </td>
        </tr>
      </table>
    </v-layout>
    <v-layout>
      <v-btn
        v-show="show_edit_save_icon==false"
        dark
        color="cyan"
        icon
        @click="getfocus(todos)"
        class="edit_btn"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        v-show="show_edit_save_icon==true"
        color="success"
        icon
        @click="getfocusout(todos);update_fun()"
        class="done_btn"
      >
        <v-icon>done</v-icon>
      </v-btn>
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
      show_edit_save_icon: false,
      cardHeightBig: false
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
      console.log("--------");
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
      this.cardHeightBig = true;
      todos[0].edit = true;
      todos[1].edit = true;
      todos[2].edit = true;
    },
    getfocusout(todos) {
      this.cardHeightBig = false;
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
.edit_btn {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: -110px;

  position: fixed;
  left: 80%;
  outline: none;
}
.done_btn {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: -110px;

  position: fixed;
  left: 80%;
  outline: none;
}
.big {
  height: 250px;
}
.samll {
  height: 550px;
}
</style>
