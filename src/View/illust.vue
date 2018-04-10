<template>
  <div class="illust">
    <div class="title">
      {{ illust.title }}
    </div>
    <img width="300px" height="400px" :src="illust.image_urls.large" alt="error">
    
  </div>
</template>

<script>
export default {
  name: 'illust',
  created() {
    $.ajax({
      url: '//47.91.209.93:3001/api/illustDetail',
      type: 'GET',
      data: {
        uri: this.$route.params.uri
      }
    }).done(res => {
      this.illust = res.illust;
    })
  },
  data: function () {
    return {
      illust: {}
    };
  }
}
</script>

<style lang="scss" scoped>
.illust {
  text-align: center;
  .title {

  }
  .thug {
    width: 200px;
    height: 150px;
    background-image: url(//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523961263&di=2755d5ed1e3b4ea25c43550ea48094fc&imgtype=jpg&er=1&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F39ec37436e05da9e1e36c97c0dac0d3a19a2fd48.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}
</style>

