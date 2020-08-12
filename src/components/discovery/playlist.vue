<template>
  <div class="main">
    <Nav :data="tags" @clickCatName="getCatName" name="热门标签" />

    <div class="content">
      <ul>
        <li v-for="item in playlists" :key="item.id">
          <el-image :src="item.coverImgUrl" lazy fit="fill">
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span>{{item.name}}</span>
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
    this.getTagPlayList("全部");
  },
  methods: {
    //获取所有标签名称
    async getAllTags() {
      let result = await requireAllTags();
      result.data.tags.forEach((val) => {
        if (val.playlistTag) {
          let obj = { id: val.id, name: val.name };
          this.tags.push(obj);
        }
      });
    },
    //获取不同标签的歌单
    async getTagPlayList(catName) {
      let result = await requireTagPlayList({
        cat: catName,
        limit: 30,
        // time: new Date(),
      });
      this.playlists = result.data.playlists;
    },

    //子组件点击触发父组件方法---给父组件传递cat名称
    getCatName(catName) {
      this.getTagPlayList(catName);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .el-image {
    /deep/ .image-slot {
      @include flex-center;
      width: 100%;
      font-size: 50px;
      background-color: #f5f7fa;
    }
  }

  .content {
    margin-top: 20px;
    ul {
      @include flex-between;
      flex-wrap: wrap;
      li {
        @include flex-general(column, flex-start, flex-start);
        width: 18%;
        margin-bottom: 20px;
        span {
          // @include text-ellipsis;
          display: block;
          height: 50px;
          width: 100%;
          margin-top: 10px;
          font-size: 14px;
        }
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
