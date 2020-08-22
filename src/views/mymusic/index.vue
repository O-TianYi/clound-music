<template>
  <div class="main">
    <!-- 没有登录显示的界面 -->
    <NoLogin />

    <!-- 登录显示的界面 -->
    <MyMusicList />
  </div>
</template>

<script>
import NoLogin from "../../components/mymusic/no-login";
import MyMusicList from "../../components/mymusic/mymusic-list";
export default {
  components: { NoLogin, MyMusicList },
  data() {
    return {
      isLogin: false, //判断用户是否登录
    };
  },
};
</script>

<style lang="scss" scoped></style>
