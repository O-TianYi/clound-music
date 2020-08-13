<template>
  <div class="main">
    <header class="title">{{title}}</header>
    <ul class="lists">
      <li v-for="(item,index) in data" :key="item.id">
        <div class="left">{{index+1>9?index+1:'0'+(index+1)}}</div>
        <div class="right">
          <img :src="item.picUrl" width="100%" height="100%" @click="sendFooter(item)" />
          <div class="info">
            <p>{{item.name}}</p>
            <p>{{changAuthor(item.song.artists)}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { changAuthor } from "../../plugins/common"; //引入多作者拼接转换方法
export default {
  props: ["title", "data"],
  methods: {
    //更改名称
    changAuthor(artists) {
      return changAuthor(artists);
    },
    //播放音乐
    sendFooter(item) {
      this.$bus.$emit("getUrl", item.id);
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
  .lists {
    height: 300px;
    @include flex-general(column, flex-start, flex-start);
    flex-wrap: wrap;
    li {
      @include flex-general(row, flex-start);
      height: 20%;
      width: 50%;
      &:hover {
        background-color: #e3e3e5;
      }
      .left {
        width: 50px;
        text-align: center;
      }
      .right {
        @include flex-general(row, flex-start, center);
        img {
          width: 50px;
          height: 100%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
