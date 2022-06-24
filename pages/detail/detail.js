const timeUtil = require('../../utils/timeUtil.js')
Page({
    data: {
      Height: 400,
      scale: 13,
      latitude: "",
      longitude: "",
      markers: [],
      circles: [],
      liveStockData:  {
        id: "00001",
        sex: "公",
        type: {
            id: "1",
            name: "鸭"
        },
        age: 5,
        totalSteps: 10010,
        createTime: "2022-01-10",
        Configuration: {
            id: "00001",
            isOnLine: true,
            updateTime: "2022-01-12"
        },
        activity: {
            id: "00001",
            createTime: "2022-01-10",
            weight: 100,
            steps: 100,
            speed: 10,
        }
      },
    },
    getLiveStockId(id){
      console.log("请求的参数为：", id);
      wx.cloud.callFunction({
        name: "liveStocket",
        data:{
          type: "getLiveStockById",
          liveStockId: id
        }
      }).then(res => {
        console.log("返回来的值");
        console.log(res);
        
        res.result.id = res.result._id.substr(0, 6);
        this.setData({
          liveStockData: res.result,
          markers: [{
            id: res.result._id,
            latitude: res.result.activity.site[1],
            longitude: res.result.activity.site[0],
            width: 50,
            height: 50,
            title: "地点"
          }],
        })
      }).catch(err => {
        console.error(err);
      })
    },
    onLoad: function (option) {
      console.log(option);
      console.log("===< onLoad >===");
      this.getLiveStockId(option.id)
      var _this = this;
      // 获取位置
      wx.getLocation({
        type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          _this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            circles: [{
              latitude: res.latitude,
              longitude: res.longitude,
              color: '#FF0000DD',
              fillColor: '#7cb5ec88',
              radius: 3000,
              strokeWidth: 1
            }]
          })
        }
      })
    },

    regionchange(e) {
      console.log("regionchange===" + e.type)
    },
  
    //点击merkers
    markertap(e) {
      console.log(e.markerId)
       
      wx.showActionSheet({
        itemList: ["A"],
        success: function (res) {
          console.log(res.tapIndex)
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    },
  
    //点击缩放按钮动态请求数据
    controltap(e) {
      var that = this;
      console.log("scale===" + this.data.scale)
      if (e.controlId === 1) {
        // if (this.data.scale === 13) {
        that.setData({
          scale: --this.data.scale
        })
        // }
      } else {
        //  if (this.data.scale !== 13) {
        that.setData({
          scale: ++this.data.scale
        })
        // }
      }
    },
  
  
  })