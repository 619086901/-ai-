import { log } from '.'
import { AndroidIsUserLogin } from './android'

// 基础参数：
// goods_id 商品 id，需要从易学运营后台接口获取
// appid 应用 id，传 1908299245
// sn 康佳电视串号
// goods_type 商品类型，传“成长”即可
// payserver 用于区分支付方式，传“1”即可
// 登录：
// defaultProductIndex 默认选中产品，传 0 即可
// id 用户中心账号 openid
// uid 点播平台账号 id
// username 用户名（手机号）
// avatar 用户头像地址（http 链接）
// token 点播平台账号 token
/**
 *
 * @param {*} goods_id 商品 id，需要从易学运营后台接口获取
 * @param {*} appid 应用 id，传 1908299245
 * @param {*} sn 康佳电视串号
 * @param {*} goods_type 商品类型，传“成长”即可
 * @param {*} payserver 用于区分支付方式，传“1”即可
 * @param {*} defaultProductIndex 默认选中产品，传 0 即可
 * @param {*} id 用户中心账号 openid
 * @param {*} uid 点播平台账号 id
 * @param {*} username 用户名（手机号）
 * @param {*} avatar 用户头像地址（http 链接）
 * @param {*} nickname 用户昵称
 * @param {*} token 点播平台账号 token
 * @returns
 */
export function goToOrder(
  goods_id,
  appid,
  sn,
  goods_type,
  payserver,
  defaultProductIndex,
  id,
  uid,
  username,
  avatar,
  nickname,
  token
) {
  if (!AndroidIsUserLogin()) {
    return `${process.env.VUE_APP_YIXUE_TEST}/kknewyixueserver/lite/index.html#/checkstand?goods_id=${goods_id}&appid=${appid}&sn=${sn}&goods_type=${goods_type}&payserver=${payserver}`
  }
  return `${process.env.VUE_APP_YIXUE_TEST}/kknewyixueserver/lite/index.html#/checkstand?goods_id=${goods_id}&appid=${appid}&sn=${sn}&goods_type=${goods_type}&payserver=${payserver}&defaultProductIndex=${defaultProductIndex}&id=${id}&uid=${uid}&username=${username}&avatar=${avatar}&nickname=${nickname}&token=${token}`
}
