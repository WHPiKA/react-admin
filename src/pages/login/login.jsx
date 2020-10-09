/*
 * login.jsx
 * /login
 * 登录页面
 * 完成用户登录，为默认路由
 */

import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

import './login.css'
import { reqUrl } from '../../api/network'
// import {reqLogin} from '../../api'

// 登录的路由组件
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            loginPath: reqUrl + "v1/api/user/enterprise/login",
            loading: false,
            loginText: 'Login',
            account: '',
            password: '',
            rememberMe: true
        };
        // eslint-disable-next-line no-useless-constructor
    }
    handleAccountChange = (e) => {
        this.setState({ account: e.target.value });
    }
    handlePwdChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleRemberMe = (e) => {
        this.setState({ rememberMe: !this.rememberMe });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.form.validateFields((err, fieldsValue) => 
        // {
        //     if (err) 
        //     {
        //         alert("the form error!");
        //     }
        //     var data = this.props.form.getFieldsValue();
        //     console.info("表单值：",data);
        // });

        this.setState(
            {
                loading: true,
                loginText: 'Logining, wait a minute...'
            });

        // var accountValidate = () => {
        //     if((/^[a-zA-Z\d]+([-_][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/).test(this.state.account)) {
        //         return "mail";
        //     }
        //     else if((/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/).test(this.state.account)){
        //         return "phone";
        //     }
        //     else {
        //         return "";
        //     }
        // }

        // if(accountValidate()!=="")
        if (this.state.account.length === 11) {
            console.log(this.state.account);
            console.log(this.state.password);
            console.log(this.state.rememberMe);
            axios({
                method: 'PUT',
                url: this.state.loginPath,
                dataType: 'json',
                data: {
                    "account": this.state.account,
                    "password": this.state.password,
                    "remember": this.state.rememberMe,
                },
                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                }
                // xhrFields: {
                //     withCredentials: true
                // },
                // headers: {
                //     'My-Origin': 'http://localhost:3000',
                //   },
            }).then(res => {
                console.log('状态码是' + res.status);

                this.setState({
                    loading: false,
                    loginText: 'Logining, wait a minute...'
                });

                if (res.status === 200) {
                    console.log(res.data);
                    let data = res.data;
                    console.log(data.Manager);
                    console.log(data.EnterpriseId);

                    // getStore().dispatch(setUser(user)).catch((error) => { console.log(error)});
                    // sessionStorage.setItem('User', JSON.stringify(user));

                    // var user = JSON.stringify(data);
                    // console.log(user);
                    var path = {
                        pathname: '/admin',   //主界面
                        query: {
                            managerName: data.Manager.Name,
                            managerId: data.Manager.ID,
                            managerPhone: data.Manager.Phone,
                            enterpriseName: data.Manager.Enterprise,
                            enterpriseId: data.EnterpriseId
                        },
                    }
                    this.props.history.push(path);
                    message.success("Login succeed!");
                }
                else {
                    alert('Fail to login, username or password is incorrect');
                }
            })
        }
        else {
            alert(this.state.account + ' is not a validate telphone number!');
            this.setState({
                loading: false,
                loginText: 'Login',
                account: '',
                password: '',
                rememberMe: false
            });
        }
    }

    handleForgetPassword = (e) => {
        // history.push('/forgetPassword');
        this.props.history.push('/');
    }

    // handleRegister = event => {
    //     history.push('/register');
    // }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="rightDiv">
                <div className="login">
                    <header className="login-header">
                        <h1>GF Membership Card —— Enterprise Edition</h1>
                    </header>
                    <section className="login-content">
                        <h2>Login</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true, message: '请输入用户名!',
                                    },
                                    {
                                        min: 4, message: '用户名至少为4位',
                                    },
                                    {
                                        max: 12, message: '用户名最多为12位',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须为英文字母、数字或下划线组成',
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Account(tel)"
                                    value={this.state.account}
                                    onChange={this.handleAccountChange}
                                    type="text"
                                    className="form-control" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePwdChange}
                                    className="form-control"
                                />
                            </Form.Item>
                            <Form.Item className="remember">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="remember-me">Remember me</Checkbox>
                                </Form.Item>
                                <a className="login-form-forgot" href="/#">
                                    Forget Password
                            </a>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit} className="login-form-button">
                                    Login
                            </Button>
                                <a href="/register" className="register">Register</a>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </Form>

        )
    }
}


// 1. 前台表单验证

// 2. 收集表单输入数据