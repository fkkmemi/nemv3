<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-title>vuetify-dialog시험</v-card-title>
          <v-card-actions>
            <v-btn color="warning" @click="confirm">
              누르지마세요
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card light>
          <v-card-text >
            <editor v-model="editorText"/>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card light>
          <v-card-text >
            <viewer :value="editorText" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <span>{{editorText}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  // components: {
  //   'editor': Editor,
  //   'viewer': Viewer
  // },
  data () {
    return {
      editorText: ''
    }
  },
  methods: {
    confirm: async function () {
      const r = await this.$dialog.confirm({ title: '위험', text: '그래도 누를 것입니까?' })
      if (!r) return this.$dialog.notify.info('취소 완료')
      this.$dialog.notify.error('핵폭탄 발사', { position: 'bottom-right' })
    }
  }
}
</script>
