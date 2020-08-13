<template>
  <div class="main">
    <div class="official">
      <p>官方榜</p>
      <ul class="rank-list">
        <li v-for="(item,inde) in officialToplist" :key="item.id">
          <el-image
            :src="item.coverImgUrl"
            lazy
            fit="fill"
            style="width: 100%;height: 80px;padding: 0;"
          >
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <ul class="list">
            <li
              v-for="(item,index) in officialLists[inde]"
              :key="index"
              @click="sendFooterId(item.id)"
              onselectstart="return false;"
            >
              <span class="top" :class="index>2?'':'red'">{{index+1}}</span>
              <span class="pre">
                100%
                <!-- <img :src="item.al.picUrl" alt width="30px" height="30px" /> -->
              </span>

              <span class="desc">
                <span class="name">{{item.name}}</span>
                <span class="form">{{item.alia.length>0?'('+item.alia+')':''}}</span>
              </span>
              <span class="right">{{item.ar[0].name}}</span>
            </li>
          </ul>
          <div>查看全部></div>
        </li>
      </ul>
    </div>
    <div class="global">
      <p>全球榜</p>
      <ul>
        <li v-for="item in globalToplist" :key="item.id" @click="goPlayList(item)">
          <el-image :src="item.coverImgUrl" lazy fit="fill">
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { requireToplist, requirePlayListsById } from "../../api/index";
export default {
  components: {},
  data() {
    return {
      officialToplist: [], //官方排行榜数据
      officialLists: [], //所有官方排行的列表
      globalToplist: [], //全球排行榜数据
    };
  },
  mounted() {
    this.requireToplist();
  },
  methods: {
    //获取排行榜的数据
    async requireToplist() {
      let result = await requireToplist(); //------获取所有排行榜的数组，只是图片和id
      this.officialToplist = result.data.list.slice(0, 4);
      this.globalToplist = result.data.list.slice(4);
      for (let i = 0; i < this.officialToplist.length; i++) {
        // let result = await requirePlayListsById({
        //   id: this.officialToplist[i].id,
        // });
        let result = await this.getPlayListsById(this.officialToplist[i].id);
        this.officialLists.push(result.data.playlist.tracks.slice(0, 8));
      }
      console.log(this.officialLists);
    },
    //根据排行的id查询音乐列表----根据获取的排行榜id查询获取相关的列表
    async getPlayListsById(id) {
      let result = await requirePlayListsById({ id: id });
      return result;
    },

    //把id发送给footer进行音乐播放
    sendFooterId(id) {
      this.$bus.$emit("getUrl", id);
    },
    //跳转到歌单详情页面
    goPlayList(item) {
      this.$router.push({ name: "playlists", params: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .official {
    p {
      padding-bottom: 10px;
      border-bottom: 1px solid #e1e1e2;
      margin-bottom: 10px;
    }
    ul {
      @include flex-general(row, flex-start, flex-start);
      flex-wrap: wrap;
      li {
        @include flex-wrap-li(32%, 2%);
        @include flex-general(column, space-between);
        margin-bottom: 20px;
        /deep/ .el-image__placeholder {
          width: 100px;
        }
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        .list {
          @include flex-general(column, flex-start);
          width: 100%;
          padding: 10px;
          li {
            width: 100%;
            margin: 0;
            font-size: 14px;
            @include flex-general(row, space-between, center);
            &:nth-child(odd) {
              background-color: #f5f5f7;
            }
            &:hover {
              background-color: #ebeced;
            }
            .top {
              width: 30px;
              font-size: 18px;
            }
            .red {
              color: red;
            }
            .pre {
              width: 50px;
              color: gray;
            }
            .desc {
              @include text-ellipsis;
              // flex: 1;
              width: 250px;
              line-height: 25px;
              .form {
                color: gray;
              }
            }
            .right {
              @include text-ellipsis;
              width: 70px;
              text-align: right;
            }
          }
        }
        div {
          font-size: 14px;
          width: 100%;
          background-color: #f5f5f7;
          text-align: right;
          padding: 10px;
        }
      }
    }
  }
  .global {
    p {
      padding-bottom: 10px;
      border-bottom: 1px solid #e1e1e2;
      margin-bottom: 10px;
    }
    ul {
      @include flex-general(row, flex-start);
      flex-wrap: wrap;
      li {
        font-size: 13px;
        @include flex-wrap-li(15%, 2%);
        padding-bottom: 20px;
        &:nth-child(6n + 1) {
          margin-left: 0;
        }
        span {
          display: block;
          height: 30px;
          width: 100%;
          margin-top: 10px;
          padding-bottom: 10px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
