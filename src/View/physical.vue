<template>
  <div id="physical-test">
    <div class="ball" ref="ball" />
  </div>
</template>

<script>
export default {
  name: 'phy',
  mounted() {
    this.$refs.ball.addEventListener('mousedown', this.triggerListen);

  },
  beforeDestroy() {
    this.$refs.ball.removeEventListener('mousedown', this.triggerListen);
  },
  methods: {
    triggerListener() {

    },
    moveListen() {

    },
    calcPhy() {

    }
  }
}
</script>

<style lang="scss" scoped>
.physical-test {
  width: 100%;
  height: 100vh;
}
</style>


