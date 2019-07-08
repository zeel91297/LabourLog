<template>
  <div>
    <v-spacer></v-spacer>
    <h1>List of WorkForces</h1>
    <v-spacer></v-spacer>
    <v-text-field
      class="mx-5"
      flat
      label="Search"
      prepend-inner-icon="search"
      solo-inverted
      clearable
      v-model="search"
    ></v-text-field>
    <v-btn
      dark
      color="black"
      @click.stop="drawer = !drawer"
      class="left"
      style="margin-bottom:15px"
    >
      <v-icon dark>tune</v-icon>Filters
    </v-btn>

    <v-btn color="pink" dark fixed bottom right fab style="margin-top:50px">
      <v-icon>add</v-icon>
    </v-btn>

    <v-navigation-drawer v-model="drawer" absolute>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Filters</v-list-tile-title>
            <v-btn flat icon color="black" @click.stop="drawer = !drawer">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <v-subheader>By Sources</v-subheader>
      <v-radio-group v-model="radioGroup">
        <v-radio v-for="n in 3" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
      </v-radio-group>

      <!-- <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="checkButton">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>-->

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
    </v-navigation-drawer>
    <v-container grid-list-md grid-list-sm>
      <v-layout row wrap>
        <v-flex md4 lg4 sm12 v-for="workData in searchdWorkForce" :key="workData.workforce_id">
          <WorkForce :workForceObj="workData"></WorkForce>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import WorkForce from "@/components/WorkForce.vue";
import workforceService from "../services/workforceService.js";
import jobRolesServices from "../services/jobRolesServices.js";

export default {
  components: {
    WorkForce
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      right: null,
      workforceData: [],
      jobRolesData: [],
      selectedJobRole: [],
      search: ""
    };
  },
  created() {
    workforceService
      .getAllWorkforceSourceJob()
      .then(result => {
        // console.log(result);
        // console.log(result.data);
        this.workforceData = result.data;
        console.log(this.workforceData);
      })
      .catch(err => {
        console.log(err);
      });
    jobRolesServices
      .getAllJobRoles()
      .then(result => {
        this.jobRolesData = result.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    checkButton() {
      console.log("hello");
    }
  },
  computed: {
    searchdWorkForce() {
      /* return this.workforceData.filter(workforce => {
        return (
          workforce.workforce_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          workforce.job_role_id.includes(this.selectedJobRole)
        );
      }); */

      return this.workforceData.filter(item => {
        return (
          (this.search.length === 0 ||
            item.workforce_name
              .toLowerCase()
              .includes(this.search.toLowerCase())) &&
          /* (this.colors.length === 0 || this.colors.includes(item.color)) && */
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

<style>
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
</style>
