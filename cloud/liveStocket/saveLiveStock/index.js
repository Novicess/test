const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 
 * @param {上传禽畜数据} event 
 * @param {*} context 
 */
const db = cloud.database()
const _ = db.command
const liveStockDB = db.collection("list")
exports.main = async (event, context) => {
    let liveStock = event.data
    console.log("进入到saveLiveStcok方法 参数:");
    console.log(liveStock);
    let data = liveStock.liveStockData
    let res = await liveStockDB.add({
        data
    })
    console.log("保存成功 结果:");
    console.log(res);
    return res
}