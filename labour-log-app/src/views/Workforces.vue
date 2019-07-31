<template>
  <div>
    <v-spacer></v-spacer>
    <h1>List of WorkForces</h1>
    <v-spacer></v-spacer>
    <div class="settings" id="wrapper">
      <div v-if="seen" id="hide">
        <form>
          <table width="100%">
            <tr>
              <td>
                <mdb-icon icon="user" />
              </td>
              <td>
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="10"
                  label="Name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </td>
            </tr>

            <tr>
              <td>
                <mdb-icon icon="mobile-alt" />
              </td>
              <td>
                <v-text-field
                  v-model="contactno"
                  :error-messages="contactErrors"
                  :counter="10"
                  label="Contact Number"
                  required
                  @input="$v.contactno.$touch()"
                  @blur="$v.contactno.$touch()"
                ></v-text-field>
              </td>
            </tr>
            <!-- <tr>
              <td style="padding-top: 25px;">
                <mdb-icon icon="dollar-sign" />
              </td>
              <td style="padding-top: 25px;">
                <kendo-combobox
                  :data-source="ratePerDay"
                  label="Rate Per Day"
                  required
                  placeholder="Rate Per Day"
                  :filter="'contains'"
                  :index="0"
                  style="width:100%;"
                ></kendo-combobox>
              </td>
            </tr>-->
            <!-- <tr>
              <td style="padding-top: 25px;">
                <mdb-icon icon="user-md" />
              </td>
              <td style="padding-top: 25px;">
                <kendo-combobox
                  :data-source="jobRole"
                  label="Job Role"
                  required
                  placeholder="Job Role"
                  :filter="'contains'"
                  :index="0"
                  style="width:100%;"
                ></kendo-combobox>
              </td>
            </tr>-->
            <!-- <tr>
              <td style="padding-top: 25px;">
                <mdb-icon icon="hotel" />
              </td>
              <td style="padding-top: 25px;">
                <kendo-combobox
                  :data-source="sources"
                  label="Select Source"
                  required
                  placeholder="Select Source"
                  :filter="'contains'"
                  :index="0"
                  style="width:100%;"
                ></kendo-combobox>
              </td>
            </tr>-->
            <tr>
              <td></td>
              <td>
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Do you agree?"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
                ></v-checkbox>
              </td>
            </tr>
          </table>

          <!-- <v-select
                                  v-model="select"
                                  :items="items"
                                  :error-messages="selectErrors"
                                  label="Item"
                                  required
                                  @change="$v.select.$touch()"
                                  @blur="$v.select.$touch()"
          ></v-select>-->

          <v-btn color="success" @click="submit">ADD</v-btn>
          <v-btn color="warning" @click="clear">clear</v-btn>
        </form>
      </div>
    </div>
    <v-container grid-list-md grid-list-sm>
      <v-layout wrap>
        <v-flex md4 sm4>
          <v-btn dark color="black" @click.stop="drawer = !drawer" class="left" align-start>
            <!-- style="margin-bottom:15px;position:fixed;left:10px;" -->
            <v-icon dark>tune</v-icon>Filters
          </v-btn>

          <v-navigation-drawer v-model="drawer" temporary absolute>
            <v-toolbar flat>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">Filters By:</v-list-tile-title>
                  <v-btn color="teal" flat outline @click="clearAllFilter" dark>Clear All</v-btn>
                  <v-btn flat icon color="black" @click.stop="drawer = !drawer">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile>
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
        <v-flex md8 sm8>
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

    <!--
    <v-btn color="pink" dark fixed bottom right fab style="margin-top:50px">
      <v-icon>add</v-icon>
    </v-btn>-->

    <v-container grid-list-md grid-list-sm fill-height>
      <v-layout wrap>
        <v-flex
          md4
          lg4
          sm12
          v-for="workData in searchdWorkForce"
          :key="workData.workforce_id"
          style="margin-bottom:140px;"
          align-center
        >
          <!-- <WorkForce :workForceObj="workData"></WorkForce> -->
          <Flip :workForceObj="workData"></Flip>
        </v-flex>
      </v-layout>
    </v-container>

    <div
      id="app"
      v-on:click="seen = !seen"
      class="control"
      style="position:fixed;top:0;"
      @click="scrollToTop"
    >
      <v-btn color="pink" dark fixed bottom right fab style="margin-top:50px">
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
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { mdbIcon } from "mdbvue";
export default {
  components: {
    WorkForce,
    mdbIcon,
    Flip
  },
  // el: "#wrapper",
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    contactno: { required, minLength: minLength(10), maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
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
      name: "",
      contactno: "",
      email: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      dropdown_edit: [
        { text: "100%" },
        { text: "75%" },
        { text: "50%" },
        { text: "25%" },
        { text: "0%" }
      ],
      rates: [1, 2, 3, 4, 5],
      ratePerDay: ["", 1, 2, 3, 4, 5],
      jobRole: ["", "Plumber", "Carpenter"],
      sources: ["", "ABC", "XYZ", "PQR"]
    };
  },
  created() {
    this.getAllWorkforce();

    jobRolesServices
      .getAllJobRoles()
      .then(result => {
        this.jobRolesData = result.data;
      })
      .catch(err => {
        console.log(err);
      });

    sourcesServices
      .getAllSources()
      .then(result => {
        this.sourcesData = result.data;
      })
      .catch(err => {
        console.log(err);
      });

    clientsServices
      .getAllClients()
      .then(result => {
        this.clientsData = result.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkButton() {
      console.log("hello");
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
        console.log(this.switchRate);
      }
    },
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
      this.contactno = "";
    },
    scrollToTop() {
      window.scrollTo(0, 0);
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
    },
    form() {
      return {
        name: this.name,
        contactno: this.contactno,
        email: this.email
      };
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    contactErrors() {
      const errors = [];
      if (!this.$v.contactno.$dirty) return errors;
      !this.$v.contactno.minLength &&
        errors.push("Contact NO must be at least 10 characters long");
      !this.$v.contactno.required && errors.push("Contact Number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
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
