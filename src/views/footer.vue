<template>
  <div class="main">
    <div class="left">
      <i class="iconfont icon-jiantou_zuo"></i>
      <i class="iconfont icon-zanting"></i>
      <i class="iconfont icon-jiantou_you"></i>
    </div>
    <div class="right">
      <!-- <audio src="../../public/周杰伦 - 退后.flac" controls></audio> -->
      <!-- <audio
        src="http://m7.music.126.net/20200810234128/693b083e5050797e96b296dec7a0eb18/ymusic/3e0c/1737/c5ba/e73e7c5108199f183889dffb5c7f1944.mp3"
        controls
      ></audio>-->
      <audio :src="songUrl" controls></audio>
      <!-- <audio>
        <source src type="audio/mp3" />
      </audio>-->
      <!-- <div class="volumn"></div>
      <div class="way"></div>
      <div class="sound-quality"></div>
      <div class="lyrics"></div>-->
    </div>
  </div>
</template>

<script>
import { requireUrlById } from "../api";
export default {
  created() {
    this.$bus.$on("getUrl", (id) => {
      console.log("传递的id", id);
      //获取播放音乐的id
      this.getUrl(id);
    });
  },
  data() {
    return {
      songUrl: "", //需要播放的音乐mp3地址
    };
  },
  methods: {
    //根据音乐id获取mp3地址
    async getUrl(id) {
      let result = await requireUrlById({
        id: id,
      });
      this.songUrl = result.data.data[0].url;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex-between;
  width: 100%;
  height: 50px;
  padding-bottom: 20px;
  background-color: #f6f6f8;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  .left {
    width: 200px;
    @include flex-center;
    i {
      color: white;
      @include flex-center;
      font-size: 30px;
      background-color: red;
      border-radius: 50%;
    }
    i:nth-child(odd) {
      width: 40px;
      height: 40px;
    }
    i:nth-child(even) {
      margin: 0 10px;
      width: 50px;
      height: 50px;
    }
  }
  .right {
    flex: 1;
  }
}
</style>
