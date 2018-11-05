<template>
  <v-app :dark="siteDark">
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
      <v-toolbar-title v-text="siteTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left>
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <template v-if="!$store.state.token">
              <v-list-tile  @click="$router.push('/sign')">
                <v-list-tile-title>로그인</v-list-tile-title>
              </v-list-tile>
              <v-list-tile  @click="$router.push('/register')">
                <v-list-tile-title>회원가입</v-list-tile-title>
              </v-list-tile>
            </template>
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
      <span>{{siteCopyright}}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      siteTitle: '기다리는중',
      siteCopyright: '기다리는중',
      siteDark: false,
      items: [
        {
          icon: 'motorcycle',
          title: '관리자용 페이지',
          to: {
            path: '/'
          }
        },
        {
          icon: 'pan_tool',
          title: '슈퍼유저용 페이지',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'pets',
          title: '일반유저용 페이지',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'home',
          title: '손님용 페이지',
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
          icon: 'pageview',
          title: '페이지관리',
          to: {
            path: '/page'
          }
        },
        {
          icon: 'settings',
          title: '사이트관리',
          to: {
            path: '/site'
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
    this.getSite()
  },
  methods: {
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('delToken')
      this.$router.push('/')
    },
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          this.siteTitle = r.data.d.title
          this.siteCopyright = r.data.d.copyright
          this.siteDark = r.data.d.dark
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>
