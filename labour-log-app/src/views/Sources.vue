<template>
  <div>
    <v-spacer></v-spacer>
    <h1>List of Sources</h1>
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
     <v-btn color="pink" dark absolute top right fab style="margin-top:50px">
      <v-icon>add</v-icon>
    </v-btn>
   <v-navigation-drawer v-model="drawer" absolute>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">clear all</v-list-tile-title>
            <v-btn text icon color="black" @click.stop="drawer = !drawer">
              <v-icon>close</v-icon>

            </v-btn>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" @click="checkButton">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
     <v-container grid-list-md grid-list-sm>
      <v-layout row wrap>
        <v-flex md6 sm12 v-for="sourceData in searchdWorkForce" :key="sourceData.source_id">
          <Source :sourceObj="sourceData"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Source from '@/components/Source.vue'
import sourcesServices from '../services/sourcesServices'

export default {
  components: {
    Source
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null,
      sourcesData: [],
      search: ''
    }
  },
  created () {
    sourcesServices
      .getAllSources()
      .then(result => {
        this.sourcesData = result.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    checkButton () {
      console.log('hello')
    }
  },
  computed: {
    searchdWorkForce () {
      return this.sourcesData.filter(item => {
        return (
          this.search.length === 0 ||
          item.source_name.toLowerCase().includes(this.search.toLowerCase())
          //      &&
          // (this.selectedSource === null ||
          //   this.selectedSource === item.source_id) &&
          // (this.selectedJobRole.length === 0 ||
          //   this.selectedJobRole.includes(item.job_role_id))
        )
      })
      /* .sort((a, b) => {
          return a[this.sortBy]
            .toString()
            .localeCompare(b[this.sortBy].toString());
        }); */
    }
  }
}
</script>

<style>
</style>
