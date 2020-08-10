<template>
  <div class="main">
    <el-carousel type="card" height="200px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <el-image :src="item.imageUrl" lazy fit="fill">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="content">
      <List :data="recommend" title="推荐音乐" />
      <List :data="exclusives" title="独家放送" />
      <List1 :data="newSongs" title="每日最新" />
    </div>

    <footer>
      <p>现在可以根据个人喜好，自由调整首页栏目顺序啦</p>
      <p>
        <span class="ajust">调整栏目顺序</span>
      </p>
    </footer>
  </div>
</template>

<script>
import List from "../common/list";
import List1 from "../common/list1";
import {
  requireBanners,
  requireRecommmend,
  requirePrivatecontent,
  requireNewSongs,
} from "../../api/index";
export default {
  components: {
    List,
    List1,
  },
  mounted() {
    this.getBanners();
    this.getRecommmend();
    this.getPrivatecontent();
    this.getNewSongs();
  },
  data() {
    return {
      banners: [], //轮播图数据
      recommend: [], //推荐歌曲
      exclusives: [], //独家放送
      newSongs: [], //每日新歌
    };
  },
  methods: {
    //获取轮播图
    async getBanners() {
      let result = await requireBanners();
      this.banners = result.data.banners;
    },
    //获取推荐歌单
    async getRecommmend() {
      let result = await requireRecommmend({ limit: 10 });
      this.recommend = result.data.result;
    },
    //独家放送
    async getPrivatecontent() {
      let result = await requirePrivatecontent();
      this.exclusives = result.data.result;
    },
    //获取每日新歌
    async getNewSongs() {
      let result = await requireNewSongs();
      this.newSongs = result.data.result;
      console.log(this.newSongs);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  footer {
    margin-top: 30px;
    border-top: 1px solid $line-color;
    height: 80px;
    // position: relative;
    padding-top: 10px;
    p {
      font-size: 14px;
      @include flex-center;
      &:nth-child(1) {
        margin-bottom: 10px;
        color: #a48888;
      }
    }
    .ajust {
      border: 0.5px solid $theme-color;
      box-sizing: content-box;
      display: block;
      padding: 5px 15px 5px 15px;
      text-align: center;
      width: 100px;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
    }
  }
}
</style>
