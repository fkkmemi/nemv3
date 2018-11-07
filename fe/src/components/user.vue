<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{user.id}}</h3>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-text>
      <div>이름: {{user.name}}</div>
      <div>권한: {{user.lv}}</div>
      <div>나이: {{user.age}}</div>
      <div>로그인 횟수: {{user.inCnt}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="children">자식용</v-btn>
      <v-btn color="warning" @click="parent">부모용</v-btn>
    </v-card-actions>
    <v-card-text v-if="va">
      <v-alert v-model="va" dismissible>자식 혼자 떠들기</v-alert>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'user' ],
  data () {
    return {
      va: false
    }
  },
  methods: {
    children () {
      this.user.name = 'xxx'
      this.va = true
    },
    parent () {
      this.$emit('sbOpen', '부모에게 알림')
    }
  }
}
</script>
