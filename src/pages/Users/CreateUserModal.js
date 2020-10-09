/*
 * CreateUserModal.js
 * 添加新用户组件
 * 为指定的活动添加新的用户
 */

import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd'
import Axios from 'axios';
import { reqUrl } from '../../api/network'

class CreateUserModal extends Component {
    state = {
        typeId: null,
        userID: ""
    }
    onCancel = () => {
        this.props.toggleVisible(false)
    }
    handleOk = () => {
        this.onRegister()
    }
    handleTypeChange = e => {
        let info = this.state.typeId;
        info = e.target.value;
        this.setState({
            typeId: info
        })
    }
    handleUserChange = e => {
        let info = this.state.userId;
        info = e.target.value;
        this.setState({
            userId: info
        })
    }
    onRegister = async () => {
        const res = await Axios.put(reqUrl + 'v1/api/user/enterprise/card/add',
            {
                typeId: Number(this.state.typeId),
                userId: this.state.userId,
            })
        if (res.status === 200) {
            message.success('Success')
            this.props.onRegister()     //注册成功后，要刷新外面的数据
            this.onCancel()
        }
    }
    render() {
        const { visible } = this.props
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return (
            <Modal
                onCancel={this.onCancel}
                visible={visible}
                title='新增用户'
                centered
                onOk={this.handleOk}
            >
                <Form {...formItemLayout}>
                    <Form.Item label={'Activity ID'}>
                        <Input
                            value={this.state.typeId}
                            maxLength={16}
                            placeholder='Activity ID'
                            onChange={this.handleTypeChange}
                        />
                    </Form.Item>
                    <Form.Item label={'User ID'}>
                        <Input
                            value={this.state.userID}
                            maxLength={16}
                            placeholder="User ID"
                            onChange={this.handleUserChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default CreateUserModal;