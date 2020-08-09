<template>
  <div class="main">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#F5F5F7"
      text-color="#5C5C5C"
      active-text-color="red"
    >
      <p class="title-text">{{title}}</p>
      <el-menu-item
        v-for="item in data"
        :key="item.id"
        :index="item.id"
        @click="goRouter(item.route)"
      >
        <i :class="['iconfont',item.icon]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title", "data"],
  mounted() {
    // this.$router.push({ name: "discovery" });
  },
  methods: {
    // 路由跳转
    goRouter(route) {
      if (this.$route.name === route) return;
      this.$router.push({ name: route });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: block;
  .el-menu {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
    .title-text {
      height: 16px;
      line-height: 16px;
    }
    /deep/ .el-menu-item {
      height: 50px;
      @include flex-general(row, flex-start);
      i {
        font-size: 22px;
        @include i-inline-block(20px, 30px);
        margin-right: 10px;
        line-height: 30px;
      }
      &:hover {
        background-color: #f5f5f7;
      }
    }
  }
}
</style>
