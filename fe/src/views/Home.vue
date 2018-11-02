<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>{{msg}}</em>
            </small>
            <v-btn color="error" @click="delAll">데이터베이스 전체 삭제</v-btn>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
