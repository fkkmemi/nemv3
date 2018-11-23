<template>
  <v-container grid-list-md>
    <v-layout wrap row>
      <v-flex xs12 sm6>
        <link-card></link-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import linkCard from '@/components/dashboard/linkCard'

export default {
  components: { linkCard },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
