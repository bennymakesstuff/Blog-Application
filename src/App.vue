<template>
  <div :class="['full-width', 'center-content']">

    <div v-if="loggedIn" :class="['logged-in', theme]">

    </div>

    <div v-if="!loggedIn" :class="['logged-out', theme]">
      <div class="header-area">
        <h1>{{this.$store.state.app_settings.name}}</h1>
      </div>
      <main-menu/>
      <router-view></router-view>
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

.full-width {
  width: 100%;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-area {width: 100%;
            text-align: center;}

.logged-in.dark {background-color: $dark_main_background;
                color: $dark_main_text;}

.logged-in {width: 100vw;
            min-height: 100vh;}

.logged-out.dark {background-color: $dark_main_background;
  color: $dark_main_text;}

.logged-out {width: 100vw;
            min-height: 100vh;}



</style>
