<template>
  <div class="main">
    <span>{{name}}：</span>
    <ul>
      <li v-for="(item,index) in data" :key="index" @click="getCatName(item)">
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
    getCatName(item) {
      this.$emit("clickCatName", item);
      window.event.currentTarget.parentNode.children.forEach((li) => {
        li.className = "";
      });
      window.event.currentTarget.className = "active";
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
      color: #666666;
      &:last-child {
        border: 0;
      }
      span {
        &:hover {
          cursor: pointer;
          color: black;
        }
      }
    }
  }
  .active {
    background-color: #8f9096;
    color: white;
    border-radius: 5px;
  }
}
</style>
