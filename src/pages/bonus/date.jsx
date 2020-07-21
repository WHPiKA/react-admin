/*
 * date.jsx
 * 活动日历页面
 * 在日历上展示商家所有活动记录
 * 未完成
 */

import React, { Component } from 'react';
import { Calendar, Badge } from 'antd';

// 优惠日历路由

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: '会员卡活动结束' },
        { type: 'success', content: '会员卡活动开始' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: '优惠卡活动结束' },
        { type: 'success', content: '优惠卡活动开始' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: '兑换卡活动结束' },
        { type: 'success', content: '兑换卡活动开始' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 120;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <span>活动数目</span>
      <section>{num}</section>
    </div>
  ) : null;
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      </div>
    )
  }
}