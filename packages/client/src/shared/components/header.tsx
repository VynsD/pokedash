import React, { Component } from 'react';
import * as ANTD from 'antd';

// Consts
const { TabPane } = ANTD.Tabs;
// Props
type HeaderProps = {
  callDashboard: () => void;
  callPokedex: () => void;
}

export class Header extends Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }
  checkKey = (key: string): void => {
    key === "1" ? this.props.callDashboard() : this.props.callPokedex();
  }

  render() {
    return (
      <header className="header-wrapper">
        <ANTD.PageHeader
          title=""
          footer={
            <ANTD.Tabs defaultActiveKey="1"
              onChange={this.checkKey}>
              <TabPane
                tab="DashBoard"
                key="1">
                {/* Carico la DashBoard */}
              </TabPane>
              <TabPane
                tab="Pokedex"
                key="2">
                {/* Carico Il Pokedex */}
              </TabPane>
            </ANTD.Tabs>
          }
        ></ANTD.PageHeader>
      </header>
    );
  }
}

export default Header;
