/**
 * 概述：
 * app包名:com.konka.apkhall.edu
 * token:APK项目中
 * 自动化测试链接：https://collect-admin.kkapp.com/dbconf/auto-static/index.html#/autoList?id=28
 * 采集说明：
 * 1、公共字段为 SDK 自带采集，每个单独的事件无需重新采集；
 * 2、如果事件中某些字段无，报空即可；
 * 3、测试人员测试时可参考事件触发时机、事件字段说明设计测试样例；测试服数据通过自动化测试链接实时查看，上述链接为测试服链接。
 */
/**
 * @播放事件上报
 */
export class PlayDataSent {
  constructor(data) {
    this.start_time = data?.start_time ?? '' // 开始播放时间 2018-01-01 00=00=00
    this.end_time = data?.end_time ?? '' // 结束播放时间 2018-01-01 00=00=00
    this.video_id = data?.video_id ?? '' // 视频 id
    this.video_name = data?.video_name ?? '' // 视频名称
    this.video_type = '1401' // 康佳少儿的专辑类型
    this.album_id = data?.album_id ?? '' // 专辑 id
    this.album_name = data?.album_name ?? '' // 专辑名称
    this.is_preview = data?.is_preview ?? '1' // vip 视频是否可以试看 0是 1否
    this.definition = data?.definition ?? '720P' //清晰度（当前视频最终 480P、720P、1080P、蓝光、4k清晰度）
    this.cp_id = data?.cp_id ?? '23081558' // 视频提供商 {23081558：普信互动课程}
    this.cdn = data?.cdn ?? '' // 观看视频流量 1000M（M 为单位）
    this.is_vip = data?.is_vip ?? '{}' // 是否视频 vip 会员{1}；非会员{}
    this.channel_id = data?.channel_id ?? '20220324911' // 渠道 id
  }
  getStartTime() {
    return this.start_time
  }
  setStartTime(start_time) {
    this.start_time = start_time
  }
  getEndTime() {
    return this.end_time
  }
  setEndTime(end_time) {
    this.end_time = end_time
  }
  getVideoId() {
    return this.video_id
  }
  setVideoId(video_id) {
    this.video_id = video_id
  }
  getVideoName() {
    return this.video_name
  }
  setVideoName(video_name) {
    this.video_name = video_name
  }
  getVideoType() {
    return this.video_type
  }
  setVideoType(video_type) {
    this.video_type = video_type
  }
  getAlbumId() {
    return this.album_id
  }
  setAlbumId(album_id) {
    this.album_id = album_id
  }
  getAlbumName() {
    return this.album_name
  }
  setAlbumName(album_name) {
    this.album_name = album_name
  }
  getIsPreview() {
    return this.is_preview
  }
  setIsPreview(is_preview) {
    this.is_preview = is_preview
  }
  getDefinition() {
    return this.definition
  }
  setDefinition(definition) {
    this.definition = definition
  }
  getCpId() {
    return this.cp_id
  }
  setCpId(cp_id) {
    this.cp_id = cp_id
  }
  getCdn() {
    return this.cdn
  }
  setCdn(cdn) {
    this.cdn = cdn
  }
  getIsVip() {
    return this.is_vip
  }
  setIsVip(is_vip) {
    this.is_vip = is_vip
  }
  getChannelId() {
    return this.channel_id
  }
  setChannelId(channel_id) {
    this.channel_id = channel_id
  }
}

/**
 * @进入VIP购买页面事件
 */
export class EnterOrderDataSent {
  constructor(data) {
    this.time = data?.time ?? '' // 点击进入时间 2018-01-01 00:00:00
    this.type = data?.type ?? '1' // 视频 vip 类型，6.0 版本改为上报大包 id
    this.source = data?.source ?? '普信互动课程' // 来源页
    this.video_id = data?.video_id ?? '' // 视频 id
    this.video_name = data?.video_name ?? '' // 视频名称
    this.video_type = '14' // 康佳少儿的专辑类型
    this.album_id = data?.album_id ?? '' // 专辑 id
    this.album_name = data?.album_name ?? '' // 专辑名称
    this.is_vip = data?.is_vip ?? '{}' // 是否视频 vip 会员{1}；非会员{}
    this.channel_id = data?.channel_id ?? '20220324911' // 渠道 id
  }
  getTime() {
    return this.time
  }
  setTime(time) {
    this.time = time
  }
  getType() {
    return this.type
  }
  setType(type) {
    this.type = type
  }
  getSource() {
    return this.source
  }
  setSource(source) {
    this.source = source
  }
  getVideoId() {
    return this.video_id
  }
  setVideoId(video_id) {
    this.video_id = video_id
  }
  getVideoName() {
    return this.video_name
  }
  setVideoName(video_name) {
    this.video_name = video_name
  }
  getVideoType() {
    return this.video_type
  }
  setVideoType(video_type) {
    this.video_type = video_type
  }
  getAlbumId() {
    return this.album_id
  }
  setAlbumId(album_id) {
    this.album_id = album_id
  }
  getAlbumName() {
    return this.album_name
  }
  setAlbumName(album_name) {
    this.album_name = album_name
  }
  getIsVip() {
    return this.is_vip
  }
  setIsVip(is_vip) {
    this.is_vip = is_vip
  }
  getChannelId() {
    return this.channel_id
  }
  setChannelId(channel_id) {
    this.channel_id = channel_id
  }
}
/**
 * @购买成功事件上报
 */
export class BuySuccessDataSent {
  constructor(data) {
    this.time = data?.time ?? '' // 购买成功时间 2018-01-01 00:00:00
    this.type = data?.type ?? '1' // 视频 vip 类型，6.0 版本改为上报大包 id
    this.source = data?.source ?? '普信互动课程' // 来源页
    this.video_id = data?.video_id ?? '' // 视频 id
    this.video_name = data?.video_name ?? '' // 视频名称
    this.video_type = '14' // 康佳少儿的专辑类型
    this.album_id = data?.album_id ?? '' // 专辑 id
    this.album_name = data?.album_name ?? '' // 专辑名称
    this.is_vip = data?.is_vip ?? '{}' // 是否视频 vip 会员{1}；非会员{}
    this.channel_id = data?.channel_id ?? '20220324911' // 渠道 id
  }
  getTime() {
    return this.time
  }
  setTime(time) {
    this.time = time
  }
  getType() {
    return this.type
  }
  setType(type) {
    this.type = type
  }
  getSource() {
    return this.source
  }
  setSource(source) {
    this.source = source
  }
  getVideoId() {
    return this.video_id
  }
  setVideoId(video_id) {
    this.video_id = video_id
  }
  getVideoName() {
    return this.video_name
  }
  setVideoName(video_name) {
    this.video_name = video_name
  }
  getVideoType() {
    return this.video_type
  }
  setVideoType(video_type) {
    this.video_type = video_type
  }
  getAlbumId() {
    return this.album_id
  }
  setAlbumId(album_id) {
    this.album_id = album_id
  }
  getAlbumName() {
    return this.album_name
  }
  setAlbumName(album_name) {
    this.album_name = album_name
  }
  getIsVip() {
    return this.is_vip
  }
  setIsVip(is_vip) {
    this.is_vip = is_vip
  }
  getChannelId() {
    return this.channel_id
  }
  setChannelId(channel_id) {
    this.channel_id = channel_id
  }
}
