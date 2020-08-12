<template>
  <div class="main">
    <header class="title">{{title}}</header>
    <ul :class="data.length>5?'ul-more':'ul-less'">
      <li v-for="(item,index) in data" :key="index" @click="goPlayList(item)">
        <el-image :src="item.picUrl" lazy fit="fill">
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["title", "data"],
  methods: {
    //前往每个li的歌曲列表界面
    goPlayList(item) {
      this.$router.push({ name: "playlists", params: { id: item.id } }); //params+name,,query都可
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .title {
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid $line-color;
    margin-bottom: 10px;
  }
  .el-image {
    /deep/ .image-slot {
      @include flex-center;
      height: 200px;
      width: 200px;
      font-size: 50px;
      background-color: gary;
    }
  }
  .ul-less {
    @include flex-between;
    li {
      flex: 1;
      padding-left: 20px;
      padding-bottom: 20px;
      &:nth-child(1) {
        padding-left: 0;
      }
    }
  }
  .ul-more {
    @include flex-between;
    flex-wrap: wrap;
    li {
      width: 18%;
      padding-bottom: 20px;
      &:nth-child(1) {
        padding-left: 0;
      }
    }
  }
}
</style>
