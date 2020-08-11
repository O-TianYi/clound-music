<template>
  <div class="main">
    <header>
      <span @click="$router.push({name:'home',params:{'isSetting': false}})">
        <i class="iconfont icon-jiantou_zuo"></i>设置
      </span>
    </header>
    <main>
      <!-- <div class="left"></div> -->
      <div class="right">
        <!-- 账号 -->
        <div class="account">
          <p>账号</p>
          <p>
            <i class="iconfont icon-jiantou_zuo"></i>
            <i class="iconfont icon-jiantou_zuo"></i>
            <i class="iconfont icon-jiantou_zuo"></i>
            <span>绑定账号></span>
          </p>
          <p>
            <span>修改个人信息</span>
            <span>寻找并邀请好友</span>
          </p>
        </div>
        <!-- 常规 -->
        <div class="conventionl">
          <p>常规</p>
          <p>
            <span>字体选择：</span>如果字体显示不清晰，请在控制面板——字体设置中启用Clear Type设置
          </p>
          <p>下拉按钮</p>
        </div>
        <!-- 播放 -->
        <div class="play">
          <p>播放</p>
        </div>
        <!-- 消息与隐私 -->
        <div class="message">
          <p>消息与隐私</p>
        </div>
        <!-- 快捷键 -->
        <div class="shortcuts">
          <p>快捷键</p>
        </div>
        <!-- 下载设置 -->
        <div class="download-settings">
          <p>下载设置</p>
        </div>
        <!-- 歌词 -->
        <div class="lyrics">
          <p>歌词</p>
        </div>
        <!-- 工具 -->
        <div class="tools">
          <p>工具</p>
        </div>
        <!-- 关于网易云音乐 -->
        <div class="about">
          <p>关于网易云音乐</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 50px;
  header {
    padding: 20px;
    border-bottom: 1px solid #e1e1e2;
    margin-bottom: 10px;
    cursor: pointer;
  }
  main {
    // .left{}
    .right {
      @include flex-general(column, flex-start, flex-start);
      padding-left: 30px;
      .account,
      .conventionl,
      .play,
      .message,
      .shortcuts,
      .download-settings,
      .lyrics,
      .tools,
      .about {
        width: 100%;
        @include flex-general(column, space-between, flex-start);
        padding: 20px 0;
        border-bottom: 1px solid #e1e1e2;
        p:nth-child(1) {
          font-size: 20px;
          font-weight: 400;
        }
        p {
          margin-bottom: 10px;
        }
      }

      .account {
      }
      .conventionl {
      }
      .play {
      }
      .message {
      }
      .shortcuts {
      }
      .download-settings {
      }
      .lyrics {
      }
      .tools {
      }
      .about {
      }
    }
  }
}
</style>
