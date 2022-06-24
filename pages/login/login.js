Page({
    data: {
        
    },
    onLoad() {
        wx.authorizeForMiniProgram({
          scope: scope,
        })

        wx.getUserProfile({
          desc: '测试',
          success: (res) => {
              console.log(res);
          }
        })
    },
})