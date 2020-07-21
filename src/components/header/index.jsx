/*
 * index.jsx
 * 头部导航栏组件
 * 该组件包括登录用户名、头像、退出登录按钮
 * 退出登录消费Context中的toggle函数
 */

import React, { Component } from 'react'
import './index.css'

import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { AccountContext } from '../../utils/AccountContext';

// 头部导航栏组件

export default class Header extends Component {
    render() {
        return (
            <AccountContext.Consumer>
                {({ account, toggleAccount }) => (
                    <div className="header">
                        <div className="exit">
                            <Button type="text" danger onClick={toggleAccount}>退出</Button>
                        </div>
                        <div className="welcome">
                            <span className="white">{account.managerName}</span>
                        </div>
                        <Avatar className="icon" icon={<UserOutlined />} />
                    </div>
                )}
            </AccountContext.Consumer>

        )
    }
}
Header.contextType = AccountContext;