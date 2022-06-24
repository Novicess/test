const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
let db = cloud.database()
const _ = db.command
const typeDb = db.collection("type")
/**
 * 获取所有的禽畜类别
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
    let res = await typeDb.get()
    return res
}