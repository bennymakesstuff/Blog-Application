<template>
  <div class="main-menu">
    <router-link to="/" :class="[theme]">Home</router-link>
    <router-link to="/login" :class="[theme]">Login</router-link>
    <router-link to="/register" :class="[theme]">Register</router-link>
  </div>
</template>

<script>
export default {
  name: 'main-menu',
  computed: {
    theme: function(){
      return this.$store.getters.theme;
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';


a {color: #333333;
  display: inline-block;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;}

a.dark {color: $dark_main_text;}

a:hover {color: #379298;}

.main-menu {width: 100%;
          padding: 0.5rem;
          text-align: center;}

</style>
