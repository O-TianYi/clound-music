<template>
  <div class="main">
    <div class="official">
      <p>官方榜</p>
      <ul>
        <li v-for="item in officialToplist" :key="item.id">
          <img :src="item.coverImgUrl" alt width="100%" height="100px" />
          <ul>
            <li>
              <span class="left">
                <span class="top">1</span>
                <span class="pre">100%</span>很久很久
              </span>
              <span class="right">cheng橙子zzzzz</span>
            </li>
          </ul>
          <div>查看全部></div>
        </li>
      </ul>
    </div>
    <div class="global">
      <p>全球榜</p>
      <ul>
        <li v-for="item in globalToplist" :key="item.id">
          <img :src="item.coverImgUrl" alt width="100%" height="100%" />
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { requireToplist } from "../../api/index";
export default {
  components: {},
  data() {
    return {
      officialToplist: [], //官方排行榜数据
      globalToplist: [], //全球排行榜数据
    };
  },
  mounted() {
    this.requireToplist();
  },
  methods: {
    //获取排行榜的数据
    async requireToplist() {
      let result = await requireToplist();
      this.officialToplist = result.data.list.slice(0, 4);
      this.globalToplist = result.data.list.slice(4);
      console.log(this.officialToplist, this.globalToplist);
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
      @include flex-general(row, flex-start);
      flex-wrap: wrap;
      li {
        @include flex-general(column, space-between);
        margin-left: 2%;
        margin-bottom: 20px;
        width: 32%;
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        ul {
          @include flex-general(column, space-between, flex-start);
          width: 100%;
          li {
            width: 100%;
            @include flex-general(row, space-between, flex-end);
            .left {
              flex: 1;
              .top {
                font-size: 18px;
              }
              .pre {
                color: gray;
              }
            }
            .right {
              @include text-ellipsis;
              width: 100px;
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
        width: 15%;
        margin-left: 2%;
        padding-bottom: 20px;
        &:nth-child(6n + 1) {
          margin-left: 0;
        }
        p {
          border: 0;
        }
      }
    }
  }
}
</style>
