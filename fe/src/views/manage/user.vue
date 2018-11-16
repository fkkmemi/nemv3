<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">

        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{user.id}}</h3>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-title primary-title>
            <div>
              <div>이름: {{user.name}}</div>
              <div>권한: {{user.lv}}</div>
              <div>나이: {{user.age}}</div>
              <div>로그인 횟수: {{user.inCnt}}</div>
              <div>소금(_id): {{user._id}}</div>
              <div>비밀번호: {{user.pwd}}</div>
            </div>
          </v-card-title>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn flat color="orange" @click="putDialog(user)">수정</v-btn>
            <v-btn flat color="error" @click="delUser(user._id)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="이름"
                  hint="홍길동"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="userLvs"
                  label="권한"
                  required
                  v-model="userLv"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="userAges"
                  label="나이"
                  required
                  v-model="userAge"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="putUser">수정</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ sbMsg }}
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
      users: [],
      dialog: false,
      userAges: [],
      userLvs: [],
      userAge: 0,
      userLv: 0,
      userName: '',
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    for (let i = 0; i < 4; i++) this.userLvs.push(i)
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.get('manage/user')
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userLv = user.lv
      this.userAge = user.age
    },
    putUser () {
      this.dialog = false
      this.$axios.put(`manage/user/${this.putId}`, {
        name: this.userName, lv: this.userLv, age: this.userAge
      })
        .then((r) => {
          this.$store.commit('pop', { msg: '사용자 수정 완료', color: 'success' })
          this.getUsers()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    delUser (id) {
      this.$axios.delete(`manage/user/${id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '사용자 삭제 완료', color: 'success' })
          this.getUsers()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
