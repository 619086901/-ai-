const config = {
  //
  appid: '1912131541', // 正式:1912131541 测试:1908299245
  ordertype: 'shaoer',
  token: 'admin',
  //配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //Authorization名称
  Authorization: 'Authorization',
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //最长请求时间
  requestTimeout: 20000,
  // 防抖时间
  debounceTime: 500,
  // 节流时间
  throttleTime: 2000,
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'pxwh_accessToken',
  //token存储位置localStorage sessionStorage cookie
  storage: 'cookie',
  list: {
    1: '颜色',
    2: '逻辑思维',
    3: '观察记忆',
    4: '图形',
    5: '数感'
  }
}

export default config
