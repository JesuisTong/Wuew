<template>
  <div>
    <div class="panel">
      <button @click="complier">sass</button>
      <button @click="complier">less</button>
      <select name="" @change="handleChange">
        <option value="">请选择一种css</option>
        <option value="sass">sass</option>
        <option value="less">less</option>
      </select>
    </div>
    <div class="code">
      <pre id="preEditor">
      body {
        color: red;
      }
      </pre>
      <pre id="complier"></pre>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>

<style lang="scss" scoped>
  .code {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: row nowrap;
    #preEditor, #complier {
      flex: 1;
      margin: 0;
      // max-width: 40vw;
    }
  }
  .panel {
    box-sizing: border-box;
    padding: 20px;
    button {
      font-size: 16px;
      color: blue;
    }
  }
</style>


