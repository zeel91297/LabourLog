<template>
  <div>
    <!-- <v-app id="inspire"> -->
    <v-toolbar app dark color="primary">
      <v-toolbar-title @click="onClickWorkForces" class="white--text">Labour Log</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down white--text">
        <v-btn flat @click="onClickSources">Sources</v-btn>
        <v-btn @click="onClickWorkForces" flat>Work Forces</v-btn>
        <v-btn @click="onClickClients" flat>Clients</v-btn>
      </v-toolbar-items>
      <v-menu class="hidden-sm-and-up">
        <v-toolbar-side-icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-toolbar-side-icon>
        <v-list>
          <v-list-tile @click="onClickSources">
            <v-list-tile-content>
              <v-list-tile-title>Sources</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="onClickWorkForces">
            <v-list-tile-content>
              <v-list-tile-title>Work Forces</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="onClickClients">
            <v-list-tile-content>
              <v-list-tile-title>Clients</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <!-- </v-app> -->
  </div>
</template>

<script>
import router from '../router'
export default {
  methods: {
    onClickSources () {
      router.push({ name: 'sources' })
    },
    onClickWorkForces () {
      router.push({ name: 'workforces' })
    },
    onClickClients () {
      router.push({ name: 'clients' })
    }
  }
}
</script>
