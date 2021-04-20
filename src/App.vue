<template>
  <div :class="['full-width', 'center-content']">

    <div v-if="loggedIn" :class="['logged-in', theme]">
    </div>

    <div v-if="!loggedIn" :class="['logged-out', theme]">

      <div :class="['header-area', theme]">
        <div class="inner">
        <div class="title-area">
          <div class="logo"></div>
          <div class="title">{{this.$store.state.app_settings.name}}</div>
        </div>

        <!--<div class="center-flex"></div>-->

        <nav class="main-menu">
          <main-menu/>
        </nav>
      </div>
      </div>

      <router-view class="main-content"></router-view>
    </div>



  </div>
</template>

<script>
import MainMenu from '@/views/logged-out/MainMenu.vue'

export default {
  name: 'main-entry',
  components: {
    'main-menu': MainMenu
  },
  data: function(){
    return {
      loggedIn: false,
    }
  },
  computed: {
    theme: function(){
      return this.$store.getters.theme;
    }
  },
  methods: {
    setMainBodyColor: function(){

    }
  }
}
</script>

<style lang="scss">
@import '@/styles/main.scss';

.bodybg {background-color: $dark_main_background;}
//.bodybg {background-color: $dark_main_background;}

.full-width {
  width: 100%;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-area.dark {background-color: darken($dark_main_background, 3%);}
.header-area {width: 100%;
            text-align: center;
            position: fixed;
            height: auto;
            top: 0;
            left: 0;
            z-index: 99;
            background-color: #ffffff;
            transition: background-color linear 200ms;
            padding: 0rem;

    > .inner {max-width: 900px;
            padding: 0.5rem;
            height: auto;
            margin-left: auto;
            margin-right: auto;
            flex: auto;
            }
          }

.main-content {margin-top: calc(#{$header_height} + 1rem);}

.center-flex {height: 3rem;
              flex-grow: 2;
              display: inline-block;}

.title-area {height: 3rem;
            width: auto;
            min-width: 10rem;
            display: inline-block;
            vertical-align: top;
            float: left;

          > .title {width: auto;
                  font-size: 1.2rem;
                  vertical-align: middle;
                  display: inline-block;
                }

          > .logo {height: 3rem;
                  width: 8rem;
                  display: inline-block;
                  vertical-align: middle;}

          }

.main-menu {width: auto;
            display: inline-block;
            vertical-align: top;
            height: 3rem;
            float: right;
            }

.logged-in.dark {background-color: $dark_main_background;
                color: $dark_main_text;}

.logged-in {width: 100vw;
            min-height: 100vh;
            transition: background-color linear 200ms;}

.logged-out.dark {background-color: $dark_main_background;
                  color: $dark_main_text;}

.logged-out {width: 100vw;
            min-height: 100vh;
            transition: background-color linear 200ms;}



</style>
