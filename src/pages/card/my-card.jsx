/*
 * my-card.jsx
 * /admin/card/mycard
 * 展示本商家已拥有的卡片
 */

import React, { Component } from 'react';
import { Card, Row, Col, Descriptions } from 'antd';

import './my-card.css';
import { AccountContext } from '../../utils/AccountContext';
import Axios from 'axios';

// 卡片路由

export default class Mycard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardList: []
        }
    }

    componentDidMount() {
        const account = this.context.account;
        Axios({
            method: 'GET',
            url: "http://106.15.198.136:8080/v1/api/user/enterprise/" + account.enterpriseName,
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.status);

                if (res.status === 200) {
                    let data = res.data;
                    this.setState(
                        {
                            cardList: data
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        var items = [];
        this.state.cardList.map((item, index) => {
            items.push(
                <Col span={8}>
                    <Card bordered={true} style={{ float: 'left', width: 400, margin: ' 30px' }}>
                        <Descriptions column={1}>
                            <Descriptions.Item label="ID">{item.Id}</Descriptions.Item>
                            <Descriptions.Item label="Card Type">{item.CardType}</Descriptions.Item>
                            <Descriptions.Item label="Activity">{item.Coupons}</Descriptions.Item>
                            <Descriptions.Item label="Description">{item.Describe}</Descriptions.Item>
                            <Descriptions.Item label="Expire Time">{item.ExpireTime}</Descriptions.Item>
                            <Descriptions.Item label="Address">{item.City + item.State}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>

            )
        })

        return (
            <div>
                <div className="site-card-border-less-wrapper">
                    <Row gutter={16}>
                        {items}
                    </Row>
                </div>
            </div>
        )
    }
}
Mycard.contextType = AccountContext;