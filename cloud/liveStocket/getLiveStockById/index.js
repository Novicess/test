const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 根据禽畜id获取禽畜数据
 * @param {*} event 
 * @param {*} context 
 */
const db = cloud.database()
const _ = db.command
const liveSTockDB = db.collection("list")
const machineDB = db.collection("Configuration")
const typeDB = db.collection("type")
const activityDB = db.collection("activity")
exports.main = async(event, context) => {
    let id = event.liveStockId
    let liveStock = await getLiveStockById(id)
    let ConfigurationId = liveStock.ConfigurationId
    let Configuration = await getConfigurationById(ConfigurationId)
    liveStock['Configuration'] = Configuration
    let typeId = liveStock.typeId;
    let type = await getTypeById(typeId)
    liveStock['type'] = type;
    let activity = await getActivityByLiveStocketId(id);
    liveStock['activity'] = activity;
    return liveStock;
}

async function getLiveStockById(id){
    console.log("来到getLiveStockById方法，参数:", id);
    let res = await liveSTockDB.where({
        "_id": _.eq(id)
    }).get()
    console.log("返回来的结果:", res);
    res = res.data[0];
    return res
}

// 根据id获取相对应的设配信息
async function getConfigurationById(id){
    console.log("进入到getConfigurationById方法--参数: ", id);
    let data = await machineDB.where({
        "_id": id
    }).get()
    console.log(`getConfigurationById方法调用成功 : ${data}`);
    return data.data[0];
}

// 根据id获取相应的类别
async function getTypeById(id){
    console.log("进入到 getTypeById方法");
   let data = await typeDB.where({
       "_id": _.eq(id)
   }).get()
   console.log(`getTypeById方法调用成功: ${data}`);
   return data.data[0];
}

// 根据禽畜id获取它的活动记录
async function getActivityByLiveStocketId(id){
    console.log("进入到getActivityByLiveStocketId方法");
    let data = await activityDB.where({
        "liveStocketId": _.eq(id)
    }).get()
    console.log(`getActivityByLiveStocketId方法第哦啊用成功: ${data}`);
    return data.data[0];
}