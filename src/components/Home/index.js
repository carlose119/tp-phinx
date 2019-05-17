// Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import firebase from 'firebase';

//component
import FormCars from './FormCars';

// Assets
import 'antd/dist/antd.css';
import '../App.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      login: false,
      user: '',
      password: '',

      uploadValue: 0,
      picture: null,
      vehiculos: [],

      marca: null,
      ano: null,
      origen: null,
      velocidad: null,
      estado: null,
      file: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitCars = this.handleSubmitCars.bind(this);
  }

  componentDidMount(){
    this.setState({
      login: false,
      user: '',
      password: '',
      vehiculos: [],
    });

    /*firebase.database().ref('vehiculos').on('child_added', snapshot => {
      this.setState({
        vehiculos: this.state.vehiculos.concat(snapshot.val())
      });
    });*/

    firebase.database().ref('vehiculos_phinx').on('child_added', snapshot => {
      this.setState({
        vehiculos: this.state.vehiculos.concat(snapshot.val())
      });
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

  handleSubmitLogin = e => {
    e.preventDefault();
    
    let defaultInputUser = 'admin';
    let defaultInputPassword = 'admin';

    if(this.state.user == defaultInputUser && this.state.password == defaultInputPassword) {
      console.log('Login');
      this.setState({
        login: true
      });
    }else{
      console.log('Error');
    }
    
  };

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
        // Obtenemos la referencia a nuestra base de datos
        // Creamos un nuevo registro en ella
        // Guardamos la URL del enlace en la DB

        /*task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);        
        });*/        

        task.snapshot.ref.getDownloadURL().then(url => this.setState({picture: url}));

        /*const record = {
          marca: this.state.marca,
          ano: this.state.ano,
          origen: this.state.origen,
          velocidad: this.state.velocidad,
          estado: this.state.estado,
          foto: this.state.picture
        }       

        const dbRef = firebase.database().ref('/vehiculos_phinx');
        const newRow = dbRef.push();
        newRow.set(record);

        const updateRow = newRow.child("/foto");        
        setTimeout(() => {
          updateRow.update({
            foto: this.state.picture
          });
        }, 3000);*/        
   
        setTimeout(() => {

          const record = {
            marca: this.state.marca,
            ano: this.state.ano,
            origen: this.state.origen,
            velocidad: this.state.velocidad,
            estado: this.state.estado,
            foto: this.state.picture
          }         
          const dbRef = firebase.database().ref('/vehiculos_phinx');
          const newRow = dbRef.push();
          newRow.set(record);

        }, 3000);
        
        
    });

  }

  renderHomeContent () {
    if(!this.state.login) {
      return (
        <Form onSubmit={this.handleSubmitLogin} className="login-form">
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
    } else {
      return (
        <div>

          <h1>Login</h1>
          <FormCars 
            onUpload={ this.handleSubmitCars } 
            changeInput={this.handleInputChange}

            uploadValue={this.state.uploadValue}
            picture={this.state.picture}

            inputMarca={this.state.marca}
            inputAno={this.state.ano}
            inputOrigen={this.state.origen}
            inputVelocidad={this.state.velocidad}
            inputEstado={this.state.estado}
          />

          {
            this.state.vehiculos.map(vehiculo => (
              <div className="App-card">
                <figure className="App-card-image">
                  <img width="320" src={vehiculo.foto} />
                  <figcaption className="App-card-footer">
                    <span className="App-card-name">
                      <b>Marca: </b>{vehiculo.marca}
                      <br/>
                      <b>Año de fabricación: </b>{vehiculo.ano}
                      <br/>
                      <b>Origen (Pais): </b>{vehiculo.origen}
                      <br/>
                      <b>Velocidad máxima: </b>{vehiculo.velocidad}
                      <br/>
                      <b>Estado: </b>{vehiculo.estado}
                    </span>
                  </figcaption>
                </figure>
              </div>
            )).reverse()
          }

        </div>
      );
    }
  }

  render() {    

    return (
      <div>
        { this.renderHomeContent() }
      </div>
    );
  }
}


export default Home;
