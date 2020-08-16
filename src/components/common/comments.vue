<template>
  <div class="content">
    <p>评论（417）</p>
    <div class="comment-text">
      <textarea rows="4"></textarea>
      <div class="options">
        <div class="left">
          <i></i>
          <i></i>
        </div>
        <div class="right">评论</div>
      </div>
    </div>
    <div class="good-comments">
      <p>精彩评论</p>
      <ul class="comments">
        <li v-for="(item,index) in data" :key="index">
          <div class="head-img">
            <img :src="item.user.avatarUrl" width="50px" height="50px" alt />
          </div>
          <div class="info">
            <p class="top">
              <span class="username">{{item.user.nickname}}</span>
              :{{item.content}}
            </p>
            <div class="bottom">
              <span>{{changDate(item.time)}}</span>
              <ul class="options">
                <li>举报</li>
                <li>点赞</li>
                <li>分享</li>
                <li>回复</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { changDate } from "../../plugins/common";
export default {
  props: ["data"],
  methods: {
    //格式化时间
    changDate(time) {
      return changDate(time);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin-top: 50px;
  width: 100%;
  p {
    border-bottom: 1px solid black;
    padding: 10px 0;
    margin-bottom: 20px;
  }
  .comment-text {
    padding: 10px;
    background: gray;
    margin-bottom: 30px;
    textarea {
      width: 100%;
    }
    .options {
      @include flex-between;
      .left {
      }
      .right {
        background-color: white;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .good-comments {
    p {
      font-size: 12px;
    }
    ul.comments {
      li {
        @include flex-between;
        align-items: flex-start;
        margin-bottom: 20px;
        .head-img {
          img {
            border-radius: 50%;
          }
        }
        .info {
          flex: 1;
          .top {
            @include text-ellipsis;
            .username {
              color: blue;
            }
          }
          .bottom {
            @include flex-between;
            color: gray;
            ul.options {
              @include flex-general(row, flex-start, center);
              li {
                border-right: 1px solid black;
              }
            }
          }
        }
      }
    }
  }
}
</style>
