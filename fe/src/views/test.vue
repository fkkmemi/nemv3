<template>
  <v-container grid-list-md>
    <v-rating length="3"></v-rating>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-card-title>전체 데이터베이스 삭제</v-card-title>
          <v-card-action>
            <v-btn color="error" @click="delAll">모두 삭제</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
    >
      {{ msg }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    delAll () {
      this.$axios.delete(`${this.$apiRootPath}test/delAll`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(r => {
          this.msg = r.data.msg
        })
        .catch(e => {
          this.msg = e.message
        })
    }
  }
}
</script>
