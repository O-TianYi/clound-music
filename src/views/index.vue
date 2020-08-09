<template>
  <div class="main">
    <Search />
    <div class="content">
      <div class="aside">
        <Aside :data="asideData" title="推荐" class="aside-item" />
        <Aside :data="asideData1" title="我的音乐" class="aside-item" />
      </div>
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "./aside";
import Search from "./search";
export default {
  components: { Aside, Search },
  data() {
    return {
      title1: "推荐",
      asideData: [
        { id: "1", name: "发现音乐", icon: "icon-yinle", route: "discovery" },
        { id: "2", name: "推荐音乐", icon: "icon-yinle", route: "recommend" },
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
      .aside-item {
        display: block;
      }
    }
    .router-view {
      flex: 1;
    }
  }
}
</style>
