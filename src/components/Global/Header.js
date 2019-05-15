// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Menu } from 'antd';

// Assets
import logo from './images/logo.svg';
import './css/Header.css';
import 'antd/dist/antd.css';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  render() {
    const { title, items } = this.props;

    return (
      <div>
        <div className="Logo">
          
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >           
              <Menu.Item key="-1">
                <Link to="/">
                  <img src={logo} alt="logo" />
                  {title}
                </Link>
              </Menu.Item>
            
              {
                items && items.map(
                  (item, key) => <Menu.Item key={key}><Link to={item.url}>{item.title}</Link></Menu.Item>
                )
              }
           
          </Menu>          

        </div>
      </div>
    );
  }
}

export default Header;
