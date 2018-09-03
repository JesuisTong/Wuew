<template>
  <div class="illust">
    <div class="title">
      {{ illust.title }}
    </div>
    <img :src="illust.image_urls.large" ref="img" alt="error">
    <div class="scope-area" ref="scopeArea" v-show="showScope">
      <img width="600px" height="800px" :src="illust.image_urls.large" alt="error" ref="scopeImg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'illust',
  created() {
    const { imgs, expired } = JSON.parse(window.localStorage.getItem('imgs')) || {};
    if (!$.isEmptyObject(imgs) && imgs.some(i => (i.id == this.$route.params.uri))) {
      this.illust = imgs.find(i => (i.id == this.$route.params.uri));
      return;
    }
    $.ajax({
      url: '//47.91.209.93:3001/api/illustDetail',
      type: 'GET',
      data: {
        uri: this.$route.params.uri
      }
    }).done(res => {
      this.illust = res.illust;
    });
  },
  mounted() {
    this.$refs.img.addEventListener('mouseover', this.scopeListen().inRange);
    this.$refs.img.addEventListener('mousemove', this.scopeListen().moving);
    this.$refs.img.addEventListener('mouseout', this.scopeListen().outRange);
  },
  beforeDestroy() {
    this.$refs.img.removeEventListener('mouseover', this.scopeListen().inRange);
    this.$refs.img.removeEventListener('mousemove', this.scopeListen().moving);
    this.$refs.img.removeEventListener('mouseout', this.scopeListen().outRange);
  },
  methods: {
    scopeListen: function () {
      const outRange = () => {
        this.showScope = false;
      };
      const inRange = (e) => {
        this.showScope = true;
        const rect = this.$refs.img.getBoundingClientRect();
        $(this.$refs.scopeArea).css({
          top: e.offsetY > rect.height / 2 ? rect.height + 50 : -50,
          left: e.offsetX > rect.width / 2 ? rect.width + 50 : -50
        })
      };
      const moving = (e) => {
        if (!this.$refs.scopeArea) return;
        const rect = this.$refs.img.getBoundingClientRect();
        window.requestAnimationFrame(() => {
          $(this.$refs.scopeImg).css({
            top: (e.offsetY / rect.height) * (2 * rect.height - 200) * -1,
            left: (e.offsetX / rect.width) * (2 * rect.width - 200) * -1
          });
        });
      }
      return {
        outRange,
        inRange,
        moving
      };
    }
  },
  data: function () {
    return {
      illust: { image_urls: {} },
      showScope: false
    };
  }
}
</script>

<style lang="scss" scoped>
.illust {
  text-align: center;
  position: relative;
  padding: 100px 0;
  min-height: 100vh;
  background-color: #fff;
  .title {

  }
  .scope-area {
    width: 200px;
    height: 200px;
    overflow: hidden;
    padding: 5px;
    border: 1px dashed #333;
    position: absolute;
    img {
      position: absolute;
    }
  }
}
</style>

