import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/z/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/z/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/z/user/logout',
    method: 'post'
  })
}

export function update(data){
  return request({
    url: '/z/user/update',
    method:'post',
    data:data
  })
}
export function changePassword(data){
  return request({
    url: '/z/user/changepassword',
    method:'post',
    data:data
  })
}
