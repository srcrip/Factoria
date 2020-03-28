<template lang="pug">
// TODO Rename scavenge to craft?
.resource
  .field
    .tags.has-addons
      span.tag.is-medium.is-dark {{ name }}
      span.tag.is-medium.is-light {{ amount }}
    span.tag Selling price: ${{ sellingPrice }}
    span.tag Buying price: ${{ buyingPrice }}
  .field.has-addons.has-addons-centered
    .control
      progress-button.button.is-small(:duration="delay" @click="tryBuy(1)") Scavenge
    .control
      progress-button.button.is-small.is-dark(:duration="delay"
        @click="tryUpgradeBuying(1); hoverToggle('upgradeBuyingHover', false)"
        @mouseover.native="hoverToggle('upgradeBuyingHover', true)" @mouseout.native="hoverToggle('upgradeBuyingHover', false)")
        template(v-if="!upgradeBuyingHover") Level: {{ buyingLevel }}
        template(v-if="upgradeBuyingHover") Upgrade for 2
  template(v-if="assignable")
    .field.has-addons-centered.has-addons
      .control
        progress-button.button.is-small(v-if="assignable" :duration="delay" @click="tryAssign(1)") Assign worker
    span.tag.is-light Workers: {{ assigned }}
  hr
  .field
    div(@click="trySellErrorCheck(1)")
      progress-button.button.is-small(:disabled="!canSell(1)" :duration="delay" @click="trySell(1)") Sell 1
</template>

<script>
import Button from 'vue-progress-button'
import Pricing from '@/mixins/pricing'

const DEFAULT_DELAY = 1000

export default {
  name: 'Resource',
  mixins: [
    Pricing
  ],
  timers: {
    buy: { time: DEFAULT_DELAY },
    assign: { time: DEFAULT_DELAY },
    upgradeBuying: { time: DEFAULT_DELAY },
    workerTick: { time: 5000, autostart: true, repeat: true },
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
    ducats: {
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
      buyingUpgradeInitialCost: 1,
      buyingUpgradeCostFactor: 1.2,
      buyingLevel: 1,
      upgradeBuyingHover: false
    }
  },
  computed: {
    buyingUpgradeCost() {
      return Math.floor(this.buyingUpgradeInitialCost * Math.pow(this.buyingUpgradeCostFactor, this.amount))
    },
  },
  mounted () {
    // TODO: Add this to others
    this.timers.buy.time = this.delay
  },
  methods: {
    workerTick() {
      this.$emit('update:amount', this.amount + this.assigned)
    },
    errorToast(msg) {
      this.$buefy.toast.open({
          duration: 5000,
          message: msg,
          position: 'is-bottom',
          type: 'is-danger'
      })
    },
    hoverToggle(thing, val) {
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
      this.$timer.restart('assign')
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
