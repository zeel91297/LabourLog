<template>
  <div>
    <v-spacer></v-spacer>
    <h1>List of Companies</h1>
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

    <!-- <div class="settings" id="wrapper">
      <div v-if="seen" id="hide">
        <form action v-on:submit.prevent>

        </form>
      </div>
    </div>-->

    <v-container grid-list-md grid-list-sm>
      <v-layout row wrap>
        <v-flex md3 sm12 lg></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Source from "./Source";
import sourceService from "../services/sourcesServices";

export default {
  components: {
    Source
  },
  data() {
    return {
      sourceData: [],
      search: ""
    };
  },
  created() {},
  methods: {
    callAllSources() {
      sourceService
        .getAllSources()
        .then(result => {
          this.sourceData = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.settings {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
}
</style>
