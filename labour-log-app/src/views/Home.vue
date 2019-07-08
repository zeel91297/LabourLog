<template>
  <div>
    <h1>Zeel Modi</h1>
  </div>
  <!-- <NavBar></NavBar> -->
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
/* import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import NavBar from '@/components/NavBar.vue' */

@Component({
  components: {
    /* HelloWorld,
    NavBar */
  }
})
export default class Home extends Vue {}
</script>
