<template>
  <section class="container" id="ii">
    <div class="card_1" :class="['card-' + workForceObj.workforce_id ]">
      <div class="card__content">
        <div class="card__front">
          <v-card app>
            <v-layout justify-space-between pa-3>
              <v-flex d-flex text-xs-center>
                <v-scroll-y-transition mode="out-in">
                  <v-card class="pt-4 mx-auto" text max-width="400">
                    <v-card-text>
                      <v-avatar size="88">
                        <!-- src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Surprised&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Light" -->
                        <v-img src="http://localhost:3000/images/avataaars.png" class="mb-4" />
                      </v-avatar>
                      <h3 class="headline mb-2">{{workForceObj.workforce_name}}</h3>
                      <!-- <h3 class="headline mb-2">{{workforce_name}}</h3> -->
                      <!-- <div class="blue--text mb-2">Sincere@april.biz</div> -->
                      <div
                        class="blue--text subheading font-weight-bold"
                      >{{workForceObj.source_name}}</div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-layout tag="v-card-text" text-xs-left wrap>
                      <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Rate / Day:</v-flex>
                      <v-flex>{{workForceObj.workforce_rate | currency('zł')}}</v-flex>
                      <!-- <v-flex>{{workforce_rate | currency('zł')}}</v-flex> -->
                      <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Job Role:</v-flex>
                      <v-flex>{{workForceObj.role_name}}</v-flex>
                      <!-- <v-flex>{{role_name}}</v-flex> -->
                      <v-flex tag="strong" xs5 text-xs-right mr-3 mb-2>Phone:</v-flex>
                      <v-flex>{{workForceObj.workforce_contact}}</v-flex>
                      <!-- <v-flex>{{workforce_contact}}</v-flex> -->
                    </v-layout>
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
    <button
      @click="flip(workForceObj.workforce_id)"
      id="laborLog"
      v-bind:class="[setFlipCssClass()]"
    >
      <i class="material-icons">cached</i>
    </button>
    <v-btn
      v-if="showEditAndDelete"
      dark
      color="cyan"
      icon
      fab
      class="setEditButton"
      @click="editWorkForceDetails(workForceObj.workforce_id)"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      v-if="showEditAndDelete"
      dark
      color="red"
      icon
      fab
      class="setDeleteButton"
      @click="deleteWorkForceDetails(workForceObj.workforce_id)"
    >
      <v-icon>delete</v-icon>
    </v-btn>
    <v-layout justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Labour</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    label="WorkForce Name*"
                    name="w_name"
                    v-model="workforce_name"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Contact No*"
                    name="contact"
                    v-model="workforce_contact"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="WorkForce Rate per Day*"
                    type="number"
                    name="rate"
                    v-model="workforce_rate"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="jobRolesData"
                    label="Job Role*"
                    name="job_role"
                    v-model="job_role_id"
                    item-text="role_name"
                    item-value="job_role_id"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="sourcesData"
                    label="Source"
                    name="source"
                    item-text="source_name"
                    item-value="source_id"
                    v-model="source_id"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="WorkForce Bill Rate*"
                    name="bill_rate"
                    type="number"
                    v-model="workforce_bill_rate"
                    required
                  ></v-text-field>
                </v-flex>
                <!-- <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <img :src="imageUrl" height="150" v-if="imageUrl" />
                  <v-text-field
                    label="Select Image"
                    @click="pickFile"
                    v-model="imageName"
                    prepend-icon="mdi-camera"
                  ></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                </v-flex>-->
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="editWorkforce(workForceObj.workforce_id)">Save</v-btn>
          </v-card-actions>
        </v-card>
        <v-progress-linear v-show="isLoading"></v-progress-linear>
      </v-dialog>
    </v-layout>
  </section>

  <!-- <v-snackbar bottom dark :timeout="snackTimeOut" v-model="snackBar">
    {{snackBarText}}
    <v-btn text color="pink" @click.native="snackBar = false">Close</v-btn>
  </v-snackbar>-->
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" scoped></script>
<script type="text/javascript" scoped>
import WorkForceCalender from "@/components/WorkForceCalender.vue";
import JQuery from "jquery";

import jobRolesServices from "../services/jobRolesServices.js";
import sourcesServices from "../services/sourcesServices";

let $ = JQuery;
import currencyFilter from "../shared/currency-filter";

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
bt ,
      avatar: null,
      open: [],
      users: [],
      amt: 25,
      setUp: true,
      showEditAndDelete: true,
      dialog: false,
      snackBar: false,
      snackBarText: "",
      snackTimeOut: 3000,
      workforce_name: "",
      workforce_contact: "",
      workforce_rate: "",
      job_role_id: "",
      role_name: "",
      source_id: 0,
      source_name: "",
      workforce_bill_rate: 0,
      file: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      sourcesData: [],
      jobRolesData: [],
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      isLoading: false
    };
  },
  created() {
    // var idCount = this.workForceObj.workforce_id + "mm";
    // $("button").each(function() {
    //   $(this).attr("id", "q" + idCount);
    // });
    this.getAllJobRoles();
    this.getAllSources();
    this.workforce_name = this.workForceObj.workforce_name;
    this.workforce_contact = this.workForceObj.workforce_contact;
    this.workforce_rate = this.workForceObj.workforce_rate;
    this.job_role_id = this.workForceObj.job_role_id;
    this.role_name = this.workForceObj.role_name;
    this.source_id = this.workForceObj.source_id;
    this.source_name = this.workForceObj.source_name;
    this.workforce_bill_rate = this.workForceObj.workforce_bill_rate;
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
    editWorkForceDetails(id) {
      /* alert(id); */
      this.dialog = true;
    },
    deleteWorkForceDetails(id) {
      alert(id);
    },
    setFlipCssClass() {
      if (this.setUp) {
        // this.show_edit_btn = true;
        return "front_btn";
      }
      // this.show_edit_btn = false;
      return "front_btn_2";
    },
    flip(workforcsID) {
      /* console.log(" workforcsID id got :", workforcsID); */
      this.showEditAndDelete = !this.showEditAndDelete;
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
    deleteWorkforce() {
      console.log("delete");
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
          this.file = files[0];
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    getAllJobRoles() {
      jobRolesServices
        .getAllJobRoles()
        .then(result => {
          this.jobRolesData = result.data;
          /* this.job_role_id = this.jobRolesData[0].job_role_id; */
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllSources() {
      sourcesServices
        .getAllSources()
        .then(result => {
          this.sourcesData = result.data;
          /* this.source_id = this.sourcesData[0].source_id; */
        })
        .catch(err => {
          console.log(err);
        });
    },
    editWorkforce(id) {
      this.$http
        .put("http://localhost:3000/workforces/" + id, {
          workforce_name: this.workforce_name,
          workforce_rate: this.workforce_rate,
          job_role_id: this.job_role_id,
          workforce_contact: this.workforce_contact,
          source_id: this.source_id,
          workforce_bill_rate: this.workforce_bill_rate
        })
        .then(result => {
          this.snackBarText = "Details updated successfully!";
          this.snackBar = true;
          this.dialog = false;
          window.location.reload();
          this.$http
            .get("http://localhost:3000/workforces/" + id)
            .then(res => {
              console.log(res.data);
              //this.workForceObj = res.data;
              /* this.workforce_name = res.data[0].workforce_name;
              this.workforce_rate = res.data[0].workforce_rate;
              this.source_name = res.data[0].source_name;
              this.role_name = res.data[0].role_name;
              this.workforce_contact = res.data[0].workforce_contact; */
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.snackBarText = "Details couldn't be updated!";
          this.snackBar = true;
          console.log(err);
        });
    }
  }
};
</script>

<style  scoped>
.setEditButton {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 70px;

  position: fixed;
  right: 20px;
  outline: none;
}
.setDeleteButton {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 70px;

  position: fixed;
  right: -15px;
  outline: none;
}
.front_btn {
  color: black;
  font-size: 10px;
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 210px;

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
.front_btn {
  color: black;
  font-size: 10px;
  /* background-color: rgb(43, 226, 52); */
  /* height: 50px; */
  border: 1px solid;
  width: 50px;
  border: #ccc 0px solid;
  top: 85px;
  /* top: 70px; */

  /* margin-top: 40px; */
  /* margin-left: 4px; */
  /* margin-bottom: -40px; */
  /* bottom: 105px; */
  position: fixed;
  /* margin-right: -130px; */
  left: 70px;
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
  height: 390px;
  position: relative;
  border: 0px solid #ccc;
  -webkit-perspective: 800px;
  -moz-perspective: 800px;
  -o-perspective: 800px;
  perspective: 800px;
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
