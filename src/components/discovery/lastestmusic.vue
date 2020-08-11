<template>
  <div class="main">
    <header>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="left">
        <el-tab-pane label="全部" name="1"></el-tab-pane>
        <el-tab-pane label="华语" name="2"></el-tab-pane>
        <el-tab-pane label="欧美" name="3"></el-tab-pane>
        <el-tab-pane label="韩国" name="4"></el-tab-pane>
        <el-tab-pane label="日本" name="5"></el-tab-pane>
      </el-tabs>
    </header>

    <main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="header">
            <div class="header">
              <span>播放全部</span>
              <div class="collection" type="text">收藏全部</div>
            </div>
          </div>
        </div>
        <ul class="lists">
          <li v-for="(item,index) in lastestSongs" :key="index" @click="selectMusic(item.id)">
            <div class="rank">{{index+1>9?index+1:'0'+(index+1)}}</div>
            <div class="sing-info">
              <el-image
                :src="item.album.picUrl"
                lazy
                fit="fill"
                style="width: 60px; height: 60px;margin-right: 10px;padding: 0;"
              >
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <span>{{item.name}}{{item.alias.length!==0?`（${item.alias[0]}）`:''}}</span>
            </div>
            <div class="singer-name">{{changAuthor(item.artists)}}</div>
            <div class="form">{{item.name}}{{item.alias.length!==0?`（${item.alias[0]}）`:''}}</div>
            <div class="time">{{changDate(item.mMusic.playTime)}}</div>
          </li>
        </ul>
      </el-card>
    </main>
  </div>
</template>

<script>
import { requireLastestSongs } from "../../api/index";
import { changAuthor, changDate } from "../../plugins/common"; //引入多作者拼接转换方法
export default {
  mounted() {
    this.getLastestSongs();
  },
  data() {
    return {
      activeName: "1",
      lastestSongs: [], //最新歌曲100首
    };
  },
  methods: {
    //根据类型获取最新的数据
    async getLastestSongs() {
      let result = await requireLastestSongs();
      this.lastestSongs = result.data.data;
    },

    //获取不同的路由跳转
    handleClick(tab) {
      if (this.activeName == tab.name) return;
      console.log(tab.name);
    },
    //时间戳转换为时间
    changDate(date) {
      return changDate(date);
    },
    //获取作者
    changAuthor(artists) {
      return changAuthor(artists);
    },
    //点击音乐进行播放
    selectMusic(id) {
      console.log(id);
      //发送给footer实现播放功能
      this.$bus.$emit("getUrl", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  header {
    /deep/ .el-tabs__nav-scroll {
      justify-content: flex-start;
    }
    /deep/ .el-tabs__item {
      padding: 0;
      width: 60px;
    }
    /deep/ .el-tabs__active-bar {
      left: 10px;
      width: 40px !important;
    }
  }
  main {
    .el-card {
      /deep/ .el-card__body {
        padding: 0;
      }
      .header {
        width: 100%;
        font-size: 14px;
        @include flex-between;
        .collection {
          box-sizing: border-box;
          padding: 5px;
          border: 0.5px solid #e1e1e2;
          border-radius: 5px;
        }
      }

      .lists {
        @include flex-general(column, flex-start);
        li {
          padding: 0 20px;
          text-align: left;
          @include flex-between;
          width: 100%;
          height: 80px;
          line-height: 80px;
          &:nth-child(odd) {
            background-color: #f5f5f7;
          }
          &:hover {
            background-color: #e3e3e5;
          }
          .rank {
            width: 40px;
          }
          .sing-info {
            @include flex-general(row, flex-start, center);
            @include text-ellipsis;
            flex: 1;
            /deep/ .el-image {
              width: 60px;
              height: 60px;
            }
            /deep/ .image-slot {
              @include flex-center;
              width: 100%;
              height: 60px;
              font-size: 30px;
            }
            span {
              @include text-ellipsis;
              flex: 1;
            }
          }
          .singer-name {
            @include text-ellipsis;
            width: 300px;
            padding: 0 30px;
          }
          .form {
            @include text-ellipsis;
            flex: 1;
          }
          .time {
            width: 80px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
