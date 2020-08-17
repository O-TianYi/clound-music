import axios from 'axios'


//---搜索部分
//根据关键字搜索音乐
export const requireSearchByKeyWords = (params) => axios.get("api/search", {
    params
});
//详细热搜列表
export const requireHotDetail = () => axios.get("api/search/hot/detail");
//搜索建议
export const requireSearchSuggest = (params) => axios.get("api/search/suggest", {
    params
});


//---发现音乐---推荐音乐
//录播图
export const requireBanners = () => axios.get("api/banner");
//推荐音乐
export const requireRecommmend = (params) => axios.get("api/personalized", {
    params
});
//独家放送
export const requirePrivatecontent = () => axios.get("api/personalized/privatecontent");
//每日新歌
export const requireNewSongs = () => axios.get("api/personalized/newsong");
//根据用户id获取今天推荐歌单
export const requireTodadyRecommendSongs = (params) => axios.get("api/recommend/songs", {
    params
});



//发现音乐-----歌单
//获取所有tag
export const requireAllTags = () => axios.get("api/playlist/hot");
//根据tag获取数据
export const requireTagPlayList = (params) => axios.get("api/top/playlist/highquality", {
    params
});


//发现音乐----歌手
//根据类型和语种筛选歌手
export const requireSongers = (params) => axios.get("api/artist/list", {
    params
});
//获取某个歌手的专辑
export const requireSingerPlayLists = (params) => axios.get("api/artist/album", {
    params
});
//根据专辑id获取专辑内容
export const requireSingerSongs = (params) => axios.get("api/album", {
    params
});
//获取歌手所有mv----参数为歌手的id
export const requireSingerMV = (params) => axios.get("api/artist/mv", {
    params
});
//根据mvid获取mvurl地址
export const requireMvUrlById = (params) => axios.get("api/mv/url", {
    params
});
//根据mvid获取详细mv地址
export const requireMvInfoById = (params) => axios.get("api/mv/detail", {
    params
});
//根据歌手id获取歌手详情
export const requireSingerDescById = (params) => axios.get("api/artist/desc", {
    params
});
//根据歌手热门前50首歌曲
export const requireSingerHotSongsById = (params) => axios.get("api/artist/top/song", {
    params
});
//根据歌手id获取相似歌手
export const requireSimiSingers = (params) => axios.get("api/simi/artist", {
    params
});
//获取mv评论
export const requireMVComments = (params) => axios.get("api/comment/mv", {
    params
});






//发现音乐----排行榜
//排行榜的图标
export const requireToplist = () => axios.get("api/toplist");
//根据上面返回的id查询音乐列表----发现音乐也有用（常用）
export const requirePlayListsById = (params) => axios.get("api/playlist/detail", {
    params
});


//发现音乐----最新歌曲
//获取指定类型最新歌曲
export const requireLastestSongs = (params) => axios.get("api/top/song", {
    params
});


//-----底部栏，播放音乐
export const requireUrlById = (params) => axios.get("api/song/url", {
    params
});