import axios from 'axios'

//---发现音乐---推荐音乐
//录播图
export const requireBanners = () => axios.get("api/banner");
//推荐音乐
export const requireRecommmend = (params) => axios.get("api/personalized", {
    params
});
//独家放送
export const requirePrivatecontent = () => axios.get("api/personalized/privatecontent");

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