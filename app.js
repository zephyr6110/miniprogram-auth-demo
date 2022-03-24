// app.js
import Event from './utils/event.js';

// 发布/订阅模式来实现页面间通信(eventbus)
wx.event = new Event();

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    this.checkAuthorized();
  },
  globalData: {
    token: null,
    isLogin: false,
    userInfo: null,
  },
  async checkAuthorized() {
    try {
      // 微信授权登录
      await this.miniprogramLogin();

      // 发送登录成功
      wx.event.emit('loginSuccess');
    } catch (error) {
      // 发送登录失败
      wx.event.emit('loginFail');
    }
  },
  miniprogramLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async (res) => {
          if (res.code) {
            // 引入API请求方法，不能在顶部引入，顶部引入时App未初始化
            const { login } = require('./api/user');

            try {
              // 检查是否授权登录
              const params = {
                code: res.code,
              };
              const { data } = await login(params);
              this.globalData.userInfo = data.userInfo;
              this.globalData.token = data.token;
              this.globalData.isLogin = true;

              resolve(data.userInfo);
            } catch (error) {
              console.log('login error:', error);

              if (error.data) {
                // 保存 unionid 和 openid ，注册时使用
                this.globalData.unionid = error.data.unionid;
                this.globalData.openid = error.data.openid;
              }

              reject(error);
            }
          } else {
            reject(res);
          }
        },
      });
    });
  },
});
