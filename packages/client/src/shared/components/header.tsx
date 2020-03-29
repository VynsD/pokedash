import React, { Component, Props } from 'react';
import * as ANTD from 'antd';

// Constants
const { TabPane } = ANTD.Tabs;

type HeaderProps = {
  callDashboard: any,
  callPokedex: any,
}
export class Header extends Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }

  checkKey = (key: string): void => {
    console.log(key);
    key === "1" ? this.props.callDashboard() : this.props.callPokedex();
  }

  render() {
    return (
      <header className="header-wrapper">
        {/*className="headerWrapper"*/}
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
