<template>
  <div class="main">
    <span>
      {{name}}：
      <span class="babel" v-if="babel">全部</span>
    </span>
    <ul>
      <li v-for="(item,index) in data" :key="index" @click="getCatName(item.name)">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["name", "data", "babel"],
  data() {
    return {};
  },
  methods: {
    //给父组件传递点击的catName
    getCatName(catName) {
      this.$emit("clickCatName", catName);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include flex-between;
  color: #666666;
  font-size: 14px;
  span {
    .babel {
      background-color: #8f9096;
      color: white;
      display: inline-block;
      padding: 2px 10px;
      border-radius: 3px;
    }
  }
  ul {
    flex: 1;
    display: inline-block;
    @include flex-general(row, flex-start, center);
    li {
      padding: 0 20px;
      text-align: center;
      border-right: 1px solid #cccccc;
      &:last-child {
        border: 0;
      }
      span {
        color: #666666;
        &:hover {
          cursor: pointer;
          color: black;
        }
      }
    }
  }
}
</style>
