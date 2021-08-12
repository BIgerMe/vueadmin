import request from '@/utils/request'
import qs from 'qs'

export function add(data) {
  return request({
    url: '/z/bearing/add',
    method: 'post',
    data
  })
}

export function search(data) {
  return request({
    url: '/z/bearing/search',
    method: 'get',
    params: { data }
  })
}

export function del() {
  return request({
    url: '/z/bearing/delete',
    method: 'post',
    data
  })
}
