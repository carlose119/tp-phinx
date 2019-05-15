// Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

// Assets
import 'antd/dist/antd.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      user: '',
      password: '',
    });
  }

  handleInputChange(e){
    if(e.target.id === 'inputUser') {
      this.setState({
        user: e.target.value
      });
    }

    if(e.target.id === 'inputPassword') {
      this.setState({
        password: e.target.value
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    
    let defaultInputUser = 'admin';
    let defaultInputPassword = 'admin';

    if(this.state.user == defaultInputUser && this.state.password == defaultInputPassword) {
      console.log('Login');
    }else{
      console.log('Error');
    }
    
  };

  render() {    

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>          
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={this.state.user}
              id="inputUser"
              onChange={this.handleInputChange}
            />
        </Form.Item>
        <Form.Item>          
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={this.state.password}
              id="inputPassword"
              onChange={this.handleInputChange}
            />          
        </Form.Item>
        <Form.Item>          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>         
        </Form.Item>
      </Form>
    );
  }
}


export default Home;
