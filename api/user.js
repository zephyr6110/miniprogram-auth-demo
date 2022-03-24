import request from '../utils/request';

export function login(data) {
  /* return request({
    url: '/api/auth/login',
    method: 'post',
    data,
  }); */

  // 模拟数据
  return new Promise((resolve, reject) => {
    /* setTimeout(() => {
      resolve({
        code: 0,
        data: {
          userInfo: { username: 'admin', email: 'admin@test.com' },
          token: 'd3d3LmJhaWR1LmNvbQ==',
          unionid: 'YWRtaW4udW5pb25pZA==',
          openid: 'W4uYWRtab3Blbmlk==',
        },
        message: '登录成功',
      });
    }, 1500); */

    setTimeout(() => {
      reject({
        code: 401,
        data: {},
        message: 'Unauthorized',
      });
    }, 1500);
  });
}

export function register(data) {
  /* return request({
    url: '/api/auth/register',
    method: 'post',
    data,
  }); */

  // 模拟数据
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          userInfo: { username: 'admin', email: 'admin@test.com' },
          token: 'd3d3LmJhaWR1LmNvbQ==',
          unionid: 'YWRtaW4udW5pb25pZA==',
          openid: 'W4uYWRtab3Blbmlk==',
        },
        message: '登录成功',
      });
    }, 1500);
  });
}

export function logout(data) {
  return request({
    url: '/api/auth/logout',
    method: 'post',
    data,
  });
}

export function user() {
  return request({
    url: '/api/auth/getInfo',
    method: 'get',
  });
}
