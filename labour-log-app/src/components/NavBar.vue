<template>
  <div>
    <!-- <v-app id="inspire"> -->
    <!-- dark -->
    <!-- <v-app-bar> -->
    <v-toolbar color="indigo">
      <v-toolbar-title @click="onClickWorkForces" class="white--text">Labour Log</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="onClickSources" class="white--text" text>Sources</v-btn>
        <v-btn @click="onClickWorkForces" class="white--text" text>Labours</v-btn>
        <v-btn @click="onClickClients" class="white--text" text>Clients</v-btn>
      </v-toolbar-items>
      <!-- class="hidden-sm-and-up" v-if="$vuetify.breakpoint.smAndUp" -->
      <v-menu open-on-hover offset-y class="hidden-md-and-up">
        <!-- slot="activator" -->
        <template v-slot:activator="{on}">
          <v-btn dark icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="onClickSources">
            <v-list-item-content>
              <v-list-item-title>Sources</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onClickWorkForces">
            <v-list-item-content>
              <v-list-item-title>Labours</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onClickClients">
            <v-list-item-content>
              <v-list-item-title>Clients</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <!-- </v-app-bar> -->
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
