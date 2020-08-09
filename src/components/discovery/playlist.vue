<template>
  <div class="main">
    <Nav :data="tags" name="热门标签" />

    <div class="content">
      <ul>
        <li v-for="item in playlists" :key="item.id">
          <img :src="item.coverImgUrl" alt width="100%" height="100%" />
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>

    <footer>
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></el-pagination>
    </footer>
  </div>
</template>

<script>
import Nav from "../common/nav";
import { requireAllTags, requireTagPlayList } from "../../api/index";
export default {
  components: { Nav },
  data() {
    return {
      tags: [], //所有标签名称
      playlists: [], //根据标签获取的信息
    };
  },
  mounted() {
    this.getAllTags();
    this.getTagPlayList();
  },
  methods: {
    //获取所有标签名称
    async getAllTags() {
      let result = await requireAllTags();
      result.data.tags.forEach((val) => {
        let obj = { id: val.id, name: val.name };
        this.tags.push(obj);
      });
    },
    //获取不同标签的歌单
    async getTagPlayList() {
      let result = await requireTagPlayList({
        cat: "全部",
        limit: 30,
        time: new Date(),
      });
      this.playlists = result.data.playlists;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .content {
    margin-top: 20px;
    ul {
      @include flex-between;
      flex-wrap: wrap;
      li {
        @include flex-general(column, flex-start);
        width: 18%;
        box-sizing: border-box;
        padding-bottom: 30px;
      }
    }
  }
  footer {
    margin-top: 20px;
    padding-bottom: 20px;
    @include flex-center;
    width: 100%;
    /deep/ .btn-prev,
    /deep/ .btn-next {
      border: 1px solid #e1e1e2;
    }
    /deep/ .el-pager li {
      font-size: 14px;
      font-weight: 400;
      &.active {
        color: $theme-color;
      }
      &:hover {
        color: $theme-color;
      }
    }
  }
}
</style>
