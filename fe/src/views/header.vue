<template>
  <v-container>
    <!-- <v-btn @click="headerSend">임의 헤더 전송</v-btn>
    <v-btn @click="headerSend2">오쏘 헤더 전송</v-btn>
    <v-btn @click="lsWrite">로컬스토리지 저장</v-btn>
    <v-btn @click="lsRead">로컬스토리지 읽기</v-btn>
    <v-btn @click="lsRemove">로컬스토리지 지우기</v-btn>
    <v-btn @click="lsClear">로컬스토리지 전체삭제</v-btn> -->
    <v-btn @click="apiWithToken">토큰과 함께 전송</v-btn>
    <v-btn @click="apiWithTrash">이상한 문자와 함께 전송</v-btn>
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
