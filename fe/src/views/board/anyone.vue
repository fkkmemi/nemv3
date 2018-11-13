<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="70px"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs6 align-end flexbox>
                  <span class="headline">{{board.name}}</span>
                </v-flex>
                <v-flex xs6 align-end flexbox>
                  <span>{{board.rmk}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md4>

      </v-flex>
    </v-layout>

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
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
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
    this.get()
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
    get () {
      this.$axios.get('board/아무나')
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    add () {
      if (!this.form.name) return this.pop('이름을 작성해주세요', 'warning')
      this.$axios.post('manage/board', this.form)
        .then((r) => {
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    list () {
      this.$axios.get('manage/board')
        .then(({ data }) => {
          this.boards = data.ds
        })
        .catch((e) => {
          this.pop(e.message, 'error')
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
