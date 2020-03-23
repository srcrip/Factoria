// This is a mixin for resources that adds price, buying, selling, etc
export default {
  data() {
    return {
      buyingPrice: 0,
      sellingPrice: 0,
    }
  },
  timers: {
    setPrice: { time: 5000, autostart: true, repeat: true },
  },
  mounted () {
    this.setPrice()
  },
  methods: {
    // Pricing
    getRandPrice(factor) {
      return Math.floor(Math.random() * 100 / factor + 1)
    },
    setPrice() {
      this.buyingPrice = this.getRandPrice(3) + 6
      this.sellingPrice = this.getRandPrice(6)
      if (this.sellingPrice > this.buyingPrice)
        this.buyingPrice += (this.sellingPrice * 1.2)
        this.buyingPrice = Math.floor(this.buyingPrice)
    },

    // Selling
    canSell(qty) {
      return this.amount >= qty
    },
    errorSell() {
      let msg = `Not enough ${this.name} to sell.`
      this.errorToast(msg)
    },
    trySell(qty) {
      if (this.canSell(qty)) {
        this.qty = qty
        this.$timer.restart('sell')
      } else {
        this.errorSell()
      }
    },
    trySellErrorCheck(qty) {
      if (!this.canSell(qty)) this.errorSell()
    },
    sell() {
      this.$emit('update:amount', this.amount - this.qty)
      this.$emit('update:ducats', this.ducats + this.qty * this.sellingPrice)
    },
  },
};
