/*
 * register.jsx
 * /register
 * 注册页面
 * 注册新的商铺，需要上传营业执照
 * 未完成
 */

import React, { Component } from 'react'

import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Checkbox,
    Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { reqUrl } from '../../api/network'


import './register.css'

// 管理的路由组件
export default class Register extends Component {

    render() {

        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const onFinish = values => {
            if (values) {
                message.success('注册成功！')
                // 跳转到登录页面
                this.props.history.replace('/login')
            }
        };

        const residences = [
            {
                value: 'sichuan',
                label: '四川',
                children: [
                    {
                        value: 'chengdu',
                        label: '成都',
                        children: [
                            {
                                value: 'qingyangqu',
                                label: '青羊区',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'jiangxi',
                label: '江西',
                children: [
                    {
                        value: 'nanchang',
                        label: '南昌',
                        children: [
                            {
                                value: 'gaoxinxiqu',
                                label: '高新西区',
                            },
                        ],
                    },
                ],
            },
        ];

        return (
            <div className="register">
                <header className="register-header">
                    <h1>GF 卡包管理商家端</h1>
                </header>
                <section className="register-content">
                    <h2>用户注册</h2>

                    <Form
                        // {...formItemLayout}
                        // form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            residence: ['北京', '中国'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: '您的输入不是正确的邮箱!',
                                },
                                {
                                    required: true,
                                    message: '请输入您的E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="设置密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="确认密码"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请确认您的密码!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('密码与您设置的不一致!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label={
                                <span>
                                    公司名称&nbsp;
                            <Tooltip title="请填写与营业执照对应的公司全称">
                                        <QuestionCircleOutlined />
                                    </Tooltip>
                                </span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的公司名称!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="position"
                            label="公司地址"
                            rules={[
                                {
                                    type: 'array',
                                    required: true,
                                    message: '请选择您的公司地址！!',
                                },
                            ]}
                        >
                            <Cascader options={residences} />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="联系电话"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的联系电话!',
                                },
                            ]}
                        >
                            <Input
                                // addonBefore={prefixSelector}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="upload"
                            label="营业执照"
                            rules={[
                                {
                                    required: true,
                                    message: '请上传您的营业执照!',
                                },
                            ]}
                        >
                            <Upload {...props}>
                                <Button>
                                    <UploadOutlined /> 点击上传
                            </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject('请阅读使用协议'),
                                },
                            ]}
                        // {...tailFormItemLayout}
                        >
                            <Checkbox>
                                我已阅读 <a href="#">GF卡包管家使用协议</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                注册
                        </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}