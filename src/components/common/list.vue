<template>
  <div class="main">
    <header class="title">{{title}}</header>
    <ul :class="data.length>5?'ul-more':'ul-less'">
      <li v-for="(item,index) in data" :key="index">
        <el-image :src="item.picUrl" lazy fit="fill">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["title", "data"],
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
