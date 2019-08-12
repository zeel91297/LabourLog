<template>
  <div>
    <v-spacer></v-spacer>
    <!-- <h1>List of WorkForces</h1> -->
    <v-spacer></v-spacer>
    <v-container grid-list-md grid-list-sm>
      <v-layout wrap>
        <v-flex md4 sm4>
          <v-btn dark color="black" @click.stop="drawer = !drawer" class="left" large align-start>
            <!-- style="margin-bottom:15px;position:fixed;left:10px;" -->
            <v-icon dark>tune</v-icon>Filters
          </v-btn>

          <v-navigation-drawer v-model="drawer" temporary absolute>
            <v-toolbar flat>
              <v-list>
                <v-list-item-content>
                  <v-list-item-title class="title">Filters By:</v-list-item-title>
                  <v-btn color="teal" text outlined @click="clearAllFilter" dark>Clear All</v-btn>
                  <v-btn text icon color="black" @click.stop="drawer = !drawer">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-item-content>
              </v-list>
            </v-toolbar>

            <v-switch
              class="px-3"
              color="success"
              @click="checkSwitchValue"
              label="Sort By Rate"
              v-model="switchRate"
            ></v-switch>

            <v-divider></v-divider>
            <v-subheader>By Sources</v-subheader>
            <v-radio-group v-model="selectedSource" class="px-4">
              <v-radio
                v-for="source in sourcesData"
                :key="source.source_id"
                :label="source.source_name"
                :value="source.source_id"
              ></v-radio>
            </v-radio-group>

            <v-divider></v-divider>
            <v-subheader>By Job Roles</v-subheader>
            <v-container>
              <v-checkbox
                :label="jobRole.role_name"
                v-model="selectedJobRole"
                :value="jobRole.job_role_id"
                class="caption"
                v-for="jobRole in jobRolesData"
                :key="jobRole.job_role_id"
              ></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-subheader>By Clients</v-subheader>
            <v-autocomplete
              :items="clientsData"
              v-model="selectedClients"
              label="Select Client"
              item-text="client_name"
              menu-props="bottom"
              attach
              chips
              multiple
              class="px-3"
            ></v-autocomplete>
          </v-navigation-drawer>
        </v-flex>
        <v-flex md8 sm8 style="margin-bottom:5px;">
          <v-text-field
            flat
            label="Search"
            prepend-inner-icon="search"
            solo-inverted
            clearable
            v-model="search"
            align-end
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add new WorkForce</span>
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
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
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
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addNewWorkForce">Save</v-btn>
          </v-card-actions>
        </v-card>
        <v-progress-linear v-show="isLoading"></v-progress-linear>
      </v-dialog>
    </v-layout>
    <v-snackbar bottom dark :timeout="snackTimeOut" v-model="snackBar">
      {{snackBarText}}
      <v-btn text color="pink" @click.native="snackBar = false">Close</v-btn>
    </v-snackbar>
    <v-container grid-list-md grid-list-sm fill-height>
      <v-layout wrap style="margin-top:20px;">
        <v-flex
          md4
          lg3
          sm12
          v-for="workData in searchdWorkForce"
          :key="workData.workforce_id"
          style="border:0px solid orange;padding-top:-250px;height:560px;"
        >
          <!-- <WorkForce :workForceObj="workData"></WorkForce> -->
          <Flip :workForceObj="workData" style="margin-right:auto;border:0px solid black;"></Flip>
        </v-flex>
      </v-layout>
    </v-container>

    <div
      id="app"
      v-on:click="dialog = !dialog"
      class="control"
      style="position:fixed;top:0;"
      @click="scrollToTop"
    >
      <v-btn color="pink" dark fixed bottom right fab style="margin-top:50px;margin-right:40px;">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" scoped></script>
<script scoped>
import JQuery from "jquery";
let $ = JQuery;
import Flip from "../views/Flip.vue";
import WorkForce from "@/components/WorkForce.vue";
import workforceService from "../services/workforceService.js";
import jobRolesServices from "../services/jobRolesServices.js";
import sourcesServices from "../services/sourcesServices";
import clientsServices from "../services/clientsServices";

import { mdbIcon } from "mdbvue";
export default {
  components: {
    WorkForce,
    mdbIcon,
    Flip
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      isLoading: false,
      snackBar: false,
      snackBarText: "",
      snackTimeOut: 3000,
      right: null,
      workforceData: [],
      jobRolesData: [],
      selectedJobRole: [],
      sourcesData: [],
      selectedSource: null,
      clientsData: [],
      selectedClients: [],
      search: "",
      switchRate: false,
      seen: false,
      select: null,
      checkbox: false,

      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ],
      workforce_name: "",
      workforce_contact: "",
      workforce_rate: "",
      job_role_id: "",
      source_id: 0,
      workforce_bill_rate: 0,
      file: "",
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  created() {
    this.getAllWorkforce();
    this.getAllJobRoles();
    this.getAllSources();
    this.getAllClients();
  },
  methods: {
    checkButton() {
      /* console.log("hello"); */
    },
    getAllWorkforce() {
      workforceService
        .getAllWorkforceSourceJob()
        .then(result => {
          this.workforceData = result.data;
          // console.log(this.workforceData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllJobRoles() {
      jobRolesServices
        .getAllJobRoles()
        .then(result => {
          this.jobRolesData = result.data;
          this.job_role_id = this.jobRolesData[0].job_role_id;
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
          this.source_id = this.sourcesData[0].source_id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllClients() {
      clientsServices
        .getAllClients()
        .then(result => {
          this.clientsData = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearAllFilter() {
      this.selectedJobRole = [];
      this.selectedSource = null;
      this.selectedClients = [];
      this.switchRate = false;
      this.getAllWorkforce();
    },
    checkSwitchValue() {
      if (this.switchRate) {
        // this.getAllWorkforce();
        // this.switchRate = false;
      } else {
        this.switchRate = true;
        this.workforceData.sort(
          (a, b) => parseFloat(a.workforce_rate) - parseFloat(b.workforce_rate)
        );
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    addNewWorkForce() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("workforce_name", this.workforce_name);
      formData.append("workforce_rate", this.workforce_rate);
      formData.append("job_role_id", this.job_role_id);
      formData.append("workforce_contact", this.workforce_contact);
      formData.append("source_id", this.source_id);
      formData.append("workforce_bill_rate", this.workforce_bill_rate);
      formData.append("image", this.file, this.imageName);

      this.$http
        .post("http://localhost:3000/workforces", formData)
        .then(result => {
          this.isLoading = false;
          /* console.log(result); */
          this.dialog = false;
          this.getAllWorkforce();
          this.getAllJobRoles();
          this.getAllSources();
          this.getAllClients();
          this.snackBarText = "Workforce added Successfully!";
          this.snackBar = true;
        })
        .catch(err => {
          this.isLoading = false;
          this.dialog = false;
          this.snackBarText = "WorkForce couldn't be added!!";
          this.snackBar = true;
          console.log(err);
        });
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
    }
  },
  computed: {
    searchdWorkForce() {
      return this.workforceData.filter(item => {
        return (
          (this.search.length === 0 ||
            item.workforce_name
              .toLowerCase()
              .includes(this.search.toLowerCase())) &&
          (this.selectedSource === null ||
            this.selectedSource === item.source_id) &&
          (this.selectedJobRole.length === 0 ||
            this.selectedJobRole.includes(item.job_role_id))
        );
      });
      /* .sort((a, b) => {
          return a[this.sortBy]
            .toString()
            .localeCompare(b[this.sortBy].toString());
        }); */
    }
  }
};
</script>

<style scoped>
/* .front {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #673ab7;
  color: white;
}

.back {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc107;
  color: white;
} */
.settings {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
}
</style>
