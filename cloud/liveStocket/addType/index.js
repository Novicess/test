const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 新增类别
 * @param {*}} event 
 * @param {*} conotext 
 */
const db = cloud.database()
const _ = db.command
const typeDB = db.collection("type")
exports.main = async (event, conotext) => {
    let data = event.data
    console.log("进入到addType方法->参数: ");
    console.log(data);
    let typename = data.typename
    let repeat = await checkTypeRepeat(typename)
    if(repeat){
        return {
            msg: "改类别已存在"
        }
    }
    let res = await save(data)
    return res;
}
/**
 * 
 * @param {类别名}} typename 
 * @returns 存在返回true 否则返回false
 */
async function checkTypeRepeat(typename){
    console.log(`进入到checkTypeRepeat: 参数:${typename} `);
    let data = await typeDB.where({
        "typename":_.eq(typename)
    }).get()
    console.log("checkTypeRepeat 返回结果: ");
    console.log(data);
    return data.data.length != 0;
}

async function save(data){
    console.log("进入到save方法: ");
    console.log(data);
    let res = await typeDB.add({
        data
    })
    console.log("save方法返回结果: ");
    console.log(res);
    return res
}