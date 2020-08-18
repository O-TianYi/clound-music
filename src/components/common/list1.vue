<template>
  <div class="main">
    <header class="title">{{title}}</header>
    <ul class="lists">
      <li v-for="(item,index) in data" :key="item.id">
        <div class="left">{{index+1>9?index+1:'0'+(index+1)}}</div>
        <div class="right">
          <div class="image">
            <img :src="item.picUrl" width="100%" height="100%" @click="sendFooter(item)" />
            <span class="video" @click="play=!play">
              <i class="iconfont icon-ziyuan" v-if="play"></i>
              <i class="iconfont icon-zanting3" v-else></i>
            </span>
          </div>

          <div class="info">
            <p>{{item.name}}{{item.song.alias.length>0?'('+item.song.alias.join('/')+')':''}}</p>
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
  data() {
    return {
      play: false,
    };
  },
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
    height: 320px;
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
        .image {
          width: 50px;
          position: relative;
          background-color: red;
          margin-right: 10px;
          .video {
            @include flex-center;
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            background-color: #8f8a8a;
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
