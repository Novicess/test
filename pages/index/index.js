Page({
  data: {
    latitude: 23,
    longitude: 113,
    markers: [],
    circles: []
  },
  async setALlData(){
    let res = await wx.getLocation({})
      console.log(res);
      this.setData({
        circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 3000,
            strokeWidth: 1
          }]
      })
    // 获取所有禽畜的位置 
    this.setData({
      markers: await this.getAsyncALlLiveStockData()
    });
  },
  async getAsyncALlLiveStockData(){
    // 获取所有禽畜的信息
    this.latitude = 23.12
    this.longitude = 113.26
      let res = await wx.cloud.callFunction({
        name: "liveStocket",
        data: {
          type: "getAllLiveStockSite",
        }
      })
      console.log("结果res : ");
      console.log(res);
      console.log("============");
      let list = new Array()
      for(let i = 0; i < res.result.length; i++){
        let item = new Object()
        item['id'] = res.result[i]._id
        item['latitude'] = res.result[i].site[1]
        item['longitude'] = res.result[i].site[0]
        console.log(item['latitude'],  item['longitude']);
        item['width'] = 20
        item['height'] = 20
        item['iconPath'] = res.result[i].url
        item['title'] = "禽畜"
        list.push(item)
      }
      let markers = list
      return markers;
  },
  getLiveStockById(id){
    
  },
  onLoad(openid) {
    console.log(openid);
    this.setALlData();
  },
})
