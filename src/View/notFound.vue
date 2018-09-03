<template>
  <div id='404-not-found' class="noutfou">
    Darling in the FranXX
    <p>Image for xx</p>
    <!-- <img class='ima' src='../assets/015.jpg' alt='error'> -->
    <div class="haa" id='editor'>placeholder for editor</div>
    <router-link to="/index">Index</router-link>
  </div>
</template>


<script>

export default {
  computed: {
    username () {
      return this.$route.params.username
    }
  },
  mounted() {
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  #404-not-found.noutfou {
    text-align: center;
    font-size: 24px;
    color: aqua;
  }
  p {
    color: red;
  }
  .ima {
    width: 200px;
    height: 200px;
  }
  #editor, .haa {
    border: 1px solid lightgray;
    margin: auto;
    height: 200px;
    width: 80%;
  }
</style>

