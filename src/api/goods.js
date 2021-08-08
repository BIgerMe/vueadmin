import request from '@/utils/request'
import qs from 'qs'

export function add(data) {
  return request({
    url: '/z/goods/add',
    method: 'post',
    data
  })
}

export function search(data) {
  return request({
    url: '/z/goods/search',
    method: 'get',
    params: { data }
  })
}

export function del() {
  return request({
    url: '/z/goods/delete',
    method: 'post',
    data
  })
}
