// Dependencies
import React, { Component } from 'react';
import firebase from 'firebase';
import { Form, Icon, Input, Button } from 'antd';

// Assets
import 'antd/dist/antd.css';

class FormCars extends Component {
    constructor () {
        super();
        this.state = {
            uploadValue: 0,
            picture: null,
            marca: null,
            ano: null,
            origen: null,
            velocidad: null,
            estado: null,
            file: null
        };

        this.handelUpload = this.handelUpload.bind(this); 
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitCars = this.handleSubmitCars.bind(this);
    }

    handelUpload (event) {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`fotos/${file.name}`);
        const task = storageRef.put(file);

        // Listener que se ocupa del estado de la carga del fichero
        task.on('state_changed', snapshot => {
            // Calculamos el porcentaje de tamaño transferido y actualizamos
            // el estado del componente con el valor
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            // Ocurre un error
            console.error(error.message);
        }, () => {
            // Subida completada
            // Obtenemos la URL del fichero almacenado en Firebase storage
            // Obtenemos la referencia a nuestra base de datos 'pictures'
            // Creamos un nuevo registro en ella
            // Guardamos la URL del enlace en la DB
            /*const record = {
            photoURL: this.state.user.photoURL,
            displayName: this.state.user.displayName,
            image: task.snapshot.downloadURL
            }
            const dbRef = firebase.database().ref('pictures');
            const newPicture = dbRef.push();
            newPicture.set(record);*/

            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            });
        });
    }

    handleInputChange(e){
        if(e.target.id === 'inputMarca') {
          this.setState({
            marca: e.target.value
          });
        }
    
        if(e.target.id === 'inputAno') {
          this.setState({
            ano: e.target.value
          });
        }

        if(e.target.id === 'inputOrigen') {
            this.setState({
                origen: e.target.value
            });
        }

        if(e.target.id === 'inputVelocidad') {
            this.setState({
                velocidad: e.target.value
            });
        }

        if(e.target.id === 'inputEstado') {
            this.setState({
                estado: e.target.value
            });
        }

        if(e.target.id === 'inputFile') {
            this.setState({
                file: e.target.files[0]
            });
        }
    }

    handleSubmitCars (e) {
        e.preventDefault();

        const file = this.state.file;
        const storageRef = firebase.storage().ref(`fotos/${file.name}`);
        const task = storageRef.put(file);

        // Listener que se ocupa del estado de la carga del fichero
        task.on('state_changed', snapshot => {
            // Calculamos el porcentaje de tamaño transferido y actualizamos
            // el estado del componente con el valor
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            // Ocurre un error
            console.error(error.message);
        }, () => {
            // Subida completada
            // Obtenemos la URL del fichero almacenado en Firebase storage
            // Obtenemos la referencia a nuestra base de datos 'pictures'
            // Creamos un nuevo registro en ella
            // Guardamos la URL del enlace en la DB
            /*const record = {
            photoURL: this.state.user.photoURL,
            displayName: this.state.user.displayName,
            image: task.snapshot.downloadURL
            }
            const dbRef = firebase.database().ref('pictures');
            const newPicture = dbRef.push();
            newPicture.set(record);*/

            this.setState({
                uploadValue: 100,
                picture: task.snapshot.downloadURL
            });
        });

    }

    render () {
        return (
            <div>
                <progress value={this.state.uploadValue} max='100'>
                    {this.state.uploadValue} %
                </progress>
                
                <img width="320" src={this.state.picture} alt=""/>

                <Form onSubmit={this.handleSubmitCars} className="login-form">
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Marca"
                            value={this.state.marca}
                            id="inputMarca"
                            onChange={this.handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Año de fabricación"
                            value={this.state.ano}
                            id="inputAno"
                            onChange={this.handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Origen (Pais)"
                            value={this.state.origen}
                            id="inputOrigen"
                            onChange={this.handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Velocidad máxima"
                            value={this.state.velocidad}
                            id="inputVelocidad"
                            onChange={this.handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Estado"
                            value={this.state.estado}
                            id="inputEstado"
                            onChange={this.handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item>          
                        <Input
                            prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="file"
                            placeholder="file"
                            id="inputFile"
                            //onChange={this.handelUpload}
                            onChange={this.handleInputChange}
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