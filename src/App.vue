<template>
  <div id="app">
    <DataPage msg="Sensor Data View" />
  </div>
</template>

<script>
import DataPage from "./components/DataPage.vue";

export default {
  name: "App",
  components: {
    DataPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
