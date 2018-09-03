import Vue from 'vue';

declare global {
  interface Window { handleHeader: any }
}

export default Vue.extend({
  name: 'topHeader',
  props: ['navList'],
  data: function () {
    return {
      showHide: false
    };
  },
  created() {
    // 暴露在window下控制header显示
    window.handleHeader = this.handleHeader;
  },
  methods: {
    handleCommand(e: string) {
      this.$router.push({ path: e });
    },
    handleHeader() {
      this.showHide = !this.showHide;
    }
  }
});
