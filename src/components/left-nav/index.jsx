/*
 * index.jsx
 * 侧边导航栏
 * 侧边作为一个Menu控制内容的跳转
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import './index.css'

// 左侧导航栏组件

const { SubMenu } = Menu;


export default class LeftNav extends Component {
  render() {

    return (
      <div className="left-nav">
        <div>
          <Link to='/admin/home' className="left-nav-header">
            <div className="title">GF 商家页面</div>
          </Link>
        </div>
        <div className="left-nav-menu">
          <Menu
            mode="inline"
            // openKeys={this.state.openKeys}
            // onOpenChange={this.onOpenChange}
            style={{ width: 256 }}
            className="menu"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <MailOutlined />
                  <span>卡片管理</span>
                </span>
              }
            >
              <Menu.Item key="card/mycard">
                <Link to='/admin/card/mycard'>
                  <span>我的卡片</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="card/newcard">
                <Link to='/admin/card/newcard'>
                  <span>卡片发布</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="card/users">
                <Link to='/admin/card/users'>
                  <span>用户管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="用户设置">
              <Menu.Item key="user">
                <Link to='/admin/user'>
                  <span>个人信息</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="优惠活动">
              <Menu.Item key="bonus/date">
                <Link to='/admin/bonus/date'>
                  <span>活动日历</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="bonus/base">
                <Link to='/admin/bonus/base'>
                  <span>优惠模板</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    )
  }
}