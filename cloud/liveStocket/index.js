// 云函数入口文件
const cloud = require('wx-server-sdk')
const getType = require('./getAllType/index')
const getAllLiveSTockSite = require('./getAllLiveStocket/index')
const liveStcoketData = require("./getLiveStocketByPage/index")
const saveLiveStock = require("./saveLiveStock/index")
cloud.init()
const addMachine = require("./addMachine/index")
const addType = require("./addType/index")
const getIdleMachine = require("./getIdleMachine/index")
const addActivity = require("./addActivity/index")
const login = require("./login/index")
const getLiveStockById = require("./getLiveStockById/index")
// 云函数入口函数
exports.main = async (event, context) => {
    let type = event.type
    console.log("来到选择类型方法,参数type:");
    console.log(type);
    switch(type){
        case "getAllType":
            return await getType.main(event, context);
        case "getLiveStocketByPage":
            return await liveStcoketData.main(event, context);
        case "getAllLiveStockSite":
            return await getAllLiveSTockSite.main(event, context);
        case "saveLiveStock":
            return await saveLiveStock.main(event, context)
        case "addMachine":
            return await addMachine.main(event, context);
        case "addType":
            return await addType.main(event, context)
        case "getIdleMachine":
            return await getIdleMachine.main(event,context)
        case "addActivity":
            return await addActivity.main(event, context)
        case "login":
            return await login.main(event, context)
        case "getLiveStockById":
            return await getLiveStockById.main(event, context)
    }
    return {
        code: 400,
        message: "方法调用失败，,没有该方法类型"
    }
}