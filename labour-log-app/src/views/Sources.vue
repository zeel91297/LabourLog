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
    <div class="settings" id="wrapper">
      <div v-if="seen" id="hide">
        <form v-on:submit.prevent="addNewSource">
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
            <!-- <tr>
              <td>
                <mdb-icon far icon="clipboard" />
              </td>
              <td>
                <v-text-field
                  v-model="description"
                  label="description"
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                ></v-text-field>
              </td>
            </tr>-->
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
          </table>

          <!-- <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"

          ></v-select>-->

          <v-btn color="success" @click="submit">ADD</v-btn>
          <v-btn color="warning" @click="clear" style="margin-left:15px;">clear</v-btn>
        </form>
      </div>
    </div>
    <v-container grid-list-md grid-list-sm>
      <v-layout row wrap>
        <v-flex md4 sm12 v-for="sourceData in searchdWorkForce" :key="sourceData.source_id">
          <Source :sourceObj="sourceData" />
        </v-flex>
      </v-layout>
    </v-container>
    <div
      id="app"
      class="control"
      v-on:click="seen = !seen"
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
import Source from "@/components/Source.vue";
import sourcesServices from "../services/sourcesServices";
import AddSources from "@/components/AddSources.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  name,
  Contact,
  description
} from "vuelidate/lib/validators";
import JQuery from "jquery";
let $ = JQuery;
import { mdbIcon } from "mdbvue";
export default {
  components: {
    Source,
    AddSources,
    mdbIcon
  },
  //el: '#wrapper',
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
      seen: false,
      right: null,
      sourcesData: [],
      search: "",
      name: "",
      contactno: "",
      email: "",
      description: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false
    };
  },
  mounted() {},
  created() {
    this.callALLSources();
  },
  methods: {
    callALLSources() {
      sourcesServices
        .getAllSources()
        .then(result => {
          this.sourcesData = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit() {
      this.$v.$touch();

      console.log("name" + this.name);
      console.log("description" + this.description);
      console.log("number" + this.contactno);
      console.log("email" + this.email);

      this.$http
        .post("http://localhost:3000/Sources/", {
          source_name: this.name,
          source_desc: this.descrption,
          source_contact: this.contactno,
          source_email: this.email
        })
        .then(res => {
          // alert();
          this.callALLSources();
        })
        .catch(err => console.log(err));
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
      this.contactno = "";
      this.description = "";
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
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
    },
    searchdWorkForce() {
      return this.sourcesData.filter(item => {
        return (
          this.search.length === 0 ||
          item.source_name.toLowerCase().includes(this.search.toLowerCase())
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
