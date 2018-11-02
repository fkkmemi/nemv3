<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-if="!$store.state.token" @click="$router.push('sign')">
              <v-list-tile-title>로그인</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-else @click="signOut">
              <v-list-tile-title>로그아웃</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2017 {{$store.state.token}}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
        {
          icon: 'home',
          title: 'lv0',
          to: {
            path: '/'
          }
        },
        {
          icon: 'home',
          title: 'lv1',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'home',
          title: 'lv2',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'home',
          title: 'lv3',
          to: {
            path: '/lv3'
          }
        },
        {
          icon: 'face',
          title: '사용자관리',
          to: {
            path: '/user'
          }
        },
        {
          icon: 'face',
          title: '페이지관리',
          to: {
            path: '/page'
          }
        }
        // ,
        // {
        //   icon: 'home',
        //   title: '홈aaa',
        //   to: {
        //     path: '/home'
        //   }
        // },
        // {
        //   icon: 'face',
        //   title: 'header',
        //   to: {
        //     path: '/header'
        //   }
        // }
      ],
      title: this.$apiRootPath
    }
  },
  mounted () {
  },
  methods: {
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/')
    }
  }
}
</script>
