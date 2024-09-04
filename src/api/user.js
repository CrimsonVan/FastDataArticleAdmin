import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('http://big-event-vue-api-t.itheima.net/api/reg', { username, password, repassword })

// 登录接口
export const userLoginService = ({ username, password }) =>
  request.post('http://127.0.0.1:3007/api/login', { username, password })

// 获取用户基本信息
export const userGetInfoService = () => request.get('http://127.0.0.1:3007/my/userinfo')

// 更新用户基本信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  // request.put('http://127.0.0.1:3007/my/userinfo', { id, nickname, email })
request.post('http://127.0.0.1:3007/my/userinfo', { id, nickname, email })


// 更新用户头像
export const userUpdateAvatarService = (avatar) =>
  // request.patch('http://127.0.0.1:3007/my/update/avatar', { avatar })
request.post('http://127.0.0.1:3007/my/update/avatar', { avatar })


// 更新用户密码
export const userUpdatePasswordService = ({ oldPwd, newPwd, re_pwd }) =>
  // request.patch('http://127.0.0.1:3007/my/updatepwd', { old_pwd, new_pwd, re_pwd })
request.post('http://127.0.0.1:3007/my/updatepwd', { oldPwd, newPwd, re_pwd })
