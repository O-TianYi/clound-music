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

（5）事件触发顺序问题（未解决）

先触发了失去焦点的blur事件才触发对应的点击事件。

目前问题先触发了失去焦点的blur事件才触发点击事件。

（6）搜索框触发事件使用防抖来控制请求发送次数。防抖：即以最后一次发送为最新请求来发送。每一次最后一次请求都会覆盖之前没有发送返回的相同请求。（未实现）

（7）router-view嵌套问题。router-view嵌套和需要指定的router-view显示内容。

```
{
    path: "/",
    redirect: "/home",
},
// 设置
{
    path: "/setting",
    name: "setting",
    component: () => import("../components/header/setting.vue"),
},
{
    path: "/home",
    name: "home",
    children:[...]
},
{
    path: "live",
    name: "live",
    component: () => import("../views/live"),
},
```

例如上面例子：setting和live都会在app.vue中的router-view的位置显示，而home中的children所有组件都会在home的router-view的位置显示。

（8）路由传参

```
query结合path、name使用
params结合name使用，不能和path使用，不然直接无视params中的内容

+ query传递参数的形式就是在地址栏拼接字符串的形式，可以理解为get参数传递
+ params则是不在地址栏显示参数，可以理解为post参数传递
```

（9）使用事件委任来解决每个li绑定点击事件（未实现）

```
selectMusic(event) {
      let e = event || window.event;
      let target = e.target || e.srcElement; //标准浏览器用ev.target，IE浏览器用event.srcElement
      console.log(e, target);
      if (target.nodeName.toLowerCase() == "li") {
        alert(target.innerHTML);
      }
    },
```

（10）audio参考

https://www.cnblogs.com/zhusheng2008/p/5529439.html

https://blog.csdn.net/TCF_JingFeng/article/details/86666351

```
使用ref取代原来的id获取dom节点
 <audio controls :src="songUrl" id="audio" @play="ready" autoplay />
 <audio controls :src="songUrl" ref="audio" @play="ready" autoplay />
 
 this.$refs.audio.src = url;
 
//audio的重要属性
audioTracks    返回可用的音轨列表（MultipleTrackList对象）    
autoplay    媒体加载后自动播放    
buffered    返回缓冲部件的时间范围(TimeRanges对象)    
controller    返回当前的媒体控制器（MediaController对象）    
controls    显示播控控件      
currentSrc    返回当前媒体的URL    
currentTime    当前播放的时间，单位秒    
defaultMuted    缺省是否静音    
defaultPlaybackRate    播控的缺省倍速    
duration    返回媒体的播放总时长，单位秒    
ended    返回当前播放是否结束标志    
error    返回当前播放的错误状态    
initialTime    返回初始播放的位置    
loop    是否循环播放    
mediaGroup    当前音视频所属媒体组 (用来链接多个音视频标签)    
muted    是否静音    
networkState    返回当前网络状态    
paused    是否暂停    
playbackRate    播放的倍速    
played    当前播放部件已经播放的时间范围(TimeRanges对象)    
preload    页面加载时是否同时加载音视频  
volume    音量值 
src    当前音视频源的URL 
```

vue的audio的方法（和原生的不一样）

参考掘金的：https://juejin.im/post/6844903796942995470

```
//获取播放音乐的实时时间timeupdate
 <audio controls :src="songUrl" ref="audio" autoplay="false" @timeupdate="updateTime" />
 
 //返回的是秒数，需要自行转换，例如返回100s这样的
 updateTime(e) {
     //  this.currentTime = e.target.currentTime;  //获取audio当前播放时间
     console.log(e.target.currentTime);
 },
 
 //时间格式转换为---m:s
 updateTime(e) {
     let time = Math.floor(e.target.currentTime); //获取实时时间取整
     //处理时间
     //分钟
     let m = parseInt(time / 60); //从字符串获取第一个数字，例如1.5=》1
     if (m < 10) {
     m = "0" + m;
     }
     //秒
     let s = Math.round(time % 60);//将数字四舍五入，例如1.5=>2
     if (s < 10) {
     s = "0" + s;
     }
     console.log(m + ":" + s);
 },
```

**知识拓展：round、parseInt、parseFloat、floor之间的区别：**

```
round:四舍五入，当数字为负数，绝对值要>5才能入，整数>=5都可以入
	=Math.round(5.51)　　//返回6
    =Math.round(2.4) 　　//返回2
    =Math.round(-1.4)　　//返回-1
    =Math.round(-1.5)　　//返回-1
    =Math.round(-1.51)　　//返回-2,这个是特殊情况
    =Math.round(-5.8)　　//返回-6
floor:向下取整，一般使用在获取非负数的整数部分时使用
	=Math.floor(12.3); // 12
    =Math.floor(6.9); // 6
    =Math.floor(4); // 4
    =Math.floor(-1.2); // -2
    =Math.floor(-1.9); // -2
    =Math.floor(‘1aa’)/('a1'); // NaN
parseInt:直接去除小数部分，可以将字符型的数字转化为10进制，会将传递的字符串进行转换数字，例如
	=parseInt('11', 8); // 9, 8进制中的11即为10进制中的9
    =parseInt('123.456'); // 123
    =parseInt('a123'); // NaN
    =parseInt('123a456'); // 123
parseFloat:字符串转换为数值，和parseInt类似，只是返回小数部分
ceil:往大的方向取
	=Math.ceil(5.57)　　//返回6
    =Math.ceil(2.4)　　//返回3
    =Math.ceil(-1.5)　　//返回-1
    =Math.ceil(-5.8)　　//返回-5
```

**audio的坑**

获取duration音乐的总时长需要在音乐能播放的钩子函数（canplay）才能获取，其他地方获取为NaN

```
<audio controls ref="audio" autoplay="false" @timeupdate="updateTime" @canplay="getDuration" />

getDuration() {
	console.log(this.$refs.audio.duration);
},
```

（11）字符串转换为数字技巧

```
'5'-0：减个0就可以完成字符串转换为数字
5+'':这样可以实现数字转换为字符串
```

（12）因为音乐播放进度条的需要把audio的属性duration（歌曲总时间）和currentTime（当前时间）做除法获取对应的进度条的数值，但是要预防duration的值为NaN的判断，否则el-progress组件（element-ui进度条组件）就会报custom validator check failed for prop "percentage"。

```
 <audio :src="songUrl" ref="audio" autoplay="false" @timeupdate="updateTime" />
 

updateTime(e) {
    if (!isNaN(e.target.duration)) {
    this.music = Math.floor(
    (e.target.currentTime / e.target.duration) * 100 - 0
    );
    }
},
```

（13）js动态设置active属性来控制选中样式

```
//让当前点击节点的所有兄弟元素包含自己都去掉active样式
window.event.currentTarget.parentNode.children.forEach((li) => {
	li.className = "";
});
//给点击的内容添加active
window.event.currentTarget.className = "active";

currentTarget和traget的区别
currentTarget：是绑定了事件才会有该元素显示，例如li绑定了该事件，而点击其子元素currentTarget还是绑定了该事件的节点
target：就是真实的子节点，例如li绑定了上面的事件，在该事件使用e.traget可以精确获取到该li元素下的子元素
```

（14）css样式问题，除了第一个都选择的写法

```
/deep/ .el-table__row {
    &:not(:nth-child(1)):hover {
    	color: red;
    }
}
```

（15）取消双击选中文字操作

```
css解决办法：
div{
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
}


js解决办法---就算是vue中也只需要使用该方法，没有@selectstart操作
<li onselectstart="return false;">
```





### 样式

#### 多层样式嵌套

根据data的长度选择不同的样式显示：

````
<ul :class="data.length>5?'ul-more':'ul-less'"></ul>
````

##### 文字设置

```
letter-spacing:2px
text-indent: 2em;//首行缩进
text-align: justify;//两端对齐
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

  原因：blur和click的事件产生冲突

  解决：使用mousedown来取代click，来来改变触发事件的优先级

  ```
  @mousedown="getSearch(item.searchWord)"
  ```

  

##### 最新列表中日本和华语返回的playtime有问题，返回为空报 Error in render: "TypeError: Cannot read property 'playTime' of null"









#### 样式优化

##### 图片懒加载

##### 占位

##### 滚动预加载

##### 请求返回时加载动画





问题：

如何让第一行的liflex，而让不满一行的左边开始排列。

```
宽和边距使用百分比来解决，这样原来是怎么样布局，缩放也是怎么样的，不会突出很多。
```













#### 优化

[参考](https://github.com/Akryum/vue-virtual-scroller)

使用vue-virtual-scroller来进行虚拟化加载

+ 安装`npm install -D vue-virtual-scroller`

+ main.js引入

  ```
  import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
  import VueVirtualScroller from "vue-virtual-scroller";
  import {
    RecycleScroller
  } from "vue-virtual-scroller";
  Vue.use(VueVirtualScroller);
  Vue.use(RecycleScroller);
  
  
  //RecycleScroller部分也可以在对应的使用组件上使用
  ```

+ 使用

  ```
  <RecycleScroller
      class="lists"//自定义的类，需要定义高度否则就是所有渲染
      :items="lastestSongs"//渲染的数据
      key-field="id"
      :item-size="100"//每个item的高度
      v-slot="{ item }"//items数组的一个item
  >
  //使用item.xxx直接使用即可
  </RecycleScroller>    
  ```

+ 检测是否成功

  打开控制台查看对应的渲染节点数量是否没有一次过全部显示就说明成功过，即例如需要渲染的数据是100个，但是你在elemth查看只有十多个dom节点，即说明引用成功。

+ 注意点：必须给RecycleScroller定义一个class来设定高度，否则就是全部数据渲染显示，即会出现很多个dom节点。

