// index.js
import { user } from '../../api/user';

const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }

    // 模拟获取数据
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    if (app.globalData.isLogin) {
      // 做一些登录后的操作..
      this.getData();
    } else {
      // 监听登录成功
      wx.event.on('loginSuccess', () => {
        // 做一些登录后的操作..
        this.getData();
      });

      // 监听登录失败
      wx.event.on('loginFail', () => {
        wx.hideLoading();

        wx.navigateTo({
          url: '/pages/login/login'
        });
      });
    }
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
  },
  getData() {
    // 获取个人信息
    user()
      .then(({ data }) => {
        // console.log(data)

        wx.hideLoading();
      })
      .catch((error) => {
        // console.log(error);

        wx.hideLoading();
      });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
