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
                v-validate="'required|min:4|max:20'"
                v-model="form.id"
                :counter="20"
                :error-messages="errors.collect('id')"
                label="아이디"
                data-vv-name="id"
                required
              ></v-text-field>
              <v-text-field
                v-validate="'required|min:6|max:40'"
                v-model="form.pwd"
                :counter="40"
                :error-messages="errors.collect('pwd')"
                label="비밀번호"
                data-vv-name="pwd"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-validate="'required|min:1|max:40'"
                v-model="form.name"
                :counter="40"
                :error-messages="errors.collect('name')"
                label="이름"
                data-vv-name="name"
                required
              ></v-text-field>

              <v-checkbox
                v-validate="'required'"
                v-model="agree"
                :error-messages="errors.collect('agree')"
                value="1"
                label="약관동의: 암호화도 안되어 있는 사이트인데 정말 가입하겠습니까?"
                data-vv-name="agree"
                type="checkbox"
                required
              ></v-checkbox>

              <v-btn @click="submit">가입</v-btn>
              <v-btn @click="clear">초기화</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        flat
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import ko from 'vee-validate/dist/locale/ko'

export default {
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    form: {
      id: '',
      name: '',
      pwd: ''
    },
    sb: {
      act: false,
      msg: '',
      color: 'warning'
    },
    agree: null,
    dictionary: {
      messages: ko.messages,
      attributes: {
        id: '아이디',
        pwd: '비밀번호',
        name: '이름',
        agree: '약관동의'
        // custom attributes
      },
      custom: {
        // name: {
        //   required: () => 'Name can not be empty',
        //   max: 'The name field may not be greater than 10 characters'
        //   // custom messages
        // },
        // select: {
        //   required: 'Select field is required'
        // }
      }
    }
  }),

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('모두 기입해주세요')
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) throw new Error(r.data.msg)
          this.$store.commit('pop', { msg: '가입 완료 되었습니다', color: 'success' })
          this.$router.push('/sign')
        })
        .catch(e => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    pop (m, cl) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = cl
    },
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = ''
      this.agree = null
      this.$validator.reset()
    }
  }
}
</script>
