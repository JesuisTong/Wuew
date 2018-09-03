<template>
  <div class="pixiv" ref="imgWall">
    <imgItem v-for="item in imgs" :item="item" :key="`${item.id}${item.create_date}`" />
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
.pixiv {
  width: 100%;
  padding-top: 16px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
