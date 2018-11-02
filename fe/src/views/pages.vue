<template>
  <v-container>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  mounted () {
    console.log(localStorage)
  },
  methods: {
    headerSend () {
      axios.get(`${this.$apiRootPath}test`, { headers: { xxx: 1234 } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    headerSend2 () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'fake token!' } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    lsWrite () {
      localStorage.setItem('token', 123)
    },
    lsRead () {
      console.log(localStorage.getItem('token'))
    },
    lsRemove () {
      localStorage.removeItem('token')
    },
    lsClear () {
      localStorage.clear()
    },
    apiWithToken () {
      const token = localStorage.getItem('token')
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: token } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    },
    apiWithTrash () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'abcdefghijk' } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    }
  }
}
</script>
