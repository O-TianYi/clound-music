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


//获取星期
export function getWeekDay() {
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myDate = new Date();
    var week = weekDay[myDate.getDay()];
    return week;
}

//获取今天号数
export function getDay() {
    var date = new Date();
    return date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
}