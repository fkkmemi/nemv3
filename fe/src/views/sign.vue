<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>로그인 하기</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="form.id" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="form.pwd" label="비밀번호" type="password"></v-text-field>
              <v-checkbox
                v-model="form.remember"
                label="암호 기억하기(최대 7일간 보관 됩니다.)"
              ></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: '',
        pwd: '',
        remember: false
      }
    }
  },
  methods: {
    signIn () {
      this.$axios.post('sign/in', this.form)
        .then(r => {
          if (!r.data.success) throw new Error(r.data.msg)
          localStorage.setItem('token', r.data.token)
          this.$store.commit('getToken')
          this.$router.push('/')
        })
        .catch(e => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
}
</script>
