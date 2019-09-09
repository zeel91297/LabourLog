<template>
  <div>
    <!-- hello {{myid}} -->
    <v-layout style="margin-top:40px;">
      <v-spacer></v-spacer>

      <v-flex xs12 sm6 md4>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date1"
              label="Select Starting Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date1" @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-spacer></v-spacer>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>

      <v-flex xs12 sm6 md4>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date2"
              label="Select Ending Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-spacer></v-spacer>
    </v-layout>

    <!-- <a :href="/ClientInvoice/+this.myid+'&'+this.date1+'&'+this.date2"> -->
    <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue"
      class="black--text"
      @click="loader = 'loading3';date1Print()"
    >
      <strong>Generate Invoice</strong>
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
    <!-- </a> -->
  </div>
</template>

<script scoped>
import router from '../router'
export default {
  components: {},
  created () {
    console.log('Client Invoice Date Select')
  },
  data () {
    return {
      myid: this.$route.params.id,
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      loader: null,
      loading3: false
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  methods: {
    date1Print () {
      router.push({
        name: 'ClientInvoice',
        params: { id: this.myid, date1: this.date1, date2: this.date2 }
      })
      // alert('date : '+this.date1);
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
