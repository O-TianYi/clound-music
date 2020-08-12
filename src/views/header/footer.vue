<template>
  <div class="main">
    <div class="left">
      <span>
        <i class="iconfont icon-shangyishou2"></i>
      </span>

      <span @click="stopMusic">
        <i class="iconfont icon-zanting2" v-if="!stop"></i>
        <i class="iconfont icon-zanting3" v-else></i>
      </span>
      <span>
        <i class="iconfont icon-xiayishou2"></i>
      </span>
    </div>
    <div class="right">
      <audio ref="audio" src @timeupdate="updateTime" @canplay="getDuration" />
      <div class="audio-style">
        <span class="current-time">{{currentTime}}</span>
        <span class="music">
          <el-progress :percentage="music" :show-text="false"></el-progress>
        </span>
        <span class="end-time">{{duration}}</span>
        <span class="muted" @click="mutedControl">
          <i class="iconfont icon-yinliang" v-if="!muted"></i>
          <i class="iconfont icon-jingyin" v-else></i>
        </span>
        <span class="volume" @click="volumeControl">
          <el-progress :percentage="volume" :show-text="false"></el-progress>
        </span>
        <span class="loop" @click="loop=!loop">
          <i class="iconfont icon-liebiaoxunhuan" v-if="loop"></i>
          <i class="iconfont icon-danquxunhuan" v-else></i>
        </span>
      </div>
      <!-- <div class="volumn">---{{muted}}</div>
      <div class="way">{{loop}}</div>
      <div class="sound-quality"></div>
      <div class="lyrics">{{lyrics}}</div>-->
    </div>
  </div>
</template>

<script>
import { requireUrlById } from "../../api";
export default {
  created() {},
  mounted() {
    if (localStorage.getItem("lastestUrl")) {
      this.stop = true;
      this.$refs.audio.currentTime = localStorage.getItem("lastestTime");
      this.music = localStorage.getItem("musicTime") - 0;
      console.log(localStorage.getItem("lastestTime"), this.music);
      this.$refs.audio.src = localStorage.getItem("lastestUrl");
    }

    this.$bus.$on("getUrl", (id) => {
      console.log("传递的id", id);
      //获取播放音乐的id
      this.getUrl(id);
    });
  },
  beforeDestroy() {
    localStorage.setItem("musicTime", this.music);
    localStorage.setItem("lastestTime", this.$refs.audio.currentTime);
  },
  data() {
    return {
      stop: true, //是否暂停
      songUrl: "", //需要播放的音乐mp3地址
      music: 0,
      currentTime: "00:00", //播放的时间
      duration: "00:00", //总时长
      volume: 50, //音量
      tempVolume: 0, //暂存的音量
      loop: false, //是否循环
      muted: false, //是否静音
      lyrics: "", //歌词
    };
  },
  methods: {
    //获取所有初始状态
    init() {
      this.stop = true;
      this.music = 0;
      this.volume = this.$refs.audio.volume;
      this.loop = this.$refs.audio.loop;
      this.muted = this.$refs.audio.muted;
    },
    //处理时间的工具类
    getTime(t) {
      let time = Math.floor(t);
      //处理时间
      //分钟
      let m = parseInt(time / 60); //取整
      if (m < 10) {
        m = "0" + m;
      }
      //秒
      let s = Math.round(time % 60);
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },

    //根据音乐id获取mp3地址
    async getUrl(id) {
      let result = await requireUrlById({
        id: id,
      });
      if (result.data.data[0].url && this.$refs.audio) {
        this.$refs.audio.src = result.data.data[0].url;
      }
      this.init();
    },
    //播放时候获取播放时间
    updateTime(e) {
      this.currentTime = this.getTime(e.target.currentTime); //获取audio当前播放时间
      if (!isNaN(e.target.duration)) {
        this.music = Math.floor(
          (e.target.currentTime / e.target.duration) * 100 - 0
        );
        if (this.music == 100) {
          this.stop = true;
        }
      }
    },
    //获取总时长---url资源加载完成
    getDuration() {
      this.duration = this.getTime(this.$refs.audio.duration);
      // this.stop = false;
      this.muted = false;
      //存储为本地下次直接加载
      localStorage.setItem("lastestUrl", this.$refs.audio.currentSrc);
    },
    //停止和播放音乐
    stopMusic() {
      if (!this.$refs.audio.currentSrc) {
        alert("请选择歌曲");
        this.stop = false;
        return;
      }
      this.stop = !this.stop;
      if (!this.stop && this.$refs.audio.paused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    //静音控制
    mutedControl() {
      this.muted = !this.muted;
      this.$refs.audio.muted = this.muted;
      if (this.$refs.audio.muted) {
        this.tempVolume = this.volume;
        this.volume = 0;
        this.$refs.audio.volume = 0;
      } else {
        this.volume = this.tempVolume;
        this.$refs.audio.volume = this.volume;
      }
    },
    //调教音量
    volumeControl() {
      if (!this.muted) {
        if (this.volume >= 100) {
          this.volume -= 10;
        } else if (this.volume >= 0 && this.volume < 100) {
          this.volume += 10;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex-between;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 5px;
  background-color: #f6f6f8;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  .left {
    width: 200px;
    padding: 0 20px;
    @include flex-center;
    span {
      flex: 1;
      @include flex-center;
      height: 46px;
      color: white;
      background-color: red;
      border-radius: 50%;
      &:hover {
        background-color: #c62f2f;
      }
      &:nth-child(2) {
        margin: 0 10px;
        transform: scale(1.2);
      }
      i {
        font-size: 25px;
      }
    }
  }
  .right {
    flex: 1;
    @include flex-between;
    .audio-style {
      @include flex-between;
      .current-time,
      .end-time {
        margin-right: 10px;
      }
      .music {
        /deep/ .el-progress {
          width: 300px;
        }
      }
      .end-time {
        margin-left: 10px;
      }
      .muted {
        width: 30px;
      }
      .volume {
        /deep/ .el-progress {
          width: 100px;
        }
      }
      .loop {
        margin-left: 10px;
        i {
          font-size: 16px;
          font-weight: 900;
        }
      }
    }
  }
}
</style>
