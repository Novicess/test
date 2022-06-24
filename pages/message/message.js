const { default: timeUtil } = require('../../utils/timeUtil');
require('../../utils/timeUtil')
Page({
    /**
     * 页面的初始数据
     */
    data: {
       num: 0,
       current: 1,
       page: 5,
       user: {
            username: "",
            avatar: ""
       },
       liveStockTypeList: [
           {
            _id: 0,
            typename: "全部"
           },
        ],
      liveStockDetails: []
    },
    changeType(data){
        let number = data.target.dataset.index;
        // 改变类别
        if(number == this.num) return;
        this.setData({
            num: number
        });

        // 获取新的数据并改变右边的列表
        this.setData({
            typeName: this.data.liveStockTypeList[number].typename,
            liveStockDetails: []
        })
        this.currentPage = 1
        this.getLiveSTockList()
    },
    goDetailById(data){
        console.log(data);
        console.log(data.currentTarget.dataset.index);
        // 获取传过来的禽畜id
        let id = data.currentTarget.dataset.index;
        // 去到禽畜详情界面
        wx.navigateTo({
          url: `/pages/detail/detail?id=${id}`,
        })
    },
    async getLiveSTockList(){
        wx.showLoading({
            title:"拼命加载中...",
            mask:true,
        })
        let pageSize = this.data.page;
        let currentPage = this.data.current;
        let typename = this.data.typeName
        console.log(`请求参数: typename : ${typename} currentPage : ${currentPage} pageSize: ${pageSize}`);
        let res = await wx.cloud.callFunction({
            name: "liveStocket",
            data: {
                type: "getLiveStocketByPage",
                page: pageSize,
                current: currentPage,
                typeName: typename
            }
        })
        let arr = res.result.data
        for(let i = 0; i < arr.length; i++){
            arr[i].id = arr[i]._id.substring(0, 6)
            arr[i].createTime = this.timeFomat(arr[i].createTime)
            arr[i].activity._id = arr[i].activity._id.substring(0, 6)
            arr[i].Configuration._id = arr[i].Configuration._id.substring(0, 6)
        }
        this.setData({
            liveStockDetails: [...this.data.liveStockDetails, ...arr]
        })
        wx.hideLoading()
    },
    init(){
        this.getLiveSTockList()
    },
    timeFomat(time){
        return timeUtil.formatDate(time)
    },
    getallType(){
        wx.cloud.callFunction({
            name:"liveStocket",
            data:{
                type:"getAllType"
            }
        }).then(res =>{
            console.log("===");
            console.log(res.result.data);
            this.setData({
                liveStockTypeList: [...this.data.liveStockTypeList, ... res.result.data]
            })
            console.log("新增完成");
            console.log(this.data.liveStockTypeList);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            wh: wx.getSystemInfoSync().windowHeight
        })
        this.init()
        this.getallType();

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