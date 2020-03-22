<template lang="pug">
.resource
  .field
    span.tag.is-dark {{ name }}: {{ amount }}
  .field.has-addons.has-addons-centered
    .control
      progress-button.button.is-small(:duration="delay" @click="tryBuy(1)") Scavenge
    .control
      progress-button.button.is-small.is-dark(:duration="delay"
        @click="tryUpgradeBuying(1)"
        @mouseover.native="hoverToggle('upgradeBuyingHover', true)" @mouseout.native="hoverToggle('upgradeBuyingHover', false)")
        template(v-if="!upgradeBuyingHover") Level: {{ buyingLevel }}
        template(v-if="upgradeBuyingHover") Upgrade for 2
  progress-button.button.is-small(v-if="assignable" :duration="delay" @click="tryAssign(1)") Assign worker
  pre {{ upgradeBuyingHover }}
</template>

<script>
import Button from 'vue-progress-button'

const DEFAULT_DELAY = 1000

export default {
  name: 'Resource',
  timers: {
    buy: { time: DEFAULT_DELAY }
  },
  props: {
    name: {
      type: String,
      default: "?"
    },
    assignable: {
      type: Boolean,
      default: true
    },
    amount: {
      type: Number,
      default: 0
    },
    assigned: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: DEFAULT_DELAY
    },
  },
  data () {
    return {
      qty: 1,
      costFactor: 1.2,
      buyingLevel: 1,
      upgradeBuyingHover: false
    }
  },
  computed: {
    cost() {
      if (this.stripeStep === 2) {
        return 1
      } else {
        return 0
      }
    },
  },
  mounted () {
    this.timers.buy.time = this.delay
  },
  methods: {
    hoverToggle(thing, val) {
      console.log("hovered")
      this[thing] = val
    },
    tryBuy(qty) {
      this.qty = qty
      this.$timer.restart('buy')
    },
    tryUpgradeBuying(qty) {
      this.qty = qty
      this.$timer.restart('upgradeBuying')
    },
    tryAssign(qty) {
      this.qty = qty
      this.$timer.restart('buy')
    },
    buy() {
      this.$emit('update:amount', this.amount + this.qty)
    },
    upgradeBuying() {
      this.buyingLevel += this.qty
    },
    assign() {
      this.$emit('update:assigned', this.assigned + this.qty)
    },
  },
  components: {
    'progress-button': Button
  },
}
</script>

<style scoped lang="sass">
.resource
  text-align: center
</style>
