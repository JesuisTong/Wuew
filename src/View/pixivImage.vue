<template>
  <div class="pixiv" ref="imgWall">
    <imgItem v-for="item in imgs" :item="item" :key="`${item.id}${item.create_date}`" />
  </div>
</template>

<script>
import imgItem from "modules/imgItem";

const getSearchQuery = (str = '') => {
  if (!str) str = location.href;
  const splice = str.split('?');
  if (!splice[1]) return {};
  const arr = splice[1].split('&');
  const obj = {};
  arr.forEach(i => {
    if (!!i) {
      const item = i.split('=');
      obj[item[0]] = window.decodeURIComponent(item[1]);
    }
  });
  return obj;
};

export default {
  name: 'pixivImgs',
  components: {
    imgItem
  },
  created: function () {
    const { expired, imgs } = JSON.parse(window.localStorage.getItem('imgs')) || {};
    if (expired > Date.now() && imgs.length > 0) {
      this.imgs = imgs;
      this.page += window.parseInt(imgs.length / 20);
      return;
    }
    this.throttle = true;
    $.ajax({
      url: '//47.91.209.93:3001/api/rank/day',
      type: 'GET',
      data: {
        page: this.page
      }
    }).done(res => {
      this.page += 1;
      this.imgs = [...this.imgs, ...res.illusts];
      window.localStorage.setItem('imgs', JSON.stringify({ imgs: this.imgs, expired: Date.now() + 3600 * 24 * 1000 }));
      this.throttle = false;
    });
  },
  mounted: function () {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.onScroll);
  },
  data: function () {
    return {
      imgs: [],
      throttle: false,
      isEnd: false,
      page: 1
    };
  },
  methods: {
    onScroll: function () {
      if (this.isEnd) return;
      if (this.throttle) return;
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop <= window.screen.availHeight + 100) {
        this.throttle = true;
        this.page && $.ajax({
          url: '//47.91.209.93:3001/api/rank/day',
          type: 'GET',
          data: {
            page: this.page
          }
        }).done(res => {
          this.page += 1;
          this.imgs = [...this.imgs, ...res.illusts];
          window.localStorage.setItem('imgs', JSON.stringify({ imgs: this.imgs, expired: Date.now() + 3600 * 24 * 1000 }));
          this.throttle = false;
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.pixiv {
  width: 100%;
  padding-top: 16px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>


