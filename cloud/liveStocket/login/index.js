const cloud = require('wx-server-sdk');
const md5 = require('../utils/md5')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

/**
 * 获取用户数据
 * @param {*} event 
 * @param {*} context 
 */
const db = cloud.database()
const _ = db.command
const userDB = db.collection("user")
exports.main = async (event, context) => {
  let username = event.username;
  let password = event.password;
  console.log(`登录参数: usernama: ${username}, password: ${password} `);
  let res = await login(username, password)
  return res;
}

async function login(username, password){
  password = md5(password);
  console.log("加密后的密码为: ", password);
  let res = await userDB.where({
    "username": _.eq(username),
    "password": _.eq(password)
  }).get();
  console.log("执行成功，返回结果为:");
  console.log(res);
  return res;
}