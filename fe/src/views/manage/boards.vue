<template>
  <v-container grid-list-md>
    <v-alert
      :value="!boards.length"
      type="warning"
    >
      데이터가 없습니다
    </v-alert>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="board in boards" :key="board._id">
        <board-card :board="board" @list="list"></board-card>
      </v-flex>
      <v-btn
        color="pink"
        dark
        small
        absolute
        bottom
        right
        fab
        @click="addDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">게시판 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="게시판 이름"
                  hint="당구모임"
                  persistent-hint
                  required
                  v-model="form.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  label="게시판 설명"
                  hint="당구를 좋아하는 사람"
                  persistent-hint
                  required
                  v-model="form.rmk"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="lvs"
                  label="권한"
                  required
                  v-model="form.lv"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="add()">확인</v-btn>
          <v-btn color="red darken-1" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import boardCard from '@/components/manage/boardCard'

export default {
  components: { boardCard },
  data () {
    return {
      boards: [],
      dialog: false,
      lvs: [0, 1, 2, 3],
      form: {
        name: '',
        rmk: '',
        lv: 0
      },
      selected: 0,
      sb: {
        act: false,
        msg: '',
        color: 'error'
      }
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.form = {
        name: '',
        rmk: '',
        lv: 0
      }
    },
    add () {
      if (!this.form.name) return this.$store.commit('pop', { msg: '이름을 작성해주세요', color: 'warning' })
      this.$axios.post('manage/board', this.form)
        .then((r) => {
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      this.$axios.get('manage/board')
        .then(({ data }) => {
          this.boards = data.ds
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    pop (m, c) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = c
    }
  }
}
</script>
