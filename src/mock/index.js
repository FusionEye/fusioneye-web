import Mock from 'mockjs'
// import caseAPI from './case'
import loginAPI from './login'

// Mock.setup({
//   timeout: '350-600'
// })

Mock.mock(/\/user\/login/, 'post', loginAPI.login)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)

export default Mock
