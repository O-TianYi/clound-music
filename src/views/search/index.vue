<template>
  <header class="main">
    <div class="logo">
      <img src="../../assets/img/content/logo.svg" alt="网易云logo" />
      <span>网易云音乐</span>
    </div>
    <div class="search-input">
      <div class="btn">
        <i class="iconfont icon-jiantou_zuo"></i>
        <i class="iconfont icon-jiantou_you"></i>
      </div>
      <div class="search">
        <el-input
          :placeholder="placeholder"
          class="input-with-select"
          @blur="inputBlur"
          @focus="inputFocus"
          suffix-icon="el-icon-search"
          size="mini"
          v-model="input"
        ></el-input>
        <span class="triangle" v-if="isFocus"></span>
        <div class="popper" v-if="isFocus">
          <p class="babel">热搜榜</p>
          <ul>
            <li
              v-for="(item,index) in hotSearchLists"
              :key="index"
              @click.prevent="getSearch(item.searchWord)"
            >
              <div :class="['left',index<=2?'red':'']">{{index+1}}</div>
              <div class="right">
                <p>
                  <span :class="['key',index<=2?'bolder':'']">{{item.searchWord}}</span>
                  <span class="score">{{item.score}}</span>
                  <span class="img">
                    <img
                      :src="item.iconUrl"
                      alt
                      width="25px"
                      height="100%"
                      v-if="item.iconType===1"
                    />
                    <img :src="item.iconUrl" alt width="12px" height="100%" v-else />
                  </span>
                </p>
                <p class="content">{{item.content}}</p>
              </div>
            </li>
          </ul>
        </div>
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
      <i class="iconfont icon-youjian">
        <span class="info">3</span>
      </i>
      <i class="iconfont icon-shezhi"></i>
    </div>
  </header>
</template>

<script>
import {
  requireSearchByKeyWords,
  requireHotDetail,
  requireSearchSuggest,
} from "../../api";
export default {
  mounted() {
    this.getHotDetail();
    this.getSearchSuggest();
  },
  data() {
    return {
      placeholder: "搜索音乐，视频，歌词，电台",
      input: "",
      isFocus: false, //是否聚焦搜索框
      hotSearchLists: [], //热搜列表
      searchSuggestLists: [], //搜索建议
      searchLists: [], //搜索列表
    };
  },
  methods: {
    //根据关键字搜素
    async getSearch(keywords) {
      this.isFocus = false;
      this.input = keywords;
      let result = await requireSearchByKeyWords({
        keywords: keywords,
        limit: 5,
      });
      this.searchLists = result.data.result.songs;
      this.$bus.$emit("getUrl", this.searchLists[0].id);
    },
    //热搜
    async getHotDetail() {
      let result = await requireHotDetail();
      console.log(result.data);
      this.hotSearchLists = result.data.data;
    },
    //搜索建议
    async getSearchSuggest() {
      let result = await requireSearchSuggest({
        keywords: "mom",
      });
      console.log(result.data);
    },

    //搜索框失焦点触发搜索方法
    inputBlur() {
      if (!this.input) {
        this.placeholder = "搜索音乐，视频，歌词，电台";
      }
      // if(this.input)
    },
    //搜索框聚焦
    inputFocus() {
      this.placeholder = "";
      this.isFocus = true;
    },
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
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  .logo {
    @include flex-general(row, flex-start, center);
    color: $logo-font-color;
    width: $search-logo-width;
    font-size: 20px;
    letter-spacing: 3px;
    img {
      margin-right: 10px;
      cursor: pointer;
    }
    span {
      cursor: pointer;
    }
  }
  .search-input {
    flex: 1;
    margin: 0 50px 0 50px;
    @include flex-general(row, center, center);
    .btn {
      cursor: pointer;
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
      position: relative;
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
        &:hover {
          color: white;
        }
      }
      .triangle {
        display: block;
        position: absolute;
        bottom: -12px;
        left: 10px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom: 10px solid white;
        z-index: 1;
      }
      .popper {
        position: absolute;
        top: 40px;
        width: 400px;
        height: 500px;
        color: black;
        overflow-y: auto;
        background-color: #fff;
        z-index: 999;
        box-shadow: -5px 0px 5px #ececec;
        .babel {
          padding: 20px;
          font-size: 17px;
          font-weight: 400;
          color: #666666;
        }
        ul {
          @include flex-general(column, flex-start, flex-start);
          li {
            width: 100%;
            margin-bottom: 10px;
            @include flex-general(row, flex-start, center);
            &:hover {
              background-color: #ededed;
            }
            .left {
              font-size: 18px;
              width: 30px;
              margin-right: 10px;
              text-align: center;
              color: #9c9c9c;
            }
            .red {
              color: #ff3a3a;
            }
            .right {
              p {
                span {
                  font-weight: 400;
                }
                .key {
                  color: #3f3f3f;
                }
                .bolder {
                  font-weight: 600;
                }
                .score {
                  color: #cdcdcd;
                }
                .content {
                  color: #a4a4a4;
                }
                &:nth-child(1) {
                  span:nth-child(2) {
                    padding: 0 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .other {
    color: #e9afaf;
    @include flex-between;
    width: $search-other-width;
    .user {
      cursor: pointer;
      &:hover {
        color: white;
      }
      @include flex-between;
      /deep/ .el-avatar {
        transform: scale(0.8);
      }
      .username {
        margin-left: 5px;
        width: 80px;
        @include text-ellipsis;
      }
      i {
        @include i-inline-block(30px, 30px);
      }
    }
    .vip {
      cursor: pointer;
      min-width: 50px;
      &:hover {
        color: white;
      }
    }
    i:hover {
      cursor: pointer;
      color: white;
    }
    .icon-xiala {
      @include i-inline-block(40px, 30px);
      position: relative;
      top: 2px;
    }
    .icon-youjian {
      font-size: 22px;
      position: relative;
      .info {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 18px;
        height: 18px;
        color: red;
        text-align: center;
        font-size: 14px;
        border-radius: 50%;
        background-color: white;
      }
    }
    .icon-shezhi {
      font-size: 20px;
    }
  }
}
</style>
