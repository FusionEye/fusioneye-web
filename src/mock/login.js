import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  logout: {
    code: 20000,
    data: 'success'
  }
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    const user = userMap[username]
    console.log(user)
    return user
  },
  getInfo: config => {
    const { token } = param2Obj(config.url)
    const tokenCode = userMap[token]
    if (tokenCode) {
      console.log(tokenCode)
      return tokenCode
    } else {
      return false
    }
  },
  logout: () => {
    return userMap['logout']
  }
}
