// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb } from 'antd';

// Components
import HeaderComponent from './Global/Header';
import ContentComponent from './Global/Content';
import FooterComponent from './Global/Footer';

// Data
import items from '../data/menu';

// Assets
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { Header, Content, Footer } = Layout;

    const { children } = this.props;

    return (
      <div className="App">
        <Layout className="layout">
          
          <Header>
            <HeaderComponent
              title="TP Phinx"
              items={items}
            />
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Sistema</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <ContentComponent body={children} />
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            <FooterComponent copyright="&copy; TP Phinx 2019" />
          </Footer>          

        </Layout>
      </div>
    );
  }
}

export default App;
