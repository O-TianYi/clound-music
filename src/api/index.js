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


//发现音乐----排行榜
//排行榜的图标
export const requireToplist = () => axios.get("api/toplist");


//发现音乐----最新歌曲
//获取指定类型最新歌曲
export const requireLastestSongs = (params) => axios.get("api/top/song", {
    params
});



//-----底部栏，播放音乐
export const requireUrlById = (params) => axios.get("api/song/url", {
    params
});