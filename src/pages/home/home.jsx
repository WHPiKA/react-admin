/*
 * home.jsx
 * /admin/home
 * 主页
 * 预设主页，展示欢迎信息、广告信息等
 * 未完成
 */

import React, { Component } from 'react';

import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import './home.css'

// 首页路由

const { Paragraph } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        删除卡片
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        编辑卡片
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        标注重要
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: 'none',
          padding: 0,
        }}
      >
        <EllipsisOutlined
          style={{
            fontSize: 20,
            verticalAlign: 'top',
          }}
        />
      </Button>
    </Dropdown>
  );
};

const routes = [
  {
    path: '/mycard',
    breadcrumbName: '所有卡片',
  },
  {
    path: '/mycard',
    breadcrumbName: '会员卡',
  },
  {
    path: 'second',
    breadcrumbName: 'VIP尊享卡片',
  },
];

const IconLink = ({ src, text }) => (
  <a className="example-link" href="#">
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
);

const content = (
  <>
    <Paragraph>
      本会员卡创建自2020年5月21日，活动时长为一年。本会员卡对任何持有人都有效，并且在所有线下门店都可使用。
    </Paragraph>
    <Paragraph>
      活动政策：本会员卡的任意持卡人，持本卡在线下门店购买任何产品，可享受9折优惠，并且提供优质的VIP服务。节假日及门店活动日可享受最高折扣之上叠加九折的优惠。最终解释权归公司方所有。
    </Paragraph>
    <div>
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
        text="门店列表"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
        text="商品一览"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
        text="用户概况"
      />
    </div>
  </>
);

const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};

export default class Home extends Component {
  render() {
    return (
      <div className="home-content">
        <PageHeader
          title="VIP尊享金卡"
          className="site-page-header"
          subTitle="会员专属优惠卡片"
          tags={<Tag color="blue">活动中</Tag>}
          extra={[
            <Button key="3">编辑卡片</Button>,
            <Button key="2">查看卡片</Button>,
            <Button key="1" type="primary">
              停止活动
                    </Button>,
            <DropdownMenu key="more" />,
          ]}
          avatar={{ src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjHtKtnx06ku6TgeibfgE5mGc1gkvkTNDj20c9lSJqL6-KWDc5&usqp=CAU' }}
          breadcrumb={{ routes }}
        >
          <Content
            extraContent={
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                alt="content"
                width="100%"
              />
            }
          >
            {content}
          </Content>
        </PageHeader>
      </div>
    )
  }
}