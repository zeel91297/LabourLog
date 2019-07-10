<template>

<v-layout>

    <v-flex xs10 sm40 offset-sm>
      <v-card>
        <v-img
          src="https://www.themailcompany.es/wp-content/uploads/header_01.jpg"
          height="130px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div >Client Name</div>
            <!-- <span class="grey--text">1,000 miles of wonder</span> -->
          </div>
        </v-card-title>

        <v-card-actions>
          <!-- <v-btn flat>Share</v-btn> -->
          <v-btn flat color="purple"  @click="show = !show">View More</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">

            <table style="width:100%">

                <tr>
                  <td style="text-align:left"><b>Email ID:</b></td>
                  <td style="text-align:left">abc@gmail.com</td>

                </tr>
                <tr>
                  <td style="text-align:left"><b>Contact NO:</b></td>
                  <td style="text-align:left">8541200075</td>

                </tr>
                <tr>
                  <td style="text-align:left"><b>No of Workers currently Working:</b></td>
                  <td style="text-align:left">13</td>

                </tr>
          </table>

          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>

<style>

</style>
