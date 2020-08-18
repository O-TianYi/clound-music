<template>
  <div class="main">
    <header>
      <!-- 每日推荐的歌单头部 -->
      <div class="today" v-if="todayrecommend">
        <div class="left">
          <div>
            <span>{{getWeekDay()}}</span>
            <span>{{getDay()}}</span>
          </div>
        </div>
        <div class="right">
          <p>每日歌单推荐</p>
          <p>根据你的音乐口味生成，每天6:00更新</p>
        </div>
      </div>
      <!-- 普通列表的头部 -->
      <div class="other" v-else>
        <div class="left">
          <img :src="titleInfo.coverImgUrl" width="200px" alt />
        </div>
        <div class="right">
          <div class="title">
            <div class="playlist">
              <span>歌单{{titleInfo.name}}</span>
              <span>网易云音乐 {{getDate1(titleInfo.createTime)}}创建</span>
            </div>
            <div class="playtime">歌曲数{{titleInfo.trackCount}}|播放数{{getNumber(titleInfo.playCount)}}</div>
          </div>
          <div class="options">
            <span>播放全部</span>
            <span>收藏({{titleInfo.subscribedCount}})</span>
            <span>分享({{titleInfo.shareCount}})</span>
            <span>下载全部</span>
          </div>
          <div class="info">
            <p>标签：{{titleInfo.tags.join('/')}}</p>
            <p>简介：{{titleInfo.description.split('\n')[0]}}</p>
            <p>{{titleInfo.description.split('\n')[1]}}</p>
          </div>
        </div>
      </div>
    </header>
    <main class="body">
      <!-- 每日推荐歌单主题部分 -->
      <el-table
        :data="todadyRecommendSongs"
        stripe
        style="width: 100%"
        @cell-dblclick="dbClickCell"
        @cell-click="clickCell"
        v-if="todayrecommend"
      >
        <el-table-column prop="index" width="80"></el-table-column>
        <el-table-column prop="name" label="操作" width="100">
          <i class="iconfont icon-aixin"></i>
          <i class="iconfont icon-xiazai"></i>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题"></el-table-column>
        <el-table-column prop="arname" label="歌手"></el-table-column>
        <el-table-column prop="al.name" label="专辑"></el-table-column>
        <el-table-column prop="altime" label="时长" width="100"></el-table-column>
      </el-table>

      <!-- 普通歌单的主体部分 -->
      <el-tabs v-model="activeName" @tab-click="handleClick" v-else>
        <el-tab-pane label="歌曲列表" name="1">
          <el-table
            :data="playList"
            stripe
            style="width: 100%"
            @cell-dblclick="dbClickCell"
            @cell-click="clickCell"
          >
            <el-table-column prop="index" width="80"></el-table-column>
            <el-table-column prop="name" label="操作" width="100">
              <i class="iconfont icon-aixin"></i>
              <i class="iconfont icon-xiazai"></i>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题"></el-table-column>
            <el-table-column prop="arname" label="歌手"></el-table-column>
            <el-table-column prop="al.name" label="专辑"></el-table-column>
            <el-table-column prop="altime" label="时长" width="100"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="2">配置管理</el-tab-pane>
        <el-tab-pane label="收藏着" name="3">收藏着</el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import { requirePlayListsById, requireTodadyRecommendSongs } from "../../api";
import {
  changDate,
  changAuthor,
  getWeekDay,
  getDay,
  changDate1,
  getNumber,
} from "../../plugins/common";
export default {
  created() {
    console.log(this.$route.params.id, this.$route.params.todayrecommend);
  },
  mounted() {
    if (this.$route.params.id) {
      this.getPlayListsById(this.$route.params.id);
    } else {
      this.todayrecommend = this.$route.params.todayrecommend;
      this.getTodadyRecommendSongs();
    }
  },
  data() {
    return {
      todayrecommend: false, //是否为推荐歌单列表
      activeName: "1",
      playList: [], //渲染的歌单
      todadyRecommendSongs: [], //推荐歌单
      titleInfo: {}, //标题信息
    };
  },
  methods: {
    //根据id获取列表
    async getPlayListsById(id) {
      let result = await requirePlayListsById({ id: id });
      this.playList = result.data.playlist.tracks;
      this.titleInfo = result.data.playlist;
      //添加index属性---格式化时间---格式豪华作者名称
      for (let i = 0; i < this.playList.length; i++) {
        //格式化作者名称
        this.playList[i].arname = changAuthor(this.playList[i].ar);
        //格式化时间
        this.playList[i].altime = changDate(this.playList[i].dt);
        //添加index属性
        if (i < 9) {
          this.playList[i].index = "0" + (i + 1);
        } else {
          this.playList[i].index = i + 1;
        }
      }
    },
    //获取每日推荐歌曲
    async getTodadyRecommendSongs() {
      let result = await requireTodadyRecommendSongs({
        cookie: localStorage.getItem("cookie"),
        // uid: localStorage.getItem("uid"),
      });
      this.todadyRecommendSongs = result.data.data.dailySongs;
      //添加index属性---格式化时间---格式豪华作者名称
      for (let i = 0; i < this.todadyRecommendSongs.length; i++) {
        //格式化作者名称
        this.todadyRecommendSongs[i].arname = changAuthor(
          this.todadyRecommendSongs[i].ar
        );
        //格式化时间
        this.todadyRecommendSongs[i].altime = changDate(
          this.todadyRecommendSongs[i].dt
        );
        //添加index属性
        if (i < 9) {
          this.todadyRecommendSongs[i].index = "0" + (i + 1);
        } else {
          this.todadyRecommendSongs[i].index = i + 1;
        }
      }
      console.log("推荐歌曲", this.todadyRecommendSongs);
    },

    //获取推荐的星期和具体天
    getDay() {
      return getDay();
    },
    getWeekDay() {
      return getWeekDay();
    },
    //将时间格式化年月日
    getDate1(date) {
      return changDate1(date);
    },
    //单位换算
    getNumber(number) {
      return getNumber(number);
    },

    //点击对应的一个tab
    handleClick(tab) {
      console.log(this.activeName, tab.name);
    },
    //双击了一栏
    dbClickCell(row) {
      console.log(row);
    },
    //单击了一栏
    clickCell(row) {
      this.$bus.$emit("getUrl", row.id);
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  .today {
    @include flex-between;
    align-items: flex-start;
    .left {
      div {
        @include flex-general(column, center, center);
        margin-bottom: 10px;
        padding: 10px 20px 0 20px;
        border: 1px solid black;
        span {
          &:nth-child(2) {
            font-size: 70px;
            color: $theme-color;
          }
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
    }
  }
  .other {
    @include flex-between;
    align-items: flex-start;
    .left {
    }
    .right {
      padding: 10px 30px;
      flex: 1;
      @include flex-general(column, flex-start, flex-start);
      .title {
        flex: 1;
        width: 100%;
        @include flex-between;
        align-items: flex-start;
        .playlist {
          @include flex-general(column, flex-start, flex-start);
          font-size: 20px;
        }
        .playtime {
          flex: 1;
          text-align: right;
        }
      }
      .options {
        margin: 30px 0;
        span {
          margin-right: 10px;
          padding: 2px;
          border: 1px solid black;
        }
      }

      .info {
      }
    }
  }
}
.body {
  /deep/ .el-tabs__nav-scroll {
    justify-content: flex-start;
  }
  /deep/ .cell {
    i {
      padding: 5px;
      font-size: 18px;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
