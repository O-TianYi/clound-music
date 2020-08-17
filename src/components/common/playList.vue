<template>
  <div class="main">
    <header>标题不部分</header>
    <main class="body">
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
import { changDate, changAuthor } from "../../plugins/common";
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
    };
  },
  methods: {
    //根据id获取列表
    async getPlayListsById(id) {
      let result = await requirePlayListsById({ id: id });
      this.playList = result.data.playlist.tracks;
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
