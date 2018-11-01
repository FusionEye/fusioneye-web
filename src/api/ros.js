import request from '@/utils/request'

export function fetchBagList() {
  return request({
    url: '/ros/list',
    method: 'get'
  })
}

export function record() {
  return request({
    url: '/ros/record',
    method: 'get'
  })
}

export function close() {
  return request({
    url: '/ros/close',
    method: 'get'
  })
}
