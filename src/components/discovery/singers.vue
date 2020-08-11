<template>
  <div class="main">
    <header>
      <Nav name="语种" :data="area" babel="true" class="nav" />
      <Nav name="分类" :data="types" babel="true" class="nav" />
      <Nav name="筛选" babel="true" class="nav" />
    </header>

    <main>
      <ul>
        <li v-for="item in artists" :key="item.id">
          <el-image :src="item.picUrl" lazy fit="fill">
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Nav from "../common/nav";
import { requireSongers } from "../../api/index";
export default {
  components: {
    Nav,
  },
  mounted() {
    this.getSongers();
  },
  data() {
    return {
      //歌手分类
      types: [
        { id: 1, name: "男歌手" },
        { id: 2, name: "女歌手" },
        { id: 3, name: "乐队" },
      ],
      //歌手语言
      area: [
        { id: 1, name: "华语" },
        { id: 2, name: "欧美" },
        { id: 3, name: "日本" },
      ],
      //歌手名字开头
      name: [],
      //筛选的歌手
      artists: [],
    };
  },
  methods: {
    //筛选歌手
    async getSongers() {
      let result = await requireSongers({
        area: -1,
        type: 1,
        limit: 30,
      });
      this.artists = result.data.artists;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  header {
    margin-bottom: 30px;
    .nav {
      margin-bottom: 10px;
    }
  }
  main {
    ul {
      @include flex-between;
      flex-wrap: wrap;
      li {
        @include flex-general(column, flex-start, flex-start);
        width: 18%;
        box-sizing: border-box;
        padding-bottom: 20px;
        span {
          display: block;
          height: 30px;
          width: 100%;
          margin-top: 10px;
          padding-bottom: 10px;
          font-size: 14px;
        }
        /deep/ .image-slot {
          @include flex-center;
          width: 100%;
          font-size: 40px;
        }
      }
    }
  }
}
</style>
