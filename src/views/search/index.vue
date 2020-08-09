<template>
  <header class="main">
    <div class="logo">
      <img src="../../assets/img/content/logo.svg" alt="网易云logo" />
      网易云音乐
    </div>
    <div class="search-input">
      <div class="btn">
        <i class="iconfont icon-jiantou_zuo"></i>
        <i class="iconfont icon-jiantou_you"></i>
      </div>
      <div class="search">
        <el-input
          placeholder="搜索音乐，视频，歌词，电台"
          class="input-with-select"
          suffix-icon="el-icon-search"
          size="mini"
          v-model="input"
        ></el-input>
      </div>
    </div>
    <div class="other">
      <div class="user">
        <el-avatar
          size="medium"
          src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        ></el-avatar>
        <span class="username">用户名称用户名称用户名称用户名称</span>
        <i class="iconfont icon-xiala"></i>
      </div>
      <span class="vip">开通VIP</span>
      <i class="iconfont icon-pifu"></i>
      <i class="iconfont icon-youjian"></i>
      <i class="iconfont icon-shezhi"></i>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  font-size: $search-font-size;
  background-color: $theme-color;
  @include flex-between;
  height: $search-height;
  padding: $search-padding;
  color: white;
  .logo {
    @include flex-general(row, flex-start, center);
    color: $logo-font-color;
    width: $search-logo-width;
    font-size: 20px;
  }
  .search-input {
    flex: 1;
    margin: 0 50px 0 50px;
    @include flex-general(row, center, center);
    .btn {
      margin-right: 20px;
      i {
        @include i-inline-block(30px, 28px);
        border: 0.1px solid #a82828;
        &:nth-child(1) {
          border-radius: 5px 0 0 5px;
        }
        &:nth-child(2) {
          border-radius: 0 5px 5px 0;
        }
      }
    }
    .search {
      /deep/ .el-input--mini {
        min-width: 280px;
      }
      /deep/ .el-input__inner {
        padding: 0 0 0 5px;
        color: white;
        border-radius: 30px;
        border: 1px solid #a82828;
        background-color: #a82828;
      }
      /deep/ .el-input__inner::-webkit-input-placeholder {
        color: #c77373;
        font-size: 14px;
      }
      /deep/ .el-input__inner:focus {
        color: white;
      }
      /deep/ .el-input__icon {
        color: #c77373;
      }
    }
  }
  .other {
    color: #e9afaf;
    @include flex-between;
    width: $search-other-width;
    .user {
      @include flex-between;
      /deep/ .el-avatar {
        transform: scale(0.8);
      }
      .username {
        width: 80px;
        @include text-ellipsis;
      }
      i {
        @include i-inline-block(30px, 30px);
      }
    }
    .vip {
      min-width: 50px;
    }
    .icon-xiala {
      @include i-inline-block(40px, 30px);
      position: relative;
      top: 2px;
    }
    .icon-youjian {
      font-size: 20px;
    }
    .icon-shezhi {
      font-size: 18px;
    }
  }
}
</style>
