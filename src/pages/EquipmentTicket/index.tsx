import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import checkIcon from '../../assets/images/icons/check.svg';
import ticketIcon from '../../assets/images/icons/ticket.svg';
import banIcon from '../../assets/images/icons/ban.svg';
import binocularIcon from '../../assets/images/icons/binoculars.svg';

import { Layout, Divider, Card, Table, Spin, Col, Row, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Meta } = Card;

interface ResponsibleProps {
  name?: string;
}

function Dashboard() {
  const [ticketsResume, setTicketsResume] = useState({
    open_tickets: 0,
    closed_tickets: 0,
    canceled_tickets: 0,
    revised_tickets: 0,
  });

  const [openedTickets, setOpenedTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [loadingTickets, setLoadingTickets] = useState(false);

  useEffect(() => {
    api.get('').then((response) => {
      const { data } = response;
      setTicketsResume(data);
    });

    getTickets('open');
  }, []);

  const columns = [
    {
      title: 'Número',
      dataIndex: 'ticket_number',
      width: 100,
      render: (text: string) => <span>{`# ${text}`}</span>,
    },
    {
      title: 'Titulo',
      dataIndex: 'title',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsible',
      render: (text: ResponsibleProps) => <span>{`${text?.name || 'N/A'}`}</span>,
    },
    {
      title: 'Prioridade',
      dataIndex: 'priority',
      render: (text: ResponsibleProps) => <span>{`${text?.name || 'N/A'}`}</span>,
    },
    {
      title: 'Mesa',
      dataIndex: 'desk_name',
    },
  ];

  function getTickets(filter_type: string) {
    setLoadingTickets(true);
    api.get(``).then((response) => {
      const { data } = response;
      setOpenedTickets(data.service_desk_tickets);
      setTotalTickets(data.total_tickets);
      setLoadingTickets(false);
    });
  }

  function filterTicketsBy(filter_type: string) {
    if (loadingTickets) {
      return false;
    }
    getTickets(filter_type);
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="sidemenu-logo" />
      </Header>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            nav 4
          </Menu.Item>
          <Menu.Item key="5" icon={<CloudOutlined />}>
            nav 5
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            nav 6
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined />}>
            nav 7
          </Menu.Item>
          <Menu.Item key="8" icon={<ShopOutlined />}>
            nav 8
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ padding: 24, minHeight: '100vh' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card onClick={() => filterTicketsBy('open')}>
                <Meta
                  avatar={<img src={ticketIcon} alt="ticketIcon" />}
                  title={`${ticketsResume.open_tickets}`}
                  description={`Tickets abertos`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card onClick={() => filterTicketsBy('closed')}>
                <Meta
                  avatar={<img src={checkIcon} alt="checkIcon" />}
                  title={`${ticketsResume.closed_tickets}`}
                  description={`Tickets fechados`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card onClick={() => filterTicketsBy('canceled')}>
                <Meta
                  avatar={<img src={banIcon} alt="banIcon" />}
                  title={`${ticketsResume.canceled_tickets}`}
                  description={`Tickets cancelados`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card onClick={() => filterTicketsBy('review')}>
                <Meta
                  avatar={<img src={binocularIcon} alt="binocularIcon" />}
                  title={`${ticketsResume.revised_tickets}`}
                  description={`Revisão de tickets`}
                />
              </Card>
            </Col>
          </Row>

          <Spin tip="Loading..." spinning={loadingTickets}>
            <Divider orientation="left">Tickets {`(${totalTickets})`} </Divider>

            <Table size={'small'} rowKey="id" columns={columns} dataSource={openedTickets} scroll={{ y: 440 }} />
          </Spin>
        </div>
      </Content>
    </Layout>
  );
}

export default Dashboard;
