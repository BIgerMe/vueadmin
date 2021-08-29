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

export function updateContent(data){
  return request({
    url: '/z/bearing/updateContent',
    method: 'post',
    data
  })
}

export function update(data){
  return request({
    url: '/z/bearing/update',
    method: 'post',
    data
  })
}


