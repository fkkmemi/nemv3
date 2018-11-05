<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>회원 가입</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-validate="'required|max:10'"
                v-model="name"
                :counter="10"
                :error-messages="errors.collect('name')"
                label="Name"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-text-field
                v-validate="'required|email'"
                v-model="email"
                :error-messages="errors.collect('email')"
                label="E-mail"
                data-vv-name="email"
                required
              ></v-text-field>
              <v-select
                v-validate="'required'"
                :items="items"
                v-model="select"
                :error-messages="errors.collect('select')"
                label="Select"
                data-vv-name="select"
                required
              ></v-select>
              <v-checkbox
                v-validate="'required'"
                v-model="checkbox"
                :error-messages="errors.collect('checkbox')"
                value="1"
                label="Option"
                data-vv-name="checkbox"
                type="checkbox"
                required
              ></v-checkbox>

              <v-btn @click="submit">submit</v-btn>
              <v-btn @click="clear">clear</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    name: '',
    email: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: null,
    dictionary: {
      attributes: {
        email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        },
        select: {
          required: 'Select field is required'
        }
      }
    }
  }),

  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => console.log(r))
        .catch(e => console.error(e.message))
    },
    clear () {
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$validator.reset()
    }
  }
}
</script>
