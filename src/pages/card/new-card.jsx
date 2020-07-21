/*
 * new-card.jsx
 * /admin/card/newcard
 * 发布新卡
 * 未完成
 */

import React from 'react';

import { Steps, Button, message } from 'antd';
import { Form, Input, DatePicker } from 'antd';

import { Upload, Select, Tag } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

import './new-card.css';

// 发布卡片路由

const { Step } = Steps;

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: '默认封面（深色）.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: '2',
      name: '默认封面（浅色）.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    }
  ],
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: '下载 ',
    showRemoveIcon: true,
    removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
  },
};

const options = [{ value: '半价优惠' }, { value: '买一赠一' }, { value: '第二份半价' }, { value: '抽奖' }];

function tagRender(props) {
  const { label, value, closable, onClose } = props;

  return (
    <Tag label={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  );
}

const steps = [
  {
    title: '完善基本信息',
    content:
      <div className="information-content">
        <Form name="nest-messages">
          <Form.Item
            name={['user', 'name']}
            label="卡片名称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="range-picker" label="活动时间范围" {...rangeConfig}>
            <RangePicker className="range" />
          </Form.Item>

          <Form.Item name={['user', 'website']} label="店铺官网">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="简介">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    ,
  },
  {
    title: '选择优惠活动',
    content:
      <div className="bonus">
        <Select
          mode="multiple"
          tagRender={tagRender}
          defaultValue={['第二份半价', '限时五折']}
          style={{ width: '100%' }}
          options={options}
        />
        <div className="bonus-tips">
          键入您的优惠活动描述，以回车键结尾
          </div>
      </div>
    ,
  },
  {
    title: '上传卡片封面',
    content:
      <div>
        <Upload {...props}>
          <Button className="upload-icon">
            <UploadOutlined /> 上传封面
            </Button>
        </Upload>
      </div>
    ,
  },
];

export default class Newcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="new-card-content">
        <div className="new-card-step">
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </div>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('卡片发布成功!')}>

              <Link to='/card/mycard'>完成</Link>
            </Button>
          )}
          {/* {current > 0 && (
            <Button className="previous-button" style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              Previous
            </Button>
          )} */}
        </div>
      </div>
    );
  }
}