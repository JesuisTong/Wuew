import Vue from 'vue';
import $ from '$';
import imgItem from "modules/imgItem";

const getSearchQuery: object = (str: string = '') => {
  if (!str) str = location.href;
  const splice = str.split('?');
  if (!splice[1]) return {};
  const arr = splice[1].split('&');
  let obj = {};
  arr.forEach(i => {
    if (!!i) {
      const item = i.split('=');
      obj = {
        ...obj,
        [item[0]]: decodeURIComponent(item[1])
      }
    }
  });
  return obj;
};

export default Vue.extend({
  name: 'pixivImgs',
  components: {
    imgItem
  },
  created: function () {
    const { expired, imgs } = JSON.parse(localStorage.getItem('imgs') || '{}');
    if (expired > Date.now() && imgs.length > 0) {
      this.imgs = imgs;
      this.page += Math.round(imgs.length / 20);
      return;
    }
    this.throttle = true;
    $.ajax({
      url: '//47.91.209.93:3001/api/rank/day',
      type: 'GET',
      data: {
        page: this.page
      }
    }).done((res: any) => {
      this.page += 1;
      this.imgs = [...this.imgs, ...res.illusts];
      localStorage.setItem('imgs', JSON.stringify({ imgs: this.imgs, expired: Date.now() + 3600 * 24 * 1000 }));
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
    const imgs: string[] = [];
    return {
      imgs,
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
        }).done((res: any) => {
          this.page += 1;
          this.imgs = [...this.imgs, ...res.illusts];
          window.localStorage.setItem('imgs', JSON.stringify({ imgs: this.imgs, expired: Date.now() + 3600 * 24 * 1000 }));
          this.throttle = false;
        });
      }
    },
  }
});
