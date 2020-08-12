<template>
  <div class="main">
    <header>
      <Nav name="语种" :data="area" babel="true" class="nav" @clickCatName="getSongerArea" />
      <Nav name="分类" :data="types" babel="true" class="nav" @clickCatName="getSongerType" />
      <!-- <Nav name="筛选" babel="true" class="nav" /> -->
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
    this.getSongers(this.params);
  },
  data() {
    return {
      //歌手分类
      types: [
        { id: 1, name: "全部", value: 0 },
        { id: 2, name: "男歌手", value: 1 },
        { id: 3, name: "女歌手", value: 2 },
        { id: 4, name: "乐队", value: 3 },
      ],
      //歌手语言
      area: [
        { id: 1, name: "全部", value: -1 },
        { id: 2, name: "华语", value: 7 },
        { id: 3, name: "欧美", value: 96 },
        { id: 4, name: "日本", value: 8 },
        { id: 5, name: "韩国", value: 16 },
        { id: 6, name: "其他", value: 0 },
      ],
      //歌手名字开头
      name: [],
      //筛选的歌手
      artists: [],
      //筛选歌手的条件对象--给请求作为参数
      params: {
        area: -1, //-1是全部
        type: 0, //1男歌手,0全部
        limit: 30,
      },
    };
  },
  methods: {
    //筛选歌手
    async getSongers(params) {
      let result = await requireSongers(params);
      this.artists = result.data.artists;
    },
    //获取选择的歌手地区
    getSongerArea(area) {
      this.params.area = area.value;
      this.getSongers(this.params);
    },
    //获取歌手的类型
    getSongerType(type) {
      this.params.type = type.value;
      this.getSongers(this.params);
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
      @include flex-general(row, flex-start);
      flex-wrap: wrap;
      li {
        @include flex-general(column, flex-start, flex-start);
        @include flex-wrap-li(18%, 2%);
        &:nth-child(5n + 1) {
          margin-left: 0;
        }
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
