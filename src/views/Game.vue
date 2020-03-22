<template lang="pug">
.game
  .resources
    template(v-for="resource in resources")
      resource(:name="resource.name" :amount.sync="resource.amount" :assigned.sync="resource.assigned" :assignable="resource.assignable")
</template>

<script>
import Resource from '@/components/Resource'

export default {
  name: 'Game',
  components: {
    Resource
  },
  data () {
    return {
      resources: {
        stone: {
          name: "Stone",
          amount: 0,
          assigned: 0,
        },
        clay: {
          name: "Clay",
          amount: 0,
          assigned: 0,
        },
        /////////////
        // Special //
        /////////////
        settlers: {
          name: "Settlers",
          amount: 0,
          assignable: false
        },
      },
    }
  },
}
</script>

<style lang="sass">
  .resources
    display: grid
    grid-template-columns: repeat(6, 1fr)
    grid-gap: 10px
</style>
