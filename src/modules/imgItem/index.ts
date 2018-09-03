import Vue from 'vue';

export default Vue.extend({
  props: ['item'],
  methods: {
    onClick: function () {
      this.$router.push({ path: `/pixiv/illust/${this.item.id}` });
    }
  }
});
