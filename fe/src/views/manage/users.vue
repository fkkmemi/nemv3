<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="user in users" :key="user._id">
        <user-card :user="user" @sbOpen="pop"></user-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="sb.act">{{sb.msg}}</v-snackbar>
  </v-container>
</template>
<script>
import userCard from '@/components/user'

export default {
  components: { userCard },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'xxxx'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    pop (msg) {
      this.sb.act = true
      this.sb.msg = msg
    },
    getUsers () {
      this.$axios.get('manage/user')
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
}
</script>
