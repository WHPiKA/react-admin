/*
 * index.js
 * /admin/card/users
 * 用户管理页面
 * 管理用户，可通过活动编号搜索所有参与的用户，并可添加以及删除用户
 * 删除用户仅修改DelTime，为完成恢复功能做准备
 */

import React, { Component } from 'react';
import { Table, Card, Form, Input, Button, Row, Col, Popconfirm, notification } from 'antd'
import { DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import CreateUserModal from './CreateUserModal'
import axios from 'axios';
import { reqUrl } from '../../api/network'
const defaultTime = moment("0001-01-01T00:00:00Z").format('YYYY-MM-DD HH:mm:ss');

class Users extends Component {
    state = {
        users: [],    //用户列表
        usersLoading: false,//获取用户loading
        isShowCreateModal: false,
        activityNum: null,
    }

    getUsers = async () => {
        this.setState({
            usersLoading: true,
        })
        const res = await axios.get(reqUrl + 'v1/api/user/enterprise/card/search/' + this.state.activityNum)
        if (res.status !== 200) {
            this.setState({
                usersLoading: false,
            })
            return
        }
        console.log(res.status);
        console.log(res.data);
        let data = [];
        for (let i = 0; i < res.data.all_card_demo.length; i++) {
            if (res.data.all_card_demo[i].DelTime === "0001-01-01T00:00:00Z") {
                data.push(res.data.all_card_demo[i]);
            }
        }
        this.setState({
            usersLoading: false,
            users: data
        })
        console.log(data);
    }
    /**
     * 处理输入
     */
    handleChange = e => {
        let info = this.state.activityNum;
        info = e.target.value;
        this.setState({
            activityNum: info
        })
    }
    /**
     * 搜索函数
     */
    onSearch = () => {
        this.getUsers()
    }
    singleDelete = async (record) => {
        console.log(record);
        const res = await axios.get(reqUrl + 'v1/api/user/enterprise/card/delete/' + record.CardId)
        console.log(res.status);
        if (res.status === 200) {
            notification.success({
                message: '删除成功'
            })
        }
        this.getUsers();
    }
    toggleShowCreateModal = (visible) => {
        this.setState({
            isShowCreateModal: visible
        })
    }

    render() {
        const { users, usersLoading, isShowCreateModal } = this.state
        const columns = [
            {
                title: 'Card ID',
                key: 'String',
                dataIndex: 'CardId',
                align: 'center',
            },
            {
                title: 'Account',
                dataIndex: 'UserId',
                align: 'center'
            },
            {
                title: 'Score',
                dataIndex: 'Score',
                align: 'center',
                sorter: (a, b) => a.score - b.score
            },
            {
                title: 'Coupon num',
                dataIndex: 'CouponsNum',
                align: 'center'
            },
            {
                title: 'Register date',
                dataIndex: 'StartTime',
                align: 'center',
                render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
                sorter: (a, b) => a.StartTime - b.StartTime
            },
            {
                title: 'Expire time',
                dataIndex: 'ExpireTime',
                align: 'center',
                render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: 'Delete time',
                dataIndex: 'DelTime',
                align: 'center',
                render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
            },
            {
                title: 'Actions',
                key: 'active',
                align: 'center',
                render: (record) => (
                    <div style={{ textAlign: 'left' }}>
                        {
                            <Popconfirm title='您确定删除该用户吗？' onConfirm={() => this.singleDelete(record)}>
                                <Button type='danger' icon={<DeleteOutlined />}>Delete</Button>
                            </Popconfirm>
                        }
                    </div>
                )
            },
        ]
        return (
            <div style={{ padding: 24 }}>
                <Card bordered={false}>
                    <Form layout='inline' style={{ marginBottom: 16 }}>
                        <Row>
                            <Col span={20}>
                                <Form.Item label="Activity Num">
                                    <Input
                                        value={this.state.activityNum}
                                        onPressEnter={this.onSearch}
                                        style={{ width: 200 }}
                                        placeholder="Activity Num"
                                        onChange={this.handleChange}
                                    />
                                </Form.Item>
                            </Col>
                            {/*<Col span={7}>
                                <Form.Item label="Register after">
                                    {getFieldDecorator('startTime')(
                                        <DatePicker style={{ width: 200 }} showTime />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item label="Register before">
                                    {getFieldDecorator('endTime')(
                                        <DatePicker style={{ width: 200 }} showTime />
                                    )}
                                </Form.Item>
                            </Col>*/}
                            <Col span={2}>
                                <Form.Item style={{ marginRight: 0, width: '100%' }} wrapperCol={{ span: 24 }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <Button type="primary" icon={<SearchOutlined />} onClick={this.onSearch}>Search</Button>&emsp;
                                        {/*<Button icon={<RedoOutlined />} onClick={this.onReset}>Reset</Button>*/}
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div style={{ marginBottom: 16, textAlign: 'right' }}>
                        <Button type='primary' icon={<PlusOutlined />} onClick={() => this.toggleShowCreateModal(true)}>Add</Button>&emsp;
                        {/*<Button type='danger' icon='delete' disabled={!selectedRowKeys.length} onClick={this.batchDelete}>批量删除</Button>*/}
                    </div>
                    <Table
                        bordered
                        rowKey='CardId'
                        columns={columns}
                        dataSource={users}
                        loading={usersLoading}
                        onChange={this.onTableChange}
                    />
                </Card>
                <CreateUserModal visible={isShowCreateModal} toggleVisible={this.toggleShowCreateModal} onRegister={this.getUsers} />
            </div>
        );
    }
}

export default Users;