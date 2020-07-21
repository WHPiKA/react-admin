/*
 * App.js
 * 最高层
 * 目前在此页面进行登录、注册和主页的路由配置
 */

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Register from './pages/register/register'

// 应用的根组件
export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch> {/* 只匹配其中一个 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Redirect from='/' to='/login' />
        </Switch>
      </BrowserRouter>
    )
  }
}