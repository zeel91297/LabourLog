<template>

  <div>
    <v-spacer></v-spacer>
    <h1>List of Clients</h1>
     <!-- <div sticky-container>
          <div v-sticky sticky-offset="offset" sticky-side="top">
            mmmmmmmmmmmmmmmm
          </div>
      </div> -->

<!--     <v-btn
          dark
          color="black"
          @click.stop="drawer = !drawer"
          class="left ms"

        >
          <v-icon dark >tune</v-icon>Filters
        </v-btn> -->

    <!-- <v-btn color="pink" dark absolute top right fab style="margin-top:50px" >
      <v-icon>add</v-icon>

    </v-btn> -->

    <v-icon class="left">about</v-icon>
    <!-- <v-navigation-drawer v-model="drawer" absolute>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">clear all</v-list-tile-title>
            <v-btn flat icon color="black" @click.stop="drawer = !drawer">
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
    </v-navigation-drawer> -->

    <AddClient></AddClient>

    <v-container grid-list-md grid-list-sm>
      <v-layout row wrap >
        <v-flex md4 sm v-for="i in 20" :key="`6${i}`">
          <Client></Client>
        </v-flex>
      </v-layout>
    </v-container>

  </div>

</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<script type="text/javascript">

import Client from '@/components/Client.vue'
import AddClient from '@/components/AddClient.vue'
import AddSources from '@/components/AddSources.vue'
import AddWorkForce from '@/components/AddWorkForce.vue'
export default {
  components: {
    AddClient,
    AddSources,
    AddWorkForce,
    Client
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null
    }
  },
  methods: {
    checkButton () {
      console.log('hello')
    }
  }
// When the user scrolls down 20px from the top of the document, show the butto
}

</script>

<style>

</style>
