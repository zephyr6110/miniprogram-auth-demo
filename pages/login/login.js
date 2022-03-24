// login.js
import { register } from '../../api/user';

const app = getApp();

Page({
  data: {},
  onLoad() {},
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      this._doRegister(e);
    } else {
      console.log(e.detail.errMsg);
    }
  },
  _doRegister(e) {
    wx.showLoading({
      title: '提交中',
    });

    let params = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      openid: app.globalData.openid,
    };
    register(params)
      .then(({ data }) => {
        app.globalData.userInfo = data.userInfo;
        app.globalData.token = data.token;
        app.globalData.isLogin = true;

        wx.navigateBack();

        wx.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log(error);

        wx.showToast({
          title: '授权失败，错误信息：' + error.message,
          icon: 'none',
          duration: 2000,
        });
      });
  },
});
