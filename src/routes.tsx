import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import EquipmentTicket from './pages/Dashboard';
import Database from './pages/Database';
import Sidebar from './components/sidebar';
import { Layout } from 'antd';
const { Header, Content } = Layout;

function Routes() {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <div className="sidemenu-logo" />
        </Header>
        <Sidebar />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ padding: 24, minHeight: '100vh' }}>
            <Route path="/" exact={true} component={EquipmentTicket} />
            <Route path="/test" exact component={Database} />
          </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
