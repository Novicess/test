const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 获取所有禽畜的位置
 * @param {*} event 
 * @param {*} context 
 */
const db = cloud.database()
const _ = db.command
const activityDB = db.collection('activity')
const liveStocketDB = db.collection('list')
const typeDB = db.collection('type')
exports.main = async (event, context) => {
    console.log("进入到了getAllLiveStocket方法");
    let data = await getAllLiveSTockSite()
    console.log(`方法:getAllLiveStocket调用结束: `);
    console.log(data);
    return data;
}

async function getAllLiveSTockSite(){
    console.log("进入到 getAllLiveSTockSite 方法");
    let res = await activityDB.get()
    res = res.data 
   
    console.log("获取到所有禽畜的数据，一共有: ", res.length);
    let data = new Array();
    console.log("+++++++++++++++");
    for(let i = 0; i < res.length; i++){
        if(i == 0) console.log("进入到循环里面");
        let item = new Object
        item['site'] = res[i].site
        item['_id'] = res[i].liveStocketId
        console.log(item);  
        item['url'] = await getUrlByLiveStcokId(item._id)
        console.log("返回的数值为: ", item['url']);
        data.push(item)
    }
    console.log(`getAllLiveSTockSite方法执行成功: ${data}`);
    return data;
}

async function getUrlByLiveStcokId(id){
    console.log("进入到: getUrlByLiveStcokId: 参数: ", id);
    let typeId = await getTypeIdByLiveSTockId(id)
    let url = await getUrlByTypeId(typeId)
    return url;
}

async function getTypeIdByLiveSTockId(id){
    console.log(`进入到getTypeIdByLiveSTockId方法: 参数: ${id}`);
    let res = await liveStocketDB.where({
        "_id": _.eq(id)
    }).get()
    console.log("getTypeIdByLiveSTockId:返回的数据");
    console.log(res);
    res = res.data[0];
    let typeId = res.typeId;
    console.log(`调用getTypeIdByLiveSTockId结束：${typeId}`);
    return typeId
}

async function getUrlByTypeId(id){
    console.log(`进入到getUrlByTypeId方法:参数: ${id}`);

    let type = await typeDB.where({
        "_id": _.eq(id)
    }).get()
    console.log("从type数据库查找的结果:");
    console.log(type);
    let url = ""    
    if(type == undefined){
        console.error("未查到")
        url: "空"
    } else {
        url = type.data[0].url
    }
    console.log("getUrlByTypeId方法调用结束: url = ", url);
    return url
}