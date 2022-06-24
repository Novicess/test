const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 添加设配
 * @param {*} event 
 * @param {*} context 
 */
const db = cloud.database()
const _ = db.command
const machineDB = db.collection("Configuration")
exports.main = async (event, context) => {
    let time = new Date()
    data = {
        "isOnLine": true,
        "updateTime": time
    }
    console.log("要上传的参数为: ");
    console.log(data);
    let res = await machineDB.add({
        data
    })
    return res;
}