<template>
  <v-card>
    <v-container pa-1>
      <v-layout row>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="grey--text">{{title}}</div>
              <h3 class="headline">{{number}}</h3>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-card-title primary-title>
            <v-avatar>
              <v-icon medium :color="tIconColor">{{tIcon}}</v-icon>
            </v-avatar>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-card-actions class="pa-2">
        <v-icon small :color="bIconColor">{{bIcon}}</v-icon>
        <span class="grey--text caption font-italic">&nbsp;{{bText}}</span>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: ['title', 'number', 'tIcon', 'tIconColor', 'bIcon', 'bIconColor', 'bText']
}
</script>
