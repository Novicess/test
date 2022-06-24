// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: { 
        typeList: [],
        index: 0,
        liveStock: {
            age: 0
        },
        activity:{

        },
        idleMachineList:[],
        machineNameList:[],
        machineIndex: 0
    },  
    async save(){ // 上传所有数据
        if(!this.checkData()){
            return;
        }
        let res = await this.saveLiveStock()
        let liveStockId = res._id
        this.saveActivity(liveStockId)
        this.showToastByMessage("上传成功")
        wx.switchTab({
          url: '/pages/message/message',
        })
    },
    showToastByMessage(message){
        wx.showToast({
            title: message,
            icon: 'error',
            duration: 2000
        })
    },
    async saveLiveStock(){ // 上传禽畜数据
        let liveStockData = this.getLiveStockData();
        let res = await wx.cloud.callFunction({
            name: "liveStocket",
            data: {
                type: "saveLiveStock",
                data: {
                    liveStockData
                }
            }
        })
        console.log(res);
        return res.result;
    },
    async saveActivity(liveStockId){ // 上传禽畜活动数据
        let data = this.getActivityData(liveStockId)
        let res = await wx.cloud.callFunction({
            name: "liveStocket",
            data: {
                type: "addActivity",// addActivity
                data
            }
        })
        console.log(res);
    },
    checkData(){ // 检查数据是否可行
        let age = this.data.liveStock.age
        if(age == undefined || age < 0 || age > 100){
            this.showToastByMessage("禽畜年龄异常，请检查下禽畜的年龄")
            return false
        }
        let sex = this.data.liveStock.sex
        console.log(sex);
        if(sex === undefined){
            this.showToastByMessage("请先选择性别")
            return false
        }
        let weight = this.data.activity.weight
        if(weight == undefined){
            this.showToastByMessage("体重为空")
            return false
        }
        return true
    },
    getActivityData(liveStockId){ //获取禽畜活动数据
        let data = new Object()
        data['createTime'] = this.getCreateTime()
        data['liveStocketId'] = liveStockId
        data['site'] = this.getSite()
        data['speed'] = this.getSteep()
        data['steps'] = this.getSteps()
        data['weight'] = this.data.activity.weight
        return data;
    },
    getLiveStockData(){ // 获取禽畜的数据
        let ConfigurationId = this.getMachineIdByMachineIndex(this.data.machineIndex)
        let typeId = this.getTypeIdByIndex(this.data.index)
        let data = new Object()
        data['ConfigurationId'] = ConfigurationId
        data['age'] = this.data.liveStock.age
        data['sex'] = this.data.liveStock.sex
        data['createTime'] = this.getCreateTime()
        data['totalSteps'] = this.getTotalSteps()
        data['typeId'] = typeId
        return data;
    },
    getSteep(){ // 获取禽畜活动中的速度
        // ...
        return 0;
    },
    getSteps(){ // 获取禽畜活动中步数
        // ...
        return 0;
    },
    getSite(){ //获取禽畜的地理位置
        // ...
        let x = Math.random() * 0.1;
        let y = Math.random() * 0.1;
        return [x + 113.36199, y + 23.12465]
    },
    getMachineIdByMachineIndex(machineIndex){ // 获取设配id
        return this.data.idleMachineList[machineIndex]._id;
    },
    getCreateTime(){ // 获取当前时间
        return new Date();
    },
    getTotalSteps(){ // 获取禽畜数据中的总步数
        // .....
        return 0;
    },
    getTypeIdByIndex(index){ // 获取禽畜数据中的类别id
        return this.data.typeListData[index]._id
    },
    async getAllType(){
        // 获取禽畜的种类
        const data = await wx.cloud.callFunction({
            name: "liveStocket",
            data: {
                type: "getAllType"
            }
        })
        console.log(data);
        let typeListData = data.result.data
        this.setData({
            typeList: this.getAllTypeNameByTypeList(typeListData),
            typeListData: typeListData
        })
    },
    getAllTypeNameByTypeList(typeList){
        let data = new Array()
        for(let i = 0; i < typeList.length; i++){
            data.push(typeList[i].typename)
        }
        return data;
    },
    setMachine(e){ // 设配列表的下标
        let index = e.detail.value
        this.setData({
            machineIndex: index
        })
    },
    setAge(data){ // 获取年龄
        let age = data.detail.value
        this.setData({
            "liveStock.age": age
        })
    },
    bindPickerChange(e){ // 获取种类的下标
        let index = e.detail.value
        this.setData({
            index: index
        })
    },
    radioChange(e){
        // 当性别发生改变时
        let sex = e.detail.value;
        console.log(sex);
        this.setData({
            "liveStock.sex": sex
        })
    },
    setweight(value){ // 设置体重
        let weight = value.detail.value
        console.log(weight);
        this.setData({
            "activity.weight": weight
        })
    },
    getIdleMachine(){ // 获取空闲的设配
        wx.cloud.callFunction({
            name: "liveStocket",
            data:{
                type: "getIdleMachine",
                "userId": "0a4ec1f96279c7eb02bd8d4b3d20f354"
            }
        }).then(res => {
            console.log(res);
            let data = res.result
            this.setData({
                idleMachineList: data,
                machineNameList: this.getMachineName(data)
            })
        }).catch(err => {
            console.error(err);
        })
    },
    getMachineName(machineList){
        let data = new Array()
        for(let i = 0; i < machineList.length; i++){
            data.push(machineList[i].machineName)
        }
        return data;
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAllType();
        this.getIdleMachine()
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