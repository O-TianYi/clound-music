<template>
  <div class="main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人推荐" name="recommendation"></el-tab-pane>
      <el-tab-pane label="歌单" name="playlist"></el-tab-pane>
      <el-tab-pane label="主播电台" name="station"></el-tab-pane>
      <el-tab-pane label="排行榜" name="ranking"></el-tab-pane>
      <el-tab-pane label="歌手" name="singers"></el-tab-pane>
      <el-tab-pane label="最新音乐" name="lastestmusic"></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "recommendation",
    };
  },
  methods: {
    handleClick(tab) {
      // tab.name就是点击的name
      // console.log(tab.name);
      if (this.$route.name === tab.name) return;
      this.$router.push({ name: tab.name });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  /deep/ .el-tabs__nav-scroll {
    @include flex-center;
  }
  /deep/ .el-tabs__item {
    padding: 0;
    width: 100px;
    text-align: center;
  }
  /deep/ .el-tabs__active-bar {
    background-color: $theme-color;
    left: 10px;
    width: 80px !important;
  }
  /deep/ .is-active {
    color: $theme-color;
  }
  /deep/ .el-tabs__nav-wrap::after {
    height: 1px;
  }
}
</style>
