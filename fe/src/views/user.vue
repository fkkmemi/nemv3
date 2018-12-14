<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-title>회원 정보 수정</v-card-title>
          <v-card-text>
            <img-upload />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import imgUpload from '@/components/imgUpload'

export default {
  components: { imgUpload },
  data: () => ({
  }),
  mounted () {
  },
  methods: {
  }
}
</script>
