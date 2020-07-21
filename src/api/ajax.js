// 发送异步ajax请求的函数模块
// 函数的返回值是promise对象

import axios from 'axios'

export default function ajax(url, data={}, type="GET") {
    if(type==='GET') {
        return axios.get(url, {  //配置对象
            params: data  //指定请求参数
        })
    }else{
        return axios.post(url, data)
    }
}

// 请求登录接口
ajax('./login', {username: 'admin', password: 'admin'}, 'POST').then()