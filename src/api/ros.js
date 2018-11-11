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

export function download(filename) {
  return request({
    url: '/ros/download/' + filename,
    method: 'get'
  })
}

export function deleteFile(filename) {
  return request({
    url: '/ros/delete/' + filename,
    method: 'get'
  })
}
