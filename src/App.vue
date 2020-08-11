<template>
  <div id="app">
    <Search />
    <router-view></router-view>
  </div>
</template>

<script>
import Search from "./views/header/search";
export default {
  name: "app",
  components: {
    Search,
  },
};
</script>

<style lang="scss"></style>
