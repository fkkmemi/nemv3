<template>
  <v-container>
    <v-alert type="warning" :value="true">
      {{$route.path}} 그런 페이지 없어요~
    </v-alert>
  </v-container>
</template>
