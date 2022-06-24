const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()
const _ = db.command
const Data = db.collection('list')
const ConfigurationList = db.collection("Configuration")
const types = db.collection("type")
const activitys = db.collection('activity')
var typeIdMap = new Object();
/**
 * 查找禽畜的信息, 并返回相应的数据
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
    let page = event.page
    let current = event.current
    let typeName = event.typeName
    let start = (current - 1) * page
    if(typeName == undefined){
        typeName = "全部"
    }
    console.log(`getLiveStockByPage方法--参数: page: ${page} , current: ${current}, typeName: ${typeName} `);
    let res = null
    if(typeName == '全部'){
        res = await Data.skip(start).limit(page).get()
    } else {
        let typeId = await getTypeIdByTypeName(typeName)
        res = await Data.where({
            "typeId": _.eq(typeId)
        }).skip(start).limit(page).get()
    }
    
    let data = res.data
    console.log(`查询到 ${data.length} 条结果 `);
    for(let i = 0; i < data.length; i++){
        let ConfigurationId = data[i].ConfigurationId
        let typeId = data[i].typeId
        let id = data[i]._id
        let Configuration = await getConfigurationById(ConfigurationId);
        let activity = await getActivityByLiveStocketId(id);
        let type = await getTypeById(typeId);        data[i]['Configuration'] = Configuration
        data[i]['activity'] = activity
        data[i]['type'] = type
    }
    return res;
}

// 根据id获取相对应的设配信息
async function getConfigurationById(id){
    console.log("进入到getConfigurationById方法--参数: ", id);
    let data = await ConfigurationList.where({
        "_id": id
    }).get()
    console.log(`getConfigurationById方法调用成功 : ${data}`);
    return data.data[0];
}

// 根据id获取相应的类别
async function getTypeById(id){
    console.log("进入到 getTypeById方法");
   let data = await types.where({
       "_id": _.eq(id)
   }).get()
   console.log(`getTypeById方法调用成功: ${data}`);
   return data.data[0];
}

// 根据禽畜id获取它的活动记录
async function getActivityByLiveStocketId(id){
    console.log("进入到getActivityByLiveStocketId方法");
    let data = await activitys.where({
        "liveStocketId": _.eq(id)
    }).get()
    console.log(`getActivityByLiveStocketId方法第哦啊用成功: ${data}`);
    return data.data[0];
}

// 根据类别名获取类别id
async function getTypeIdByTypeName(typeName){
    console.log(`进入到getTypeIdByTypeName方法--参数: ${typeName}`);
    if(typeIdMap[typeName] != undefined){
        return typeIdMap[typeName]
    }
    let res = await types.where({
        "typename": _.eq(typeName)
    }).get()
    console.log(`在getTypeIdByTypeName获取到的res:`);
    console.log(res);
    let typeId = res.data[0]._id
    typeIdMap[typeName] = typeId;
    console.log(`调用getTypeIdByTypeName方法成功--结果: ${typeId}`);
    
    return typeId;
}