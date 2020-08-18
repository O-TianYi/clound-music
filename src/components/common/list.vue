<template>
  <div class="main">
    <header class="title">{{title}}</header>
    <ul :class="data.length>5?'ul-more':'ul-less'">
      <li v-show="todayrecommend" class="today-recommend" @click="goTodayRecommend">
        <div>
          <span>{{getWeekDay()}}</span>
          <span>{{getDay()}}</span>
        </div>
        <span>每日歌曲推荐</span>
      </li>
      <li v-for="(item,index) in data" :key="index" @click="goPlayList(item)">
        <div class="img">
          <el-image :src="item.picUrl" lazy fit="fill">
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span v-if="item.playCount" class="play-count">
            <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
            {{getNumber(item.playCount)}}
          </span>
          <span v-else class="video">
            <i class="iconfont icon-video" style="font-size: 25px;font-weight: bolder;"></i>
          </span>
        </div>

        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDay, getWeekDay, getNumber } from "../../plugins/common";
export default {
  props: ["title", "data", "todayrecommend"],
  methods: {
    //前往每个li的歌曲列表界面
    goPlayList(item) {
      this.$router.push({ name: "playlists", params: { id: item.id } }); //params+name,,query都可
    },
    //前往推荐歌单
    goTodayRecommend() {
      this.$router.push({
        name: "playlists",
        params: { todayrecommend: true },
      });
    },

    //获取当前时间，分离出星期和天数
    getDay() {
      return getDay();
    },
    getWeekDay() {
      return getWeekDay();
    },
    getNumber(number) {
      return getNumber(number);
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
    align-items: flex-start;
    li {
      flex: 1;
      padding-left: 20px;
      padding-bottom: 20px;
      &:nth-child(2) {
        padding: 0;
      }
      .img {
        position: relative;
        .video {
          background-color: rgba(0, 0, 0, 0.2);
          position: absolute;
          left: 0;
          top: 0;
          color: white;
          margin: 5px;
        }
      }
    }
  }
  .ul-more {
    @include flex-between;
    align-items: flex-start;
    flex-wrap: wrap;
    li {
      width: 18%;
      padding-bottom: 20px;
      .img {
        width: 100%;
        position: relative;
        .play-count {
          background-color: rgba(0, 0, 0, 0.3);
          position: absolute;
          right: 0;
          top: 0;
          color: white;
          margin: 5px;
        }
      }
      &:nth-child(1) {
        padding-left: 0;
      }
      &.today-recommend {
        width: 18%;
        div {
          @include flex-general(column, center, center);
          margin-bottom: 10px;
          padding-top: 10px;
          border: 1px solid black;
          span {
            &:nth-child(2) {
              font-size: 70px;
              color: $theme-color;
            }
          }
        }
      }
    }
  }
}
</style>
