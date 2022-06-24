// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{
            route:"cloud://tangbinyuan-1g6uui9z23467d07.7461-tangbinyuan-1g6uui9z23467d07-1311475883/preview.jpg",
            username: "张三",
        }
    },
    goAdd(){
        wx.navigateTo({
          url: '/pages/add/add',
        })
    },
    goMessagePage(){
        wx.switchTab({
          url: '/pages/message/message',
        })
    },
    outLog(){
        // 退出登录
        console.log("user logout");
    },
    setRange(){
        // 自定义设置圈养范围
        
    },
    addData(){
        // 添加设配
        wx.cloud.callFunction({
            name: "liveStocket",
            data: {
                type: "addMachine"
            }
        }).then(res => {
            console.log(res);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})