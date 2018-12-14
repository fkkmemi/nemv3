<template>
  <div>
    <file-pond
      name="bin"
      ref="pond"
      allow-multiple="false"
      max-files="1"
      accepted-file-types="image/jpeg, image/png"
      :server="server"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      v-on:processfile="onload"
      />
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'app',
  data () {
    return {
      myFiles: [],
      server: {
        url: `${this.$apiRootPath}user`,
        process: {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      }
    }
  },
  methods: {
    handleFilePondInit () {
      console.log('FilePond has initialized')
      // FilePond instance methods are available on `this.$refs.pond`
    },
    onload (e, r) {
      console.log(r)
    }
  },
  components: {
    FilePond
  }
}
</script>
