<template>
  <div class="main">
    <ul>
      <li v-for="(item,index) in data" :key="index" @click="goMv(item)">
        <div class="image">
          <img :src="item.imgurl" alt width="100%" height="100%" />
          <span class="time">{{changDate(item.duration)}}</span>
          <span class="play">{{item.playCount}}</span>
        </div>
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { changDate } from "../../plugins/common";
export default {
  props: ["data"],
  mounted() {},
  methods: {
    //时间格式化
    changDate(date) {
      return changDate(date);
    },
    //进入mv路由
    goMv(item) {
      this.$router.push({ name: "mv", params: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  ul {
    @include flex-general(row, flex-start, flex-start);
    flex-wrap: wrap;
    // flex-flow: row wrap;
    li {
      margin-left: 2%;
      flex: 1;
      .image {
        width: 200px;
        color: white;
        position: relative;
        .time,
        .play {
          position: absolute;
          z-index: 2;
        }
        .time {
          bottom: 5px;
          left: 5px;
        }
        .play {
          right: 5px;
          top: 5px;
        }
      }
      p {
      }
    }
  }
}
</style>
