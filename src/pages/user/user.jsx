/*
 * user.jsx
 * /admin/user
 * 个人信息页面
 * 展示店铺信息以及管理员信息，并可修改信息
 * 未完成
 */

import React from 'react';
import { Layout, Breadcrumb, Descriptions, Space } from 'antd';
import {
    MenuFoldOutlined,
    SearchOutlined,
    BellOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios';
import { AccountContext } from '../../utils/AccountContext';
import { reqUrl } from '../../api/network'

const { Content } = Layout;
// const { SubMenu } = Menu;
// 用户路由

// export default class Home extends Component {
//     render() {
//         return (
//             <div>User</div>
//         )
//     }
// }


class EnterpriseInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state =
        {
            Id: "",
            Addr: "",
            Name: "",
            ischanged: false,
            collapsed: false,
            base64: "",
            Managername: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.setState(
            {
                ischanged: true
            });
    }

    componentDidMount() {
        let user = this.context.account;
        console.log(user);
        axios({
            method: 'GET',
            url: reqUrl + "v1/api/user/enterprise/info/" + user.enterpriseId,
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
                    console.log(data.enterprise);
                    console.log(data.managerList);
                    console.log(data.enterprise.Id)
                    console.log(data.base64);

                    this.setState(
                        {
                            Id: data.enterprise.Id,
                            Addr: data.enterprise.Addr,
                            Name: data.enterprise.Name,
                            base64: data.base64,
                            Managername: data.managerList[0].Name,
                        });
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    hadleclik = (e) => {
        console.log(this.state.Id);
    }

    handleChange = (e) => {
        this.setState(
            {
                ischanged: true
            });
        axios({
            method: 'GET',
            url: reqUrl + "v1/api/user/enterprise/info/" + "002",
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
                    console.log(data.enterprise);
                    console.log(data.managerList);
                    console.log(data.enterprise.Id)
                    console.log(data.base64);

                    this.setState(
                        {
                            Id: data.enterprise.Id,
                            Addr: data.enterprise.Addr,
                            Name: data.enterprise.Name,
                            base64: data.base64,
                            Managername: data.managerList[0].Name,
                        });
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Descriptions title="商家信息" layout="vertical">
                                <Descriptions.Item label="店铺编号">{this.state.Id}</Descriptions.Item>
                                <Descriptions.Item label="店铺名称">{this.state.Name}</Descriptions.Item>
                                <Descriptions.Item label="地址">{this.state.Addr}</Descriptions.Item>
                                <Descriptions.Item label="管理员姓名">{this.state.Managername}</Descriptions.Item>
                                <Descriptions.Item label="店铺图片"><img src={this.state.base64} alt="" /></Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
EnterpriseInfo.contextType = AccountContext;

export default EnterpriseInfo;