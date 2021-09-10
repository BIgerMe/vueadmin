import request from '@/utils/request'
import qs from 'qs'

export function ShareFloatList(data) {
  return request({
    url: '/z/stock/sharefloatlist',
    method: 'get',
    params: { data }
  })
}
export function StockBasicList(data) {
  return request({
    url: '/z/stock/stockbasiclist',
    method: 'get',
    params: { data }
  })
}

