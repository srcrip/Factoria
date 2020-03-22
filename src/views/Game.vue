<template lang="pug">
.game
  .tags.has-addons
    span.tag.is-medium.is-primary Ducats
    span.tag.is-medium.is-dark {{ ducats }}
  .resources
    template(v-for="resource in resources")
      resource(:name="resource.name" :amount.sync="resource.amount"
      :workers.sync="resource.workers" :assignable="resource.assignable" :ducats.sync="ducats")
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
      ducats: 0,
      resources: {
        stone: {
          name: "Stone",
          amount: 0,
          workers: 0,
        },
        clay: {
          name: "Clay",
          amount: 0,
          workers: 0,
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
