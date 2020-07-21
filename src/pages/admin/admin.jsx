/*
 * admin.jsx
 * 主页的最高层
 * 在此页面配置内容的路由
 * 使用登录账户的信息生产Context
 */

import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { Layout } from 'antd';

// import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import { AccountContext } from '../../utils/AccountContext'

import Home from '../home/home'
import Card from '../card/my-card'
import Newcard from '../card/new-card'
import User from '../user/user'
import Bonus from '../bonus/bonus-base'
import Date from '../bonus/date'
import Users from '../Users/index'

const { Footer, Sider, Content } = Layout;

// 管理的路由组件
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            account: {
                managerId: "",
                managerName: "",
                managerPhone: "",
                enterpriseName: "",
                enterpriseId: ""
            },
            toggleAccount: () => { }
        }
        let account = this.props.location.query;
        if (account !== undefined) {
            console.log(1.5);
            this.state = {
                account: {
                    managerId: account.managerId,
                    managerName: account.managerName,
                    managerPhone: account.managerPhone,
                    enterpriseName: account.enterpriseName,
                    enterpriseId: account.enterpriseId
                },
                toggleAccount: this.toggleAccount
            };
        }
        console.log(this.state);
    }

    toggleAccount = () => {
        this.setState({
            account: {},
            toggleAccount: () => { }
        })
        this.props.history.push('/login');
    }

    render() {
        // const user = memoryUtils.user
        // if (!user || !user.id) {
        //     return <Redirect to='./login'>
        // }

        return (
            <AccountContext.Provider value={this.state}>
                <Layout className="total">
                    <Sider width="256px">
                        <LeftNav />
                    </Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{ backgroundColor: '#fff' }}>
                            <Switch>
                                <Route path='/admin/home'>
                                    <Home />
                                </Route>
                                <Route path='/admin/card/mycard'>
                                    <Card />
                                </Route>
                                <Route path='/admin/card/newcard'>
                                    <Newcard />
                                </Route>
                                <Route path='/admin/card/users'>
                                    <Users />
                                </Route>
                                <Route exact path='/admin/user'>
                                    <User />
                                </Route>
                                <Route path='/admin/bonus/base'>
                                    <Bonus />
                                </Route>
                                <Route path='/admin/bonus/date'>
                                    <Date />
                                </Route>
                                <Route>
                                    <Home />
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </AccountContext.Provider>
        )
    }
}