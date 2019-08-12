  <template>
  <!-- <div>
  hello {{myid}}-->
  <!-- <button onclick="flip()">flip the card</button> -->
  <!-- <button onclick="flip()">flip the card</button> -->
  <!-- <button onclick="flip()">flip the card</button> -->
  <section class="container" id="ii">
    <div class="card_1" :class="['card-' + workForceObj.workforce_id ]">
      <div class="card__content">
        <div class="card__front" style="margin-right:30px;margin-left:-50px;margin-top:-80px;">
          <!-- v-bind:class="[cardWidth ? cardWidthUp : cardWidthDown]" -->
          <v-card app v-bind:class="[cardWidth ? 'cardWidthUp' : 'cardWidthDown']">
            <v-layout justify-space-between pa-2>
              <v-flex d-flex text-xs-center>
                <v-scroll-y-transition mode="out-in">
                  <v-card
                    class="pt-4 mx-auto"
                    text
                    style="width:100%;"
                    v-bind:class="[cardWidth ? 'innercardWidthUp' : 'innercardWidthDown']"
                  >
                    <!-- v-for="todo in todos" :key="todo.workforce_id" -->
                    <!-- <v-btn
                        @click="deleteWorkforce"
                        fab
                        absolute
                        top
                        right
                        text
                        icon
                        color="red"
                        style="margin-right:-33px;top:-15px"
                      >
                        <v-icon>delete_sweep</v-icon>
                      </v-btn>
                      <v-btn
                        @click="editWorkforce"
                        fab
                        absolute
                        top
                        right
                        text
                        icon
                        color="green"
                        style="margin-right:-10px;top:-15px"
                      >
                        <v-icon>edit</v-icon>
                    </v-btn>-->

                    <v-card-text style>
                      <v-avatar size="88">
                        <!-- src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light" -->
                        <v-img src="http://localhost:3000/images/avataaars.png" class="mb-4" />
                      </v-avatar>

                      <!-- <h3 class="headline mb-2">{{todos[0].value}}</h3> -->
                      <!-- <div class="blue--text mb-2">Sincere@april.biz</div> -->

                      <!-- <div
                            v-show="todos[0].edit == false"
                            style="text-align:left;margin-left:10px;font-size:12px;"
                          >
                            <label @click="todos[0].edit = true;edit_icon_show()">{{todos[0].value}}</label>
                          </div>
                        
                          <v-text-field
                            v-show="todos[0].edit == true"
                            v-model="todos[0].value"
                            v-on:blur="todos[0].edit=false; $emit('update')"
                            @keyup.enter="todos[0].edit=false; $emit('update');update_fun(todos[0].index);save_icon_show()"
                            style="width:90%;font-size:12px;"
                            :class="['myAnchor-' + workForceObj.workforce_id+'-'+todos[0].index ]"
                      ></v-text-field>-->
                    </v-card-text>
                    <v-divider></v-divider>
                    <!-- <v-divider></v-divider>
                      <v-layout tag="v-card-text" text-xs-left wrap style>
                        <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Rate / Day:</v-flex>
                        <v-flex>{{workForceObj.workforce_rate | currency('zł')}}</v-flex>
                        <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Job Role:</v-flex>
                        <v-flex>{{workForceObj.role_name}}</v-flex>
                        <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
                        <v-flex>{{workForceObj.workforce_contact}}</v-flex>
                    </v-layout>-->
                    <!--  <div>
                          <v-btn dark color="cyan" icon v-on:click.native="getfocus()">
                            <v-icon>edit</v-icon>
                          </v-btn>
                    </div>-->
                  </v-card>
                </v-scroll-y-transition>
              </v-flex>
            </v-layout>
          </v-card>
        </div>

        <div class="card__back">
          <WorkForceCalender :workForceObj="workForceObj"></WorkForceCalender>
        </div>
      </div>
    </div>
    <table
      class="todo-list"
      border="0"
      style="width:100%;position: absolute;"
      v-if="show_edit_btn"
      v-bind:class="[cardWidth ? 'textfieldSetSmall' :'textfieldSetbig']"
    >
      <tr v-for="todo in todos" :key="todo.workforce_id">
        <td width style="text-align:right;font-size:12px;white-space: nowrap;">
          <b>{{todo.heading}}</b>
        </td>
        <td width style=" word-break: break-all;">
          <div v-show="todo.edit == false" style="text-align:left;margin-left:10px;font-size:12px;">
            <label>{{todo.value}}</label>
          </div>
          <v-text-field
            v-show="todo.edit == true"
            v-model="todo.value"
            style="width:70%;font-size:12px;"
            :class="['myAnchor-' + workForceObj.workforce_id+'-'+todo.index ]"
          ></v-text-field>
          <!-- v-on:blur="todo.edit=false; $emit('update')"
          @keyup.enter="todo.edit=false; $emit('update');update_fun(todo.index);save_icon_show();"-->
        </td>
      </tr>
    </table>
    <v-snackbar v-model="snackbar" :timeout="timeout" bottom>{{message}}</v-snackbar>
    <button
      @click="flip(workForceObj.workforce_id)"
      id="laborLog"
      v-if="show_flip_btn"
      v-bind:class="[setFlipCssClass()]"
    >
      <!-- [setFlipButton ?'flip_button_down':'flip_button_up'] -->
      <!-- :class="[setFlipCssClass()]" -->
      <i class="material-icons">cached</i>
    </button>
    <!-- <button class="my-2" @click="getfocus()">
        <v-btn small>Normal</v-btn>
    </button>-->
    <v-btn
      dark
      color="cyan"
      icon
      v-if="show_edit_btn"
      v-on:click.native="getfocus(todos);"
      v-show="show_edit_save_icon==false"
      :class="setEditCssClass()"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      dark
      color="green"
      icon
      v-if="show_edit_btn"
      v-on:click.native="getfocusout(todos);update_fun()"
      v-show="show_edit_save_icon==true"
      :class="setEditCssClass()"
    >
      <v-icon>done</v-icon>
    </v-btn>
  </section>

  <!-- </div> -->
</template>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" scoped></script>
  <script type="text/javascript" scoped>
import WorkForceCalender from "@/components/WorkForceCalender.vue";
import JQuery from "jquery";
let $ = JQuery;
import currencyFilter from "../shared/currency-filter";
//  console.log(JQuery);
if (typeof jQuery !== "undefined") {
  console.log("jQuery Loaded");
} else {
  // console.log("not loaded yet");
}

export default {
  components: {
    WorkForceCalender
  },
  props: {
    workForceObj: {
      type: Object,
      required: true
    }
  },
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      }
    ]
  },
  data() {
    return {
      myid: this.$route.params.id,
      active: [],
      avatar: null,
      open: [],
      users: [],
      amt: 25,
      setUp: true,
      show_edit_btn: true,
      todos: [
        { heading: "Name:", value: "one value", edit: false, index: 1 },
        { heading: "Source Name:", value: "one value", edit: false, index: 2 },
        { heading: "Rate / Day:", value: "one value", edit: false, index: 3 },
        { heading: "Job Role:", value: "otro titulo", edit: false, index: 4 },
        { heading: "Phone:", value: "13", edit: false, index: 5 }
        // { title: "one value", edit: false }
      ],
      currName: "",
      currRate: "",
      currJobRole: "",
      currPhone: "",
      currSource: "",
      editedTodo: null,
      message: "",
      snackbar: false,
      index: 1,
      show_edit_save_icon: false,
      cardWidth: true,
      setUpEditBtn: true,
      setUpFlipBtn: true,
      show_flip_btn: true,
      timeout: 1500
    };
  },
  created() {
    this.assignWorkForceDetails();
  },
  watch: {
    selected: "randomAvatar"
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
  filters: {
    currency: currencyFilter
  },
  methods: {
    save_icon_show() {
      if (
        this.todos[0].edit == false &&
        this.todos[1].edit == false &&
        this.todos[2].edit == false &&
        this.todos[3].edit == false &&
        this.todos[4].edit == false
      ) {
        // alert('in');
        this.cardWidth = true;
        this.show_edit_save_icon = false;
        this.setUpEditBtn = true;
        this.setUpFlipBtn = true;
      }
      // this.show_edit_save_icon = true;
    },
    update_fun() {
      // alert(".myAnchor-" + this.clientObj.client_id + "-" + (indexValue + 1));
      // $(
      //   ".myAnchor-" + this.workForceObj.workforce_id + "-" + (indexValue + 1)
      // ).focus();
      if (
        this.todos[0].value != this.currName ||
        this.todos[1].value != this.currSource ||
        this.todos[2].value != this.currRate ||
        this.todos[3].value != this.currJobRole ||
        this.todos[4].value != this.currPhone
      ) {
        this.currName = this.todos[0].value;
        this.currSource = this.todos[1].value;
        this.currRate = this.todos[2].value;
        this.currJobRole = this.todos[3].value;
        this.currPhone = this.todos[4].value;
        this.currContactNo = this.todos[2].value;

        this.message = "WorkForce Personal Details Updated successfully ||";
        this.snackbar = true;
        // this.$http
        //   .put("http://localhost:3000/workforcePersonalDetailsUpdate/", {})
        //   .then(result => {
        //     console.log(result);
        //     this.message = "WorkForce Personal Details Updated successfully ||";
        //     this.snackbar = true;
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      } else {
        console.log("no change");
      }
    },
    edit_icon_show() {
      this.show_edit_save_icon = true;
    },
    assignWorkForceDetails() {
      this.todos[0].value = this.workForceObj.workforce_name;
      this.todos[1].value = this.workForceObj.source_name;
      this.todos[2].value = this.workForceObj.workforce_rate;
      this.todos[3].value = this.workForceObj.role_name;
      this.todos[4].value = this.workForceObj.workforce_contact;
      this.currName = this.workForceObj.workforce_name;
      this.currRate = this.workForceObj.source_name;
      this.currJobRole = this.workForceObj.workforce_rate;
      this.currPhone = this.workForceObj.role_name;
      this.currSource = this.workForceObj.workforce_contact;
    },
    getfocus(todos) {
      this.setUpEditBtn = false;
      this.show_flip_btn = false;
      this.setUpFlipBtn = false;
      this.show_edit_save_icon = true;
      todos[0].edit = true;
      todos[1].edit = true;
      todos[2].edit = true;
      todos[3].edit = true;
      todos[4].edit = true;
      this.cardWidth = false;
      $(
        ".myAnchor-" + this.workForceObj.workforce_id + "-" + todos[0].index
      ).focus();
      // alert(this.workForceObj.workforce_id);
    },
    getfocusout(todos) {
      this.setUpEditBtn = true;
      this.show_flip_btn = true;
      this.setUpFlipBtn = true;
      this.show_edit_save_icon = false;
      this.cardWidth = true;
      todos[0].edit = false;
      todos[1].edit = false;
      todos[2].edit = false;
      todos[3].edit = false;
      todos[4].edit = false;
    },
    setFlipCssClass() {
      if (this.setUp) {
        this.show_edit_btn = true;
        return "front_btn";
      }
      this.show_edit_btn = false;
      return "front_btn_2";
    },
    setFlipUpDownCssClass() {
      if (this.setUpFlipBtn) {
        return "flip_button_down";
      }

      return "flip_button_up";
    },
    setEditCssClass() {
      if (this.setUpEditBtn) {
        return "edit_button_down";
      }

      return "edit_button_up";
    },
    setWorkforceFrontHeightCssClass() {
      if (this.setUp) {
        this.show_edit_btn = true;
        return "front_btn";
      }
      this.show_edit_btn = false;

      return "front_btn_2";
    },
    flip(workforcsID) {
      /* console.log(" workforcsID id got :", workforcsID); */
      this.setUp = !this.setUp;
      var currentFlipBtnId;
      $("button").each(function() {
        var i = $(this).attr("id");
        /* console.log("currentFlipBtnId :" + i); */
        currentFlipBtnId = i;
        if (i) return false;
      });

      var divid = document.getElementById(currentFlipBtnId);

      divid.id = workforcsID;

      var ans;
      $("button").each(function() {
        var i = $(this).attr("id");
        /* console.log("changedId :::::" + i); */
        ans = i;
        if (i) return false;
      });
      /* console.log(workforcsID + " ->" + ans); */
      if (workforcsID == ans) $(".card-" + ans).toggleClass("flipped");
    },
    editWorkforce() {
      console.log("edit");
    },
    deleteWorkforce() {
      console.log("delete");
    }
  },
  async fetchUsers(item) {
    // Remove in 6 months and say
    // you've made optimizations! :)
    await pause(1500);

    return fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(json => item.children.push(...json))
      .catch(err => console.warn(err));
  },
  randomAvatar() {
    this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
  }
};
</script>

  <style  scoped>
.textfieldSetSmall {
  margin-top: -280px;
}
.textfieldSetbig {
  margin-top: -400px;
}
.innercardWidthUp {
  height: 285px;
}
.innercardWidthDown {
  height: 530px;
}
.cardWidthUp {
  height: 300px;
}
.cardWidthDown {
  height: 550px;
}
.edit_button {
  top: 55px;
  position: fixed;
  right: 12px;
  /* outline: none; */
}
.edit_button_down {
  top: 55px;
  position: fixed;
  right: 12px;
}
.edit_button_up {
  top: -60px;
  position: fixed;
  right: 12px;
}
.flip_button_down {
  color: black;
  font-size: 10px;
  /* background-color: rgb(43, 226, 52); */
  /* height: 50px; */
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 70px;

  position: fixed;
  left: 7px;
  outline: none;
}
.flip_button_up {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: -60px;

  position: fixed;
  left: 7px;
  outline: none;
}
.front_btn {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 70px;

  position: fixed;
  left: 7px;
  outline: none;
}
.front_btn:active {
  outline: none;
}
.front_btn_2 {
  color: black;
  font-size: 10px;

  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 5px;

  position: fixed;

  left: 12px;
  outline: none;
}
.front_btn_2:active {
  outline: none;
}

/* .container {
    width: 300px;
    height: 260px;
    position: relative;
    border: 0px solid #ccc;
    -webkit-perspective: 800px;
    -moz-perspective: 800px;
    -o-perspective: 800px;
    perspective: 800px;
  } */
.container {
  width: 300px;
  height: 530px;
  position: relative;
  border: 0px solid #ccc;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -o-perspective: 800px;
  perspective: 800px;
  padding-top: -230px;
}
.card {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transition: -webkit-transform 1s;
  -moz-transition: -moz-transform 1s;
  -o-transition: -o-transform 1s;
  transition: transform 1s;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 50% 50%;
  /* Also define the standard property 'transform-origin' for compatibilitycss(vendorPrefix) */
}
.card div {
  display: block;
  height: 100%;
  width: 100%;
  /* line-heigh t: 260px; */
  color: rgb(3, 0, 0);
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card .front {
  background: red;
}
.card_1 .back {
  background: blue;
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.card_1.flipped {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

/* new================================================================================================================= */
@import url("https://fonts.googleapis.com/css?family=Oswald:400,700");
:root {
  --level-one: translateZ(3rem);
  --level-two: translateZ(6rem);
  --level-three: translateZ(9rem);

  --fw-normal: 400;
  --fw-bold: 700;

  --clr: #2c64c0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* body {
    height: 100vh;
    display: grid;
    place-items: center;
    font-family: 'Oswald', sans-serif;
  } */

.card_1 {
  width: 350px;

  -webkit-transition: -webkit-transform 1s;
  -moz-transition: -moz-transform 1s;
  -o-transition: -o-transform 1s;
  transition: transform 1s;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 50% 50%;
}

.card__content {
  text-align: center;
  position: relative;
  padding: 15em 5em;
  transition: transform 1.7s;
  /* // background: pink; */
  transform-style: preserve-3d;
}
/*
  .card_1:active .card__content {
    transform: rotateY(0.5turn);

  } */

.card__front,
.card__back {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 476px;
  padding: 5em 3em;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: grid;
  align-content: center;
}

.card__front {
  /* background-color: var(--clr); */
  /* background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/308367/fair.jpg); */
  background-size: cover;
  background-blend-mode: overlay;
  /* color: #333; */
}

.card__front::before {
  content: "";
  position: absolute;
  --spacer: 1em;
  top: var(--spacer);
  bottom: var(--spacer);
  left: var(--spacer);
  right: var(--spacer);
  /* border: 3px solid currentColor; */
  transform: var(--level-one);
}

.card__title {
  font-size: 3.5rem;
  transform: var(--level-three);
  order: 2;
  text-transform: uppercase;
}

.card__subtitle {
  transform: var(--level-two);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.75rem;
  font-weight: var(--fw-bold);
  opacity: 0.7;
}

.card__body {
  transform: var(--level-two);
  font-weight: var(fw-normal);
  font-size: 1.5rem;
  line-height: 1.6;
}

.card__back {
  transform: rotateY(0.5turn);
  color: var(--clr);
  /* background: #333; */
}
</style>
