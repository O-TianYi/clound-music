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
            <!-- 热门50首 -->
            <li>
              <div class="left">
                <img src alt width="200px" height="200px" />
                <p>2020-01-01</p>
              </div>
              <div class="right">
                <p>
                  <span>热门50首</span>
                  <span>
                    <i class="iconfont icon-aixin"></i>
                    <i class="iconfont icon-xiazai"></i>
                  </span>
                </p>
                <el-table
                  :data="hotSongs"
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
            <!-- 专辑内容 -->
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
        <el-tab-pane label="歌手详情" name="3">
          <ul class="singer-desc">
            <li>
              <h5>歌手简介</h5>
              <p>{{singerDesc.briefDesc}}</p>
            </li>
            <li v-for="(item,index) in singerDesc.introduction" :key="index">
              <h5>{{item.ti}}</h5>
              <ul v-if="item.txtlists" class="txt-lists">
                <li v-for="(item,index) in item.txtlists" :key="index">
                  <p>{{item}}</p>
                </li>
              </ul>
              <p v-else>{{item.txt}}</p>
            </li>
          </ul>
        </el-tab-pane>
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
  requireSingerHotSongsById,
  requireSingerDescById,
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
    this.getHotSongs(this.$route.params.id);
    this.getSingerDesc(this.$route.params.id);
  },
  data() {
    return {
      activeName: "1",
      singerInfo: {
        artist: {
          picUrl: "",
        },
        hotAlbums: [],
      }, //专辑歌单列表
      singerMV: [], //获取歌手 的所有mv
      singerDesc: [], //歌手详细信息
      hotSongs: [], //热门50首歌曲
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
    //获取歌手热门前50首歌曲
    async getHotSongs(id) {
      let result = await requireSingerHotSongsById({ id: id });
      this.hotSongs = result.data.songs;
      let i = 0;
      this.hotSongs.forEach((val) => {
        i++;
        if (i >= 10) {
          val.index = i;
        } else {
          val.index = "0" + i;
        }
        val.time = changDate(val.dt);
      });
    },
    //获取歌手详细信息
    async getSingerDesc(id) {
      let result = await requireSingerDescById({ id: id });
      this.singerDesc = result.data;
      //切割字符串
      let tempStr1 = this.singerDesc.introduction[1].txt.split("\n");
      this.singerDesc.introduction[1].txtlists = tempStr1;
      let tempStr2 = this.singerDesc.introduction[2].txt.split("\n");
      this.singerDesc.introduction[2].txtlists = tempStr2;
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
      .singer-desc {
        h5 {
          margin-bottom: 10px;
        }
        li {
          @include flex-general(column, flex-start, flex-start);
          p {
            font-size: 16px;
            font-weight: 300;
            line-height: 30px;
            text-align: justify;
            text-indent: 2em;
          }
          .txt-lists {
            // padding: 10px;
            // padding-left: 30px;
            li {
              @include flex-general(column, flex-start, flex-start);
              padding: 5px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
