const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database()
const _ = db.command
const machineDB = db.collection("Configuration")
const liveStockDB = db.collection("list")
const userDB = db.collection("user")
/**
 * 获取根据用户id获取空闲的设配信息
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
    let userId = event.userId;
    console.log("来到了getIdleMachine方法，参数:", userId);
    let machineList = await getMachineByUserId(userId)
    console.log(`获取到了${machineList.length}条设配的数据`);
    let data = new Array()
    for(let i = 0; i < machineList.length; i++){
        let machine = machineList[i]
        let flag = await checkIdleMachineByMachine(machine)
        if(flag){
            data.push(machine)
        }
    }
    console.log(`一共有${data.length}条空闲的设配`);
    return data
}

/**
 * 根据userId获取所有该用户的设配
 * @param {用户id} userId 
 * @return 返回该用户所有设配
 */
async function getMachineByUserId(userId){
    console.log("来到getIdleMachineByUserId方法:参数userId: ", userId);
    let res = await machineDB.where({
        "userId": _.eq(userId)
    }).get();
    console.log("getIdleMachineByUserId方法结束结果res:");
    console.log(res.data);
    return res.data;
}

/**
 * 根据设配id查找对应的禽畜信息
 * @param {设配Id} machineId 
 * @returns 返回该设配所对应的禽畜信息
 */
async function findLiveStockByMachineId(machineId){
    console.log("来到findLiveStockByMachineId方法,参数: machineId", machineId);
    let res = await liveStockDB.where({
        "ConfigurationId": machineId
    }).get()
    console.log("findLiveStockByMachineId方法调用结束，结果:");
    console.log(res.data);
    return res.data;
}

/**
 * 根据当前设配信息判断是否是空闲的设配
 * @param {设配} Machine 
 * @returns 没有空闲设配返回false 有返回true
 */
async function checkIdleMachineByMachine(Machine){
    console.log("来到checkIdleMachineByMachine方法,参数:");
    console.log(Machine);
    let machineId = Machine._id;
    let liveStock = await findLiveStockByMachineId(machineId)
    if(liveStock == undefined || liveStock.length == 0){
        return true
    }
    return false
}