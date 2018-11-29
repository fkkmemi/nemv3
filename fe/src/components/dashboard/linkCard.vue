<template>
  <v-card height="100%">
    <v-toolbar color="cyan" dark tabs>
      <v-toolbar-title>{{board.title}}</v-toolbar-title>
      <v-tabs
        slot="extension"
        v-model="tab"
        color="cyan" grow
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="article in articles" :key="article._id">
          {{ article.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="article in articles" :key="article._id">
        <v-card flat>
          <v-card-text v-html="article.content"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      board: {
        name: '로딩중...',
        title: '로딩중...',
        rmk: '무엇?'
      },
      tab: null,
      loading: false,
      params: {
        draw: 0,
        search: '',
        skip: 0,
        sort: '_id',
        order: 1,
        limit: 10
      },
      articles: []
    }
  },
  mounted () {
    this.getBoard()
  },
  watch: {
    tab (t) {
      if (this.articles.length) this.read(t)
    }
  },
  methods: {
    getBoard () {
      this.$axios.get(`board/read/link`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      if (!this.board._id) return
      this.loading = true
      this.params.draw += 1

      this.$axios.get(`article/list/${this.board._id}`, { params: this.params })
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          data.ds.forEach((v) => {
            v.content = ''
          })
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    read (i) {
      const atc = this.articles[i]
      this.loading = true
      this.$axios.get(`article/read/${atc._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          atc.content = data.d.content
          atc.cnt.view = data.d.cnt.view
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    }
  }
}
</script>
