<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm6>
        <editor v-model="editorText"/>
      </v-flex>
      <v-flex xs12 sm6>
        <viewer :value="editorText" />
      </v-flex>
      <v-flex xs12>
        <span>{{editorText}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor, Viewer } from '@toast-ui/vue-editor'

export default {
  components: {
    'editor': Editor,
    'viewer': Viewer
  },
  data () {
    return {
      editorText: ''
    }
  }
}
</script>
