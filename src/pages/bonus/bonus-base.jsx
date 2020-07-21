/*
 * bonus-base.jsx
 * 优惠模板
 * 发布优惠促销活动的模板
 * 未完成
 */

import React, { Component } from 'react';

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import './bonus-base.css'

// 优惠路由

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: '/card/newcard',
        title: `优惠模板 ${i + 1}`,
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjHtKtnx06ku6TgeibfgE5mGc1gkvkTNDj20c9lSJqL6-KWDc5&usqp=CAU',
        description:
            '这是一个折扣卡的优惠模板，如果您需要快速发布一张卡片，可以使用该模板。',
        content:
            '您可以点击编辑修改模板内的具体数值，如折扣幅度，折扣范围的产品区间，支持使用的次数等。本模板提供了简洁的卡片格式，您只需要修改少量信息即可定制一张特殊的卡片，进行快速发布。',
    });
}

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export default class Home extends Component {


    render() {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 4,
                        className: "page",
                    }}
                    dataSource={listData}
                    footer={
                        <div className="footer">
                            <b>GF商家端</b> 为您提供
                    </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}