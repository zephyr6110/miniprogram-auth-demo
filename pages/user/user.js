// user.js
const app = getApp();

Page({
  data: {
    userInfo: {},
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },
});
