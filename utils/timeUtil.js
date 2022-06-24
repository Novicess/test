const timeUtil = {
    formatDate: function (times) {
        var date = new Date(times);
        var year = date.getFullYear(); //年份
        var month = date.getMonth() + 1; //月份
        var day = date.getDate(); //日
        return year + '-' + month + '-' + day
    },
}

export default timeUtil