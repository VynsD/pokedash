import React, { Component } from 'react';
import * as ANTD from 'antd';

// Constants
const { TabPane } = ANTD.Tabs;

function Header(props: any) {
  return (
    <header className="header-wrapper">
      <ANTD.PageHeader
        className="header-wrapper"
        title=""
        footer={
          <ANTD.Tabs defaultActiveKey="1">
            <TabPane
              tab="DashBoard"
              key="1">
              Carico la DashBoard
            </TabPane>
            <TabPane
              tab="Pokedex"
              key="2">
              Carico Il Pokedex
            </TabPane>
          </ANTD.Tabs>
        }
      ></ANTD.PageHeader>
    </header>
  );
}

export default Header;
