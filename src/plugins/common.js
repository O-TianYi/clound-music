//获取作曲人拼接方法
export function changAuthor(artists) {
    let name = "";
    if (artists.length === 1) return artists[0].name;
    artists.forEach((val) => {
        if (!name) name = val.name;
        else name += "/" + val.name;
    });
    return name;
}


//获取时间戳转换为时间
export function changDate(date) {
    let temp = new Date(date);
    let m = temp.getMinutes();
    let s = temp.getSeconds();
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return m + ":" + s;
}