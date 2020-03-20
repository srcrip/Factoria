<template lang="pug">
  b-navbar(type='is-black')
    template(slot='brand')
      b-navbar-item(tag='router-link' :to="{ path: '/' }") Factoria
    template(slot='start')
      b-navbar-item(href='#')
        | Home
      b-navbar-item(href='#')
        | Documentation
      b-navbar-dropdown(label='Info')
        b-navbar-item(href='#')
          | About
        b-navbar-item(href='#')
          | Contact
    template(slot='end')
      b-navbar-item(tag='div')
        .buttons
          a.button.is-primary
            strong Sign up
          a.button.is-light
            | Log in
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="sass">
@import "@/assets/sass/_variables.sass"
</style>
