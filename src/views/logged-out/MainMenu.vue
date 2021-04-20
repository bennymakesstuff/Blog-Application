<template>
  <div class="main-menu">
    <router-link to="/" :class="[theme]">Home</router-link>
    <router-link to="/login" :class="[theme]">Login</router-link>
    <router-link to="/register" :class="[theme]">Register</router-link>
    <div class="theme-button" @click="toggleTheme"></div>
  </div>
</template>

<script>
export default {
  name: 'main-menu',
  computed: {
    theme: function(){
      return this.$store.getters.theme;
    }
  },
  methods: {
    toggleTheme: function(){
      this.$store.dispatch('toggle_theme');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';


a {color: #333333;
  display: inline-block;
  font-size: 1rem;
  font-weight: 200;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;}

a.dark {color: $dark_main_text;}

a:hover {color: #379298;}

.main-menu {width: 100%;
          padding: 0rem;
          text-align: center;

          > .theme-button {height: 1.5rem;
                          width: 1.5rem;
                          border-radius: 0.75rem;
                          background-color: grey;
                          display: inline-block;
                          vertical-align: middle;
                          cursor: pointer;}
        }

</style>
