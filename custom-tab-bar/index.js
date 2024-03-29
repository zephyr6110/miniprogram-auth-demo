const app = getApp();

Component({
  data: {
    selected: 0,
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    list: [
      {
        pagePath: '/pages/index/index',
        iconPath: '/image/icon_component.png',
        selectedIconPath: '/image/icon_component_HL.png',
        text: '首页',
      },
      {
        pagePath: '/pages/user/user',
        iconPath: '/image/icon_API.png',
        selectedIconPath: '/image/icon_API_HL.png',
        text: '个人中心',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;

      if (!app.globalData.isLogin) {
        wx.navigateTo({
          url: '/pages/login/login'
        });
        return;
      }

      wx.switchTab({ url });
      this.setData({
        selected: data.index,
      });
    },
  },
});
