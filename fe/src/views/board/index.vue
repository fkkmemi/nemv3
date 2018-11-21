<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs" :class="$vuetify.breakpoint.xs ? 'pa-0' : ''">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="headline">
            <v-tooltip bottom>
              <span slot="activator">{{board.name}}</span>
              <span>{{board.rmk}}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="params.search"
              append-icon="search"
              label="검색"
              clearable
              style="width:40px"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="articles"
            :total-items="pagination.totalItems"
            :pagination.sync="pagination"
            :loading="loading"
            class="text-no-wrap"
            rows-per-page-text=""

            disable-initial-sort>
            <template slot="items" slot-scope="props">
              <td :class="headers[0].class">{{ id2date(props.item._id)}}</td>
              <td :class="headers[1].class"><a @click="read(props.item)"> {{ props.item.title }}</a></td>
              <td :class="headers[2].class">{{ props.item._user ? props.item._user.id : '손님' }}</td>
              <td :class="headers[3].class">{{ props.item.cnt.view }}</td>
              <td :class="headers[4].class">{{ props.item.cnt.like }}</td>
            </template>

            <template slot="actions-prepend">
            </template>
            <template slot="actions-append">
            </template>
          </v-data-table>
          <!-- <v-card-text>
            <v-pagination v-model="pagination.page" :length="pages" style="width:200px"></v-pagination>
          </v-card-text> -->
        </v-card>
      </v-flex>
      <v-btn
        floating
        fixed
        dark
        fab
        bottom
        right
        color="pink"
        @click="addDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
      <v-card v-if="!dlMode">
        <v-card-title>
          <span class="headline">제목: {{selArticle.title}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>내용</p>
          {{selArticle.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" flat @click.native="modDialog()">수정</v-btn>
          <v-btn color="error darken-1" flat @click.native="ca=true">삭제</v-btn>
          <v-btn color="secondary darken-1" flat @click.native="dialog = false">닫기</v-btn>
        </v-card-actions>
        <v-card-text>
          <v-card-text v-if="ca">
            <v-alert v-model="ca" type="warning">
              <h4>정말 진행 하시겠습니까?</h4>
              <v-btn color="error" @click="del()">확인</v-btn>
              <v-btn color="secondary" @click="ca=false">취소</v-btn>
            </v-alert>
          </v-card-text>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <span class="headline">글 {{(dlMode === 1) ? '작성' : '수정'}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field
              label="제목"
              persistent-hint
              required
              v-model="form.title"
            ></v-text-field>
            <v-textarea
              label="내용"
              persistent-hint
              required
              v-model="form.content"
            ></v-textarea>

            <vue-recaptcha
              ref="recaptcha"
              :sitekey="$cfg.recaptchaSiteKey"
              size="invisible"
              @verify="onVerify"
              @expired="onExpired"
            >
            </vue-recaptcha>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="checkRobot()">확인</v-btn>
          <v-btn color="red darken-1" flat @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <vue-recaptcha
      ref="recaptcha"
      sitekey="6Lcu23sUAAAAACpyLEfxuMrovIwZAZ1x5hnAEGFv"
      @verify="onVerify"
      @expired="onExpired"
    >
      <v-btn @click="rcc">rcc</v-btn>
      <v-btn @click="rcc2">rcc2</v-btn>
    </vue-recaptcha> -->
  </v-container>
</template>
<script>

// import VueRecaptcha from 'vue-recaptcha'

export default {
  // components: { VueRecaptcha },
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
      articles: [],
      dialog: false,
      lvs: [0, 1, 2, 3],
      form: {
        title: '',
        content: '',
        response: ''
      },
      headers: [
        { text: '날짜', value: '_id', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'title', sortable: true, align: 'left' },
        { text: '글쓴이', value: '_user', sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true },
        { text: '추천', value: 'cnt.like', sortable: true }
      ],
      loading: false,
      pagination: {
        sortBy: '_id',
        descending: true
      },
      dlMode: 0, // 0: read, 1: write, 2: modify
      selArticle: {},
      ca: false,
      params: {
        draw: 0,
        search: '',
        skip: 0,
        sort: '_id',
        order: 0,
        limit: 1
      },
      timeout: null
    }
  },
  mounted () {
    this.getBoard()
  },
  watch: {
    pagination: {
      handler () {
        this.list()
      },
      deep: true
    },
    'params.search' (m) {
      this.delay()
    },
    '$route' (to, from) {
      // console.log(to.path, from.path)
      this.getBoard()
    }
  },
  computed: {
    setSkip () {
      if (this.pagination.page <= 0) return 0
      return (this.pagination.page - 1) * this.pagination.rowsPerPage
    },
    setSort () {
      let sort = this.pagination.sortBy
      if (!this.pagination.sortBy) sort = '_id'
      return sort
    },
    setOrder () {
      return this.pagination.descending ? -1 : 1
    },
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  methods: {
    onVerify (r) {
      this.form.response = r
      this.$refs.recaptcha.reset()
      if (this.dlMode === 1) this.add()
      else this.mod()
    },
    onExpired () {
      this.form.response = ''
      this.$refs.recaptcha.reset()
    },
    checkRobot () {
      // console.log(this.form.response)
      if (this.form.response === '') return this.$refs.recaptcha.execute()
      if (this.dlMode === 1) this.add()
      else this.mod()
    },
    rcc (r) {
      // this.$refs.recaptcha.reset()
      this.$refs.recaptcha.execute()
      //   .then(r => console.log(r))
      //   .catche(e => console.log(e.message))
    },
    rcc2 (r) {
      this.$refs.recaptcha.reset()
    },
    sendRecaptcha (token) {
      this.$refs.recaptcha.reset()
      const bd = {
        response: token
      }
      this.$axios.post('/recaptcha', bd)
        .then(r => console.log(r))
        .catch(e => console.error(e.massage))
    },
    addDialog () {
      this.dialog = true
      this.dlMode = 1
      this.form.title = ''
      this.form.content = ''
    },
    modDialog () {
      this.dlMode = 2
      this.form.title = this.selArticle.title
      this.form.content = this.selArticle.content
    },
    getBoard () {
      this.$axios.get(`board/read/${this.$route.params.name}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    add () {
      if (!this.form.title) return this.$store.commit('pop', { msg: '제목을 작성해주세요', color: 'warning' })
      if (!this.form.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      this.$axios.post(`article/${this.board._id}`, this.form)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      if (this.loading) return
      if (!this.board._id) return
      this.loading = true
      this.params.draw += 1
      this.params.skip = this.setSkip
      this.params.limit = this.pagination.rowsPerPage
      this.params.sort = this.setSort
      this.params.order = this.setOrder

      this.$axios.get(`article/list/${this.board._id}`, { params: this.params })
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.pagination.totalItems = data.t
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    read (atc) {
      this.selArticle = atc
      this.loading = true
      this.$axios.get(`article/read/${atc._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.dlMode = 0
          this.dialog = true
          this.selArticle.content = data.d.content
          this.selArticle.cnt.view = data.d.cnt.view
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    mod () {
      if (!this.form.title) return this.$store.commit('pop', { msg: '제목을 작성해주세요', color: 'warning' })
      if (!this.form.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      if (this.selArticle.title === this.form.title && this.selArticle.content === this.form.content) {
        return this.$store.commit('pop', { msg: '변경된 내용이 없습니다', color: 'warning' })
      }
      this.$axios.put(`article/${this.selArticle._id}`, this.form)
        .then(({ data }) => {
          this.dialog = false
          if (!data.success) throw new Error(data.msg)
          this.selArticle.title = data.d.title
          this.selArticle.content = data.d.content
          // this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    del () {
      this.$axios.delete(`article/${this.selArticle._id}`)
        .then(({ data }) => {
          this.dialog = false
          if (!data.success) throw new Error(data.msg)
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    },
    delay () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.list()
      }, 1000)
    }
  }
}
</script>
<style scoped>
.v-datatable__actions__range-controls {
  display: none !important;
}
</style>
