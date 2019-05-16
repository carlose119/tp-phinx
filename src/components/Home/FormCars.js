// Dependencies
import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Icon, Input, Button } from 'antd';

// Assets
import 'antd/dist/antd.css';

class FormCars extends Component {
    
    render () {
        return (
            <div>
                <progress value={this.props.uploadValue} max='100'>
                    {this.props.uploadValue} %
                </progress>
                
                <img width="320" src={this.props.picture} alt=""/>

                <Form onSubmit={this.props.onUpload} className="login-form">
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Marca"
                            value={this.props.inputMarca}
                            id="inputMarca"
                            onChange={this.props.changeInput}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Año de fabricación"
                            value={this.props.inputAno}
                            id="inputAno"
                            onChange={this.props.changeInput}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Origen (Pais)"
                            value={this.props.inputOrigen}
                            id="inputOrigen"
                            onChange={this.props.changeInput}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Velocidad máxima"
                            value={this.props.inputVelocidad}
                            id="inputVelocidad"
                            onChange={this.props.changeInput}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Estado"
                            value={this.props.inputEstado}
                            id="inputEstado"
                            onChange={this.props.changeInput}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="file"
                            placeholder="file"
                            id="inputFile"
                            //onChange={this.handelUpload}
                            onChange={this.props.changeInput}
                        />          
                    </Form.Item>
                    <Form.Item>          
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Guardar
                        </Button>         
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

export default FormCars;