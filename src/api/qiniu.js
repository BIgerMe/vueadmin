import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/z/qiniu/qiniuToken', // 假地址 自行替换
    method: 'get'
  })
}
