/*
 * AccountContext.js
 * 登录用户信息Context
 * 存放已登录的用户的信息
 */

import React from 'react';

export const AccountContext = React.createContext({
    account: "",
    toggleAccount: () => { },
});