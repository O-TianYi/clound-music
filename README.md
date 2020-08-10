#### 遇到的坑





#### 初始化项目

**查看vue-cli版本**

```
vue -V//查看vue-cli的版本

//版本过低建议升级---命令行键入
npm uninstall vue-cli -g//先删除vue-cli2.0版本后才能安装
npm install @vue/cli -g
```

**创建项目**

```
//vue-cli2.x创建项目
npm init webpack demo//vue-cli2.0的创建命令

//如果本地vue-cli不为2.x就需要建立桥接
npm i -g @vue/cli-init
vue init webpack demo

//vue-cli3.x创建项目
npm create demo
也可以使用
vue ui----图形化进行创建项目
```

注意：vue-cli2.x和vue-cli3.x创建项目后生成的默认文件夹和配置文件都会存在一定的差异，具体差异自行搜索。

**运行**

```
//默认运行
//vue-cli2.x
npm run dev

//vue-cli3.x
npm run serve
```

**文件夹含有**

```
api----网络请求接口
style
	+ index.scss---scss文件的入口文件
	+ mixin.scss----混入的公共代码文件
	+ reset.scss----初始化样式
	+ variables.scss----scss需要用到的变量值
view
    + discovery----发现音乐栏
    + mv-----全部mv栏
    + search----头部搜索框
    + mymusic---我的音乐部分
    + user---登录注册
    + recommend---推荐歌单
    + live----直播
store----vuex
router----路由
plugins
	+ element.js----element-ui组件引入
components---公共组件
assets-----静态文件，需要压缩的图片需要放在这
```





#### 插件安装

**插件安装**

```
npm i  element-ui axios vuex vue-lazyload -S
npm i sass-loader node-sass -D----安装scss
```

##### 会遇到的问题

##### 1、sass-loader的问题

**问题**：main.js引入或者vue.config.js文件引入scss文件后，在组件中使用scss定义的mixin或者$color等变量的时候无效。

**原因**：sass-loader版本过高，查看发现安装的是最新的sass-loader（9.0.3）

**解决**：npm install sass-loader@7.3.1 -D



**引入scss文件的两种方式：**

+ 在main.js文件引入index.scss文件，其他的scss使用@import引入index.scss文件就可以。

  ```
  //main.js
  import "./style/index.scss";
  ```

+ 使用vue.config.js（根目录下创建）来引入

  ```
  module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `
                @import "~@/style/index.scss";
              `,
        },
      },
    },
  };
  ```



#### 使用

**scss使用**

```
@mixin border-radius{...}---定义
@include get-border-radius----使用

$border_color:#ccc;---定义
border: 1px solid $border-color;----使用
```

**阿里巴巴矢量图库引入和使用**

![image-20200809000644103](C:\Users\OTY\AppData\Roaming\Typora\typora-user-images\image-20200809000644103.png)

```
<i class="iconfont icon-video"></i>
<i class="iconfont icon-tuichu"></i>
```

注意：使用的时候需要添加iconfont作为前缀，否则无效。











#### 问题

（1）elementui样式无法修改的问题

原因：给style添加了scoped使得当前样式只作用于当前组件的节点（类似于作用域）。原理是将当前组件的节点添加一个唯一标识，例如‘data-v-fae5bece'，这样就可以使得当前样式只作用于当前组件的节点。那么一般情况下，在父组件<style scoped>内样式不能设置子组件的节点elementUI样式，同样子组件<style scoped>内样式不能设置子父组件的节点的elementUI样式，所以产生修改elementUI组件样式无效的问题

解决：>>>、/deep/或者添加一个不加scoped的style标签

```
<style lang="scss"></style>

<style lang="scss" scoped>
/deep/ .el-input{...}------有效
>>>  .el-input{...}------对sass、scss之类的与解析器无效
</style>
```

添加/deep/等后编译之后就不会带作用域。这样就可以对所有需要的标签或者类起作用。

（2）修改input的placeholder的颜色和字体和修改选中光标的颜色

```
//修改input的placeholder的样式
input::-webkit-input-placeholder {
    color: white;
    font-size: 14px;
}
//修改input选中的光标颜色
input:focus{color:blue}
```

（3）动态控制class的值

```
<i :class="['iconfont',item.icon]"></i>----多个值的情况
<i :class="item.icon?item.icon:''"></i>----单个值的时候
<i :class="item.icon"></i>----单个值的时候
```

（4）aside侧边栏使用elementui组件的菜单组件时候，报Invalid prop: custom validator check failed for prop "index"。原因为el-menu-item有一个index属性，该属性的值是为字符串，而:index="item.id"传递的值为int类型，所以报错，因此只需要把传递过来的值转换为字符串或者直接传递的id该为string类型。

```
asideData: [
	{ id: "1", name: "发现音乐", icon: "icon-yinle" }--id该为字符串类型即可
],

<el-menu-item v-for="item in data" :key="item.id" :index="item.id"></el-menu-item>
```

（5）事件触发顺序问题

先触发了失去焦点的blur事件才触发对应的点击事件。

目前问题先触发了失去焦点的blur事件才触发点击事件。

（6）搜索框触发事件使用防抖来控制请求发送次数。防抖：即以最后一次发送为最新请求来发送。每一次最后一次请求都会覆盖之前没有发送返回的相同请求。





### 样式

#### 多层样式嵌套

根据data的长度选择不同的样式显示：

````
<ul :class="data.length>5?'ul-more':'ul-less'"></ul>
````

##### 文字间距

```
letter-spacing:2px
```

##### 输入框聚焦把提示内容清空

```
//vue
<el-input
    :placeholder="placeholder"
    @blur="placeholder='搜索音乐，视频，歌词，电台'"
    @focus="placeholder=''"
></el-input>
data() {
    return {
      placeholder: "搜索音乐，视频，歌词，电台"
    };
},

//原生----没实践过
<input type="text" placeholder="请输入内容" οnfοcus="this.placeholder=''" οnblur="this.placeholder='请输入内容'" \>
```

##### css画三角形

```
.triangle {
    display: block;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid black;
}
```







### 目前存在的bug

+ 搜索框的blur和点击事件会互相冲突









#### 样式优化

##### 图片懒加载

##### 占位

##### 滚动预加载

##### 请求返回时加载动画