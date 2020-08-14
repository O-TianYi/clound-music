<template>
  <div class="main">
    <header>
      <div class="image">
        <img :src="singerInfo.artist.picUrl" alt height="300px" v-if="singerInfo" />
      </div>
      <div class="info">
        <p>
          <span class="left">
            <span class="babel">歌手</span>
            {{singerInfo.artist.name}}
          </span>
          <span class="right">收藏</span>
        </p>
        <p>
          <span>单曲数：{{singerInfo.artist.musicSize}}</span>
          <span>专辑数：{{singerInfo.hotAlbums.length}}</span>
          <span>MV数：{{singerMV.length}}</span>
        </p>
      </div>
    </header>
    <main class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专辑" name="1">
          <ul>
            <li v-for="(item,index) in singerInfo.hotAlbums" :key="index">
              <div class="left">
                <img :src="item.blurPicUrl" alt width="200px" height="200px" />
                <p>2020-01-01</p>
              </div>
              <div class="right">
                <p>
                  <span>{{item.name}}</span>
                  <span>
                    <i class="iconfont icon-aixin"></i>
                    <i class="iconfont icon-xiazai"></i>
                  </span>
                </p>
                <el-table
                  :data="item.songs"
                  stripe
                  style="width: 100%"
                  :show-header="false"
                  @cell-dblclick="dbClickCell"
                >
                  <el-table-column prop="index" width="100"></el-table-column>
                  <el-table-column width="150">
                    <i class="iconfont icon-aixin"></i>
                    <i class="iconfont icon-xiazai"></i>
                  </el-table-column>
                  <el-table-column prop="name"></el-table-column>
                  <el-table-column prop="time" width="100" align="right"></el-table-column>
                </el-table>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="MV" name="2">
          <mvList :data="singerMV" />
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="3">歌手详情</el-tab-pane>
        <el-tab-pane label="相似歌手" name="4">相似歌手</el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import {
  requireSingerPlayLists,
  requireSingerSongs,
  requireSingerMV,
} from "../../api";
import { changDate } from "../../plugins/common";
export default {
  components: {
    mvList: (resolve) => {
      require(["../common/mvList"], resolve);
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getSingerPlayLists(this.$route.params.id);
    this.getSingerMV(this.$route.params.id);
  },
  data() {
    return {
      activeName: "1",
      singerInfo: {}, //专辑歌单列表
      singerMV: [], //获取歌手 的所有mv
    };
  },
  methods: {
    //根据id获取歌手专辑
    async getSingerPlayLists(id) {
      let result = await requireSingerPlayLists({
        id: id,
      });
      this.singerInfo = result.data;
      if (this.singerInfo.hotAlbums) {
        this.singerInfo.hotAlbums.forEach((val) => {
          //获取每个专辑的全部歌曲
          requireSingerSongs({
            id: val.id,
          }).then((result) => {
            val.songs = result.data.songs;
            //格式化时间和添加index
            for (let i = 0; i < val.songs.length; i++) {
              if (i < 9) {
                val.songs[i].index = "0" + (i + 1);
              } else {
                val.songs[i].index = i + 1;
              }
              val.songs[i].time = changDate(val.songs[i].dt);
              if (val.songs[i].alia) {
                val.songs[i].name = val.songs[i].name + [...val.songs[i].alia];
              }
            }
          });
        });
      }
    },
    //获取歌手所有mv---参数为歌手id
    async getSingerMV(id) {
      let result = await requireSingerMV({ id: id, limit: 100 });
      this.singerMV = result.data.mvs;
    },

    //点击对应的菜单切换
    handleClick(tab) {
      console.log(tab.name);
    },
    //双击歌单列表
    dbClickCell(row) {
      console.log("双击了", row.id);
      this.$bus.$emit("getUrl", row.id);
    },
    ClickCell(row) {
      console.log("单击歌单列表", row.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  header {
    @include flex-general(row, flex-start, flex-start);
    padding: 10px 20px;
    .image {
      margin-right: 20px;
    }
    .info {
      flex: 1;
      p:nth-child(1) {
        @include flex-between;
        align-items: flex-start;
        margin-bottom: 30px;
        .left {
          font-size: 25px;
          .babel {
            display: inline-block;
            background-color: #c62f2f;
            padding: 3px 10px;
            border-radius: 3px;
            color: white;
            font-size: 14px;
            transform: translateY(-5px);
          }
        }
        .right {
          border: 1px solid black;
          padding: 5px;
          border-radius: 3px;
        }
      }
      p:nth-child(2) {
        @include flex-general(column, flex-start, flex-start);
      }
    }
  }
  .content {
    .el-tabs {
      /deep/ .el-tabs__nav-scroll {
        justify-content: left;
      }
      ul {
        width: 100%;
        @include flex-general(column, flex-start, flex-start);
        li {
          width: 100%;
          padding-bottom: 50px;
          @include flex-general(row, center, flex-start);
          .left {
            padding: 0 50px 0 0;
          }
          .right {
            width: 60%;
            p {
              @include flex-between;
            }
            /deep/ .el-table__body {
              /deep/ td:nth-child(3) {
                /deep/ .cell {
                  @include text-ellipsis;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
