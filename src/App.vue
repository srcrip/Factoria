<template lang="pug">
  #app.has-background-black
    //- #nav
    //-   router-link(to="/") Home
    //-   p |
    //-   router-link(to="/about") About
    navbar
    .container
      section.section
        router-view
</template>

<script>
export default {
  name: 'App',
  components: {
    navbar: () => import('@/components/Navbar.vue'),
  },

}
</script>

<style lang="sass">
@import "@/assets/sass/_variables.sass"

#nav
  padding: 30px

  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983
</style>
