  <template>
  <div class="settings" id="wrapper">
    <div
      id="app"
      v-on:click="seen = !seen"
      class="control"
      style="position:fixed;top:0;"
      @click="scrollToTop"
    >
      <v-btn
        color="pink"
        dark
        absolute
        top
        right
        fab
        style="margin-top:120px;top: 0;right:0;position:fixed;width:50px;height:50px;;margin-right:10px;"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>

    <div v-if="seen" id="hide">
      <form>
        <table width="100%">
          <tr>
            <td>
              <mdb-icon icon="user" />
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
            <td style="padding-top: 25px;">
              <mdb-icon icon="dollar-sign" />
            </td>
            <td style="padding-top: 25px;"></td>
          </tr>
          <tr>
            <td style="padding-top: 25px;">
              <mdb-icon icon="user-md" />
            </td>
            <td style="padding-top: 25px;">
              <kendo-combobox
                :data-source="jobRole"
                label="Job Role"
                required
                placeholder="Job Role"
                :filter="'contains'"
                :index="0"
                style="width:100%;"
              ></kendo-combobox>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 25px;">
              <mdb-icon icon="hotel" />
            </td>
            <td style="padding-top: 25px;">
              <kendo-combobox
                :data-source="sources"
                label="Select Source"
                required
                placeholder="Select Source"
                :filter="'contains'"
                :index="0"
                style="width:100%;"
              ></kendo-combobox>
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
        <v-btn color="warning" @click="clear">clear</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength,
  email
} from 'vuelidate/lib/validators'
import { mdbIcon } from 'mdbvue'
export default {
  components: {
    mdbIcon
  },
  el: '#wrapper',
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    contactno: { required, minLength: minLength(10), maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    seen: false,
    name: '',
    contactno: '',
    email: '',
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
    dropdown_edit: [
      { text: '100%' },
      { text: '75%' },
      { text: '50%' },
      { text: '25%' },
      { text: '0%' }
    ],
    rates: [1, 2, 3, 4, 5],
    ratePerDay: ['', 1, 2, 3, 4, 5],
    jobRole: ['', 'Plumber', 'Carpenter'],
    sources: ['', 'ABC', 'XYZ', 'PQR'],
    selected: null,
    options: [
      { value: null, text: 'Please select an option' },
      { value: 'a', text: 'This is First option' },
      { value: 'b', text: 'Selected Option' },
      { value: { C: '3PO' }, text: 'This is an option with object value' },
      { value: 'd', text: 'This one is disabled', disabled: true }
    ]
  }),

  computed: {
    form () {
      return {
        name: this.name,
        contactno: this.contactno,
        email: this.email
      }
    },
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    contactErrors () {
      const errors = []
      if (!this.$v.contactno.$dirty) return errors
      !this.$v.contactno.minLength &&
        errors.push('Contact NO must be at least 10 characters long')
      !this.$v.contactno.required && errors.push('Contact Number is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
      this.contactno = ''
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

  <style scoped>
.settings {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
}
</style>
