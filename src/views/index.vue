<template>
  <div class="main">
    <!-- <Search /> -->
    <div class="content">
      <div class="aside">
        <Aside :data="asideData" title="推荐" class="aside-item" />
        <!-- <Aside :data="asideData1" title="我的音乐" class="aside-item" /> -->
      </div>
      <div class="router-view">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Aside from "./header/aside";
import Footer from "./header/footer";
export default {
  components: { Aside, Footer },
  data() {
    return {
      title1: "推荐",
      asideData: [
        { id: "1", name: "发现音乐", icon: "icon-yinle", route: "discovery" },
        { id: "2", name: "我的音乐", icon: "icon-yinle", route: "mymusic" },
        { id: "3", name: "直播", icon: "icon-video", route: "live" },
        { id: "4", name: "MV", icon: "icon-MV", route: "mv" },
      ],
      asideData1: [
        { id: "1", name: "本地音乐", icon: "icon-yinle", route: "discovery" },
        {
          id: "2",
          name: "我的音乐云盘",
          icon: "icon-yinle",
          route: "discovery",
        },
        { id: "3", name: "我的收藏", icon: "icon-video", route: "discovery" },
      ],
    };
  },
  methods: {
    test() {
      this.$router.push({ name: "live" });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .content {
    @include flex-general(row, space-between, flex-start);
    .aside {
      width: 200px;
      height: 100%;
      background-color: #f5f5f7;
      margin-left: 10px;
      position: fixed;
      left: 0;
      top: 50px;
      z-index: 9999;
      .aside-item {
        display: block;
      }
    }
    .router-view {
      padding-top: 60px;
      padding-left: 220px;
      padding-right: 20px;
      padding-bottom: 100px;
      flex: 1;
    }
  }
}
</style>
