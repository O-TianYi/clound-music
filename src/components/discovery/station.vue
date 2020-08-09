<template>
  <div class="main">
    <el-carousel type="card" height="200px">
      <el-carousel-item v-for="(item,index) in 3" :key="index">
        {{index}}
        <!-- <el-image :src="item.imageUrl" lazy fit="fill">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>-->
      </el-carousel-item>
    </el-carousel>

    <div class="nav">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
