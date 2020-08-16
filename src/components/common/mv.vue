
<template>
  <div class="main">
    <header>
      <i class="iconfont icon-fanhui" @click="$router.replace({name:'singers'})"></i>
      <span>MV</span>
      <span>{{mvinfo.data.name}}</span>
      <span>{{changAuthor(mvinfo.data.artists)}}</span>
    </header>
    <!-- <aside>mv介绍部分</aside> -->
    <main>
      <div class="video">
        <video
          src="http://vodkgeyttp8.vod.126.net/cloudmusic/17ac/core/93cf/855746d5d3ab09904a939ae4eaf0dfb6.mp4?wsSecret=97dc1c20f200288e662d53c555958733&wsTime=1597415399"
          height="414"
          width="720"
          controls
        >当前浏览器不止video标签，请更新浏览器或者更换浏览器</video>
      </div>
      <div class="options">
        <div class="praise">赞</div>
        <div class="collection">收藏</div>
        <div class="share">分享</div>
        <div class="download">下载MV</div>
      </div>
      <Comments />
    </main>
  </div>
</template>

<script>
import { requireMvUrlById, requireMvInfoById } from "../../api";
import { changAuthor } from "../../plugins/common";
import Comments from "./comments";
export default {
  components: {
    Comments,
  },
  mounted() {
    console.log("接收的mvid为", this.$route.params.id);
    this.getMvUrlById(this.$route.params.id);
    this.getMvInfoById(this.$route.params.id);
  },
  data() {
    return {
      mvinfo: {
        data: {
          name: "",
          artists: [],
        },
      }, //mv的详细信息
    };
  },
  methods: {
    //根据mvid获取mv地址
    async getMvUrlById(id) {
      let result = await requireMvUrlById({ id: id });
      console.log(result.data.data.url);
    },
    //根据mvid获取mv具体信息
    async getMvInfoById(id) {
      let result = await requireMvInfoById({ mvid: id });
      this.mvinfo = result.data;
      console.log(result.data);
    },

    //格式化名称
    changAuthor(artists) {
      return changAuthor(artists);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
  header {
    padding: 10px;
    @include flex-general(row, flex-start, flex-start);
    font-size: 24px;
    i {
      padding: 0 10px;
      font-size: 24px;
    }
    span {
      &:nth-of-type(1) {
        display: block;
        box-sizing: border-box;
        padding: 3px;
        border: 1px solid red;
        color: red;
        font-size: 18px;
        margin-right: 10px;
      }
      &:nth-of-type(3) {
        margin-left: 10px;
        font-size: 16px;
        position: relative;
        transform: translateY(10px);
      }
    }
  }
  main {
    .video {
    }
    .options {
      @include flex-general(row, flex-start, center);
      div {
        @include flex-center;
        width: 100px;
        padding: 3px 8px;
        border: 1px solid black;
        margin-right: 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>
