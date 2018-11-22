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
            <v-form>
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
                label="약관동의: 실제 사용중인 아이디로 절대 가입하지 마시기 바랍니다"
                data-vv-name="agree"
                type="checkbox"
                required
              ></v-checkbox>
              <vue-recaptcha
                ref="recaptcha"
                :sitekey="$cfg.recaptchaSiteKey"
                size="invisible"
                @verify="onVerify"
                @expired="onExpired"
              >
              </vue-recaptcha>

              <v-spacer></v-spacer>
              <v-btn @click="checkRobot()">가입</v-btn>
              <v-btn @click="clear">초기화</v-btn>
            </v-form>
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
      pwd: '',
      response: ''
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
    onVerify (r) {
      this.form.response = r
      this.$refs.recaptcha.reset()
      this.submit()
    },
    onExpired () {
      this.form.response = ''
      this.$refs.recaptcha.reset()
    },
    checkRobot () {
      if (this.form.response.length) this.submit()
      else this.$refs.recaptcha.execute()
    },
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('모두 기입해주세요')
          return this.$axios.post('/sign/up', this.form)
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
