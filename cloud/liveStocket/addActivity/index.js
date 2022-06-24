const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()
const _ = db.command
const activityDB = db.collection("activity")
/**
 * 保存禽畜的活动数据
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
    let data = event.data
    console.log("来到了addActivity方法中,参数data:");
    console.log(data);
    let res = await save(data)
    console.log("addActivity方法调用结束:");
    console.log(res);
    return res
}

async function save(data){
    let res = await activityDB.add({
        data
    })
    return res;
}