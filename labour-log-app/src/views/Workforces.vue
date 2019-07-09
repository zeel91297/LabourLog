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
      <v-select
        :items="clientsData"
        v-model="selectedClients"
        label="Select Client"
        item-text="client_name"
        bottom
        autocomplete
        attach
        chips
        multiple
        class="px-3"
      ></v-select>
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
import sourcesServices from "../services/sourcesServices";
import clientsServices from "../services/clientsServices";

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
      sourcesData: [],
      selectedSource: null,
      clientsData: [],
      selectedClients: [],
      search: "",
      switchRate: false
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
          //console.log(this.workforceData);
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
        //this.getAllWorkforce();
        //this.switchRate = false;
      } else {
        this.switchRate = true;
        this.workforceData.sort(
          (a, b) => parseFloat(a.workforce_rate) - parseFloat(b.workforce_rate)
        );
        console.log(this.switchRate);
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
