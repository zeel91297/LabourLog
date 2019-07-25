<template>
  <div>
    <v-spacer></v-spacer>

    <h1>List of Clients</h1>
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

    <div class="settings" id="wrapper">
      <div v-if="seen" id="hide">
        <form v-on:submit.prevent="addNewClient">
          <table width="100%">
            <tr>
              <td>
                <mdb-icon icon="hotel" />
              </td>
              <td>
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="10"
                  label="Name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>
                <!-- <v-icon large color="teal darken-2">email</v-icon> -->
                <mdb-icon far icon="envelope" />
              </td>
              <td>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>
                <mdb-icon icon="mobile-alt" />
              </td>
              <td>
                <v-text-field
                  v-model="contactno"
                  :error-messages="contactErrors"
                  :counter="10"
                  label="Contact Number"
                  required
                  @input="$v.contactno.$touch()"
                  @blur="$v.contactno.$touch()"
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Do you agree?"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
                ></v-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-btn color="success" type="submit" @click="submit">ADD</v-btn>
                <v-btn color="warning" @click="clear">clear</v-btn>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>

    <!-- <div sticky-container>
          <div v-sticky sticky-offset="offset" sticky-side="top">
            mmmmmmmmmmmmmmmm
          </div>
    </div>-->

    <!--     <v-btn
          dark
          color="black"
          @click.stop="drawer = !drawer"
          class="left ms"

        >
          <v-icon dark >tune</v-icon>Filters
    </v-btn>-->

    <!-- <v-btn color="pink" dark absolute top right fab style="margin-top:50px" >
      <v-icon>add</v-icon>

    </v-btn>-->

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
    </v-navigation-drawer>-->

    <!-- <AddClient></AddClient> -->

    <v-container grid-list-md grid-list-sm>
      <v-layout row wrap>
        <v-flex md4 sm v-for="clientData in searchdWorkForce" :key="clientData.client_id">
          <Client :clientObj="clientData"></Client>
        </v-flex>
      </v-layout>
    </v-container>
    <div
      id="app"
      v-on:click="seen = !seen"
      class="control"
      style="position:fixed;top:0;"
      @click="scrollToTop"
    >
      <v-btn color="pink" dark fixed bottom right fab style="margin-top:50px">
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<script type="text/javascript">
import Client from "@/components/Client.vue";
import clientsServices from "../services/clientsServices";
import AddClient from "@/components/AddClient.vue";
import AddSources from "@/components/AddSources.vue";
import AddWorkForce from "@/components/AddWorkForce.vue";

import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
import { mdbIcon } from "mdbvue";
export default {
  components: {
    AddClient,
    AddSources,
    AddWorkForce,
    Client,
    mdbIcon
  },
  // el: '#wrapper',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    contactno: { required, minLength: minLength(10), maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ],
      right: null,
      clientsData: [],
      search: "",
      seen: false,
      name: "",
      contactno: "",
      email: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false
    };
  },
  created() {
    this.callALLClients();
  },
  mounted() {},
  methods: {
    callALLClients() {
      console.log("entered in callALLClients");
      clientsServices
        .getAllClients()
        .then(result => {
          this.clientsData = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkButton() {
      console.log("hello");
    },
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
      this.contactno = "";
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    addNewClient() {
      console.log("name" + this.name);
      console.log("name" + this.contactno);
      console.log("name" + this.email);

      this.$http
        .post("http://localhost:3000/clients", {
          client_name: this.name,
          client_contact: this.contactno,
          client_email: this.email,
          client_bill_rate: 20
        })
        .then(res => {
          /* console.log(res); */
          this.callALLClients();
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    searchdWorkForce() {
      return this.clientsData.filter(item => {
        return (
          this.search.length === 0 ||
          item.client_name.toLowerCase().includes(this.search.toLowerCase())
          //      &&
          // (this.selectedSource === null ||
          //   this.selectedSource === item.source_id) &&
          // (this.selectedJobRole.length === 0 ||
          //   this.selectedJobRole.includes(item.job_role_id))
        );
      });
      /* .sort((a, b) => {
          return a[this.sortBy]
            .toString()
            .localeCompare(b[this.sortBy].toString());
        }); */
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    contactErrors() {
      const errors = [];
      if (!this.$v.contactno.$dirty) return errors;
      !this.$v.contactno.minLength &&
        errors.push("Contact NO must be at least 10 characters long");
      !this.$v.contactno.required && errors.push("Contact Number is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  }
  // When the user scrolls down 20px from the top of the document, show the butto
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
