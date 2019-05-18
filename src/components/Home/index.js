// Dependencies
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Table, Divider, Tag } from 'antd';
import firebase from 'firebase';
import _ from 'lodash';

//component
import FormCars from './FormCars';
import ModalCars from './ModalCars';

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
      file: null,
      descripcion: null,
      colores: null,
      puertas: null,

      modal_id: null,
      modal_marca: null,
      modal_ano: null,
      modal_origen: null,
      modal_velocidad: null,
      modal_estado: null,
      modal_file: null,
      modal_descripcion: null,
      modal_colores: null,
      modal_puertas: null,
      modal_foto: null,

      visible: false,
      visibleAdd: false,

      delete: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitCars = this.handleSubmitCars.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.recargarListaVehiculos = this.recargarListaVehiculos.bind(this);
  }

  componentDidMount(){
    this.setState({
      login: false,
      user: '',
      password: '',
      vehiculos: [],
    });

    /*firebase.database().ref('vehiculos_phinx').on('child_added', snapshot => {
      this.setState({
        vehiculos: this.state.vehiculos.concat(snapshot.val())
      });
    });*/

    firebase.database().ref('vehiculos_phinx').on('child_added', snapshot => {
      this.setState({
        vehiculos: this.state.vehiculos.concat({
          id: snapshot.key,
          marca: snapshot.val().marca,
          ano: snapshot.val().ano,
          origen: snapshot.val().origen,
          velocidad: snapshot.val().velocidad,
          estado: snapshot.val().estado,
          descripcion: snapshot.val().descripcion,
          colores: snapshot.val().colores,
          puertas: snapshot.val().puertas,
          status: snapshot.val().status,        
          foto: snapshot.val().foto
        })
      });
    });

    firebase.database().ref('vehiculos_phinx').on('child_changed', snapshot => {
      
      /*this.state.vehiculos.map(function(name, index){
        if(name.status != snapshot.val().status){
          
          this.setState({
            vehiculos[index]: {
              id: snapshot.key,
              marca: snapshot.val().marca,
              ano: snapshot.val().marca,
              origen: snapshot.val().origen,
              velocidad: snapshot.val().velocidad,
              estado: snapshot.val().estado,
              descripcion: snapshot.val().descripcion,
              colores: snapshot.val().colores,
              puertas: snapshot.val().puertas,
              status: snapshot.val().status,        
              foto: snapshot.val().foto
            }
          });

        }
      });*/

      for (var i = 0; i < this.state.vehiculos.length; i++) {
        if(this.state.vehiculos[i].id === snapshot.key && this.state.vehiculos[i].status !== snapshot.val().status){

          const some_array = [...this.state.vehiculos];
          some_array[i] = {
            id: snapshot.key,
            marca: snapshot.val().marca,
            ano: snapshot.val().ano,
            origen: snapshot.val().origen,
            velocidad: snapshot.val().velocidad,
            estado: snapshot.val().estado,
            descripcion: snapshot.val().descripcion,
            colores: snapshot.val().colores,
            puertas: snapshot.val().puertas,
            status: snapshot.val().status,        
            foto: snapshot.val().foto
          };
          this.setState({vehiculos:some_array});

        }
      }
      
      
    });


    firebase.database().ref('vehiculos_phinx').on('child_removed', snapshot => {
      for (var i = 0; i < this.state.vehiculos.length; i++) {
        if(this.state.vehiculos[i].id === snapshot.key){

          const some_array = [...this.state.vehiculos];
          some_array[i] = {
            id: 'null',
            marca: 'null',
            ano: 'null',
            origen: 'null',
            velocidad: 'null',
            estado: 'null',
            descripcion: 'null',
            colores: 'null',
            puertas: 'null',
            status: 'null',        
            foto: 'null'
          };
          this.setState({vehiculos:some_array});
          //break;

        }

        /*if(this.state.vehiculos.includes(snapshot.key)) {
          this.setState({
            vehiculos: this.state.vehiculos.concat({
              id: snapshot.key,
              marca: snapshot.val().marca,
              ano: snapshot.val().marca,
              origen: snapshot.val().origen,
              velocidad: snapshot.val().velocidad,
              estado: snapshot.val().estado,
              descripcion: snapshot.val().descripcion,
              colores: snapshot.val().colores,
              puertas: snapshot.val().puertas,
              status: snapshot.val().status,        
              foto: snapshot.val().foto
            })
          });
        }*/

        /*this.setState({
          delete: this.state.delete.concat({
            id: snapshot.key,
            marca: snapshot.val().marca,
            ano: snapshot.val().ano,
            origen: snapshot.val().origen,
            velocidad: snapshot.val().velocidad,
            estado: snapshot.val().estado,
            descripcion: snapshot.val().descripcion,
            colores: snapshot.val().colores,
            puertas: snapshot.val().puertas,
            status: snapshot.val().status,        
            foto: snapshot.val().foto
          })
        });

        setTimeout(() => {          

          this.setState({
            vehiculos: this.state.delete,
          });

        }, 3000);*/

      }
    });
    //firebase.database().ref('vehiculos_phinx').on('child_removed', this.recargarListaVehiculos);

  }

  recargarListaVehiculos (){
    console.log('recargando lista de vehiculos');

    this.setState({
      delete: [],
    });

    const row = firebase.database().ref('vehiculos_phinx');    
    row.on("value", function(snapshot) {
      console.log(snapshot.val());

      /*snapshot.forEach(function(data) {
        console.log("The " + data.key + " dinosaur's score is " + data.val().marca);

        this.setState({
          delete: this.state.delete.concat({
            id: data.key,
            marca: data.val().marca,
            ano: data.val().ano,
            origen: data.val().origen,
            velocidad: data.val().velocidad,
            estado: data.val().estado,
            descripcion: data.val().descripcion,
            colores: data.val().colores,
            puertas: data.val().puertas,
            status: data.val().status,        
            foto: data.val().foto
          })
        });

      });*/

      let messagesVal = snapshot.val();
      let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                        let cloned = _.clone(messagesVal[messageKey]);
                        cloned.key = messageKey;
                        return cloned;
                      }).value();
      this.setState({
        delete: messages
      });

      this.setState({
        vehiculos: this.state.delete,
      });

    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
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

    if(e.target.id === 'inputDescripcion') {
      this.setState({
          descripcion: e.target.value
      });
    }

    if(e.target.id === 'inputColores') {
      this.setState({
          colores: e.target.value
      });
    }

    if(e.target.id === 'inputPuertas') {
      this.setState({
          puertas: e.target.value
      });
    }

  }

  handleSubmitLogin = e => {
    e.preventDefault();
    
    let defaultInputUser = 'admin';
    let defaultInputPassword = 'admin';

    if(this.state.user === defaultInputUser && this.state.password === defaultInputPassword) {
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

        task.snapshot.ref.getDownloadURL().then(url => this.setState({picture: url}));
           
        setTimeout(() => {

          const record = {
            marca: this.state.marca,
            ano: this.state.ano,
            origen: this.state.origen,
            velocidad: this.state.velocidad,
            estado: this.state.estado,
            descripcion: this.state.descripcion,
            colores: this.state.colores,
            puertas: this.state.puertas,
            status: 'Activo',
            foto: this.state.picture
          }         
          const dbRef = firebase.database().ref('/vehiculos_phinx');
          const newRow = dbRef.push();
          newRow.set(record);

          /*const updateRow = newRow.child("/id");        
          updateRow.update({
            id: newRow.key
          });*/

          this.setState({
            marca: null,
            ano: null,
            origen: null,
            velocidad: null,
            estado: null,
            picture: null,
            descripcion: null,
            colores: null,
            puertas: null,
          });

          this.setState({
            visibleAdd: false,
          });

        }, 3000);
        
        
    });

  }

  handleDelete = (e) => {
    //console.log('this is:', e.target.value);
    const row = firebase.database().ref('vehiculos_phinx').child(e.target.value);
    row.remove();
  }
  
  handleChangeStatus (e) {
    const row = firebase.database().ref('vehiculos_phinx').child(e.target.value);
    /*row.on('value', snapshot => {
      console.log('this estatus:', snapshot.val().status);  
      if(snapshot.val().status === 'Activo'){        
        row.update({
          status: 'Inactivo',
        });
      }
      if(snapshot.val().status === 'Inactivo'){
        row.update({
          status: 'Activo',
        });        
      }
    }); */

    if(e.target.id === 'Activo'){   
      console.log('this estatus:', e.target.id);     
      row.update({
        status: 'Inactivo',
      });
      e.target.id = 'Inactivo';
      return;
    }

    if(e.target.id === 'Inactivo'){   
      console.log('this estatus:', e.target.id);     
      row.update({
        status: 'Activo',
      });
      e.target.id = 'Activo';
      return;
    }

  }
  
  showModal = (e) => {
      this.setState({
        visible: true       
      });

      if(e.target.value !== null){
        const row = firebase.database().ref('vehiculos_phinx').child(e.target.value);
        row.on('value', snapshot => {
          if(snapshot.val()){
            this.setState({
              modal_id: e.target.value,
              modal_marca: snapshot.val().marca,     
              modal_ano: snapshot.val().ano,     
              modal_origen: snapshot.val().origen,     
              modal_velocidad: snapshot.val().velocidad,     
              modal_estado: snapshot.val().estado,     
              modal_file: snapshot.val().file,     
              modal_descripcion: snapshot.val().descripcion,     
              modal_colores: snapshot.val().colores,     
              modal_puertas: snapshot.val().puertas,     
              modal_foto: snapshot.val().foto,     
            });
          }
        });
      }
  };
  handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
  };
  handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
  };

  showModalAdd = (e) => {
    this.setState({
      visibleAdd: true       
    });    
  };
  handleOkAdd = e => {
      console.log(e);
      this.setState({
        visibleAdd: false,
      });
  };
  handleCancelAdd = e => {
      console.log(e);
      this.setState({
        visibleAdd: false,
      });
  };

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

      const tableColumns = [
        {
          title: 'Marca',
          dataIndex: 'marca',
          key: 'marca',
        },
        {
          title: 'Año de fabricación',
          dataIndex: 'ano',
          key: 'ano',
        },
        {
          title: 'Origen (Pais)',
          dataIndex: 'origen',
          key: 'origen',
        },
        {
          title: 'Velocidad máxima',
          dataIndex: 'velocidad',
          key: 'velocidad',
        },
        {
          title: 'Estado',
          key: 'estado',
          dataIndex: 'estado',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Estatus',
          dataIndex: 'estatus',
          key: 'estatus',
        },
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          key: 'acciones',
        },
        /*{
          title: 'Acciones',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="primary" ghost onClick={this.handleChangeStatus(this, record.key)}>
                Activar/Desactivar 
              </Button>
              <Divider type="vertical" />
              <Button type="primary" ghost>
                Detalle {record.marca}
              </Button>
              <Divider type="vertical" />
              <Button type="danger" ghost>
                Eliminar
              </Button>
            </span>
          ),
        },*/
      ];
      
      let tableData = [];

      this.state.vehiculos.map(vehiculo => (
        vehiculo.id !== 'null' ?
          tableData.push({
            key: vehiculo.id,
            marca: vehiculo.marca,
            ano: vehiculo.ano,
            origen: vehiculo.origen,
            velocidad: vehiculo.velocidad,
            estado: [vehiculo.estado],
            estatus: vehiculo.status,
            acciones: <span>
                        <Button type="primary" ghost onClick={this.handleChangeStatus} value={vehiculo.id} id={vehiculo.status}>
                          Activar/Desactivar 
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary" ghost onClick={this.showModal} value={vehiculo.id} >
                          Detalle
                        </Button>
                        <Divider type="vertical" />
                        <Button type="danger" ghost onClick={this.handleDelete} value={vehiculo.id}>
                          Eliminar
                        </Button>
                      </span>,
          })
        : ''
      ));

      tableData.reverse();

      return (
        <div>

          <h1>Login</h1>
          <FormCars 
            visibleAdd={this.state.visibleAdd} 
            onOkAdd={this.handleOkAdd}
            onCancelAdd={this.handleCancelAdd}

            onUpload={ this.handleSubmitCars } 
            changeInput={this.handleInputChange}

            uploadValue={this.state.uploadValue}
            picture={this.state.picture}

            inputMarca={this.state.marca}
            inputAno={this.state.ano}
            inputOrigen={this.state.origen}
            inputVelocidad={this.state.velocidad}
            inputEstado={this.state.estado}
            inputDescripcion={this.state.descripcion}
            inputColores={this.state.colores}
            inputPuertas={this.state.puertas}
          />

          <Button type="primary" ghost onClick={this.showModalAdd} >
            Agregar Vehiculo
          </Button>
          <Table columns={tableColumns} dataSource={tableData} />

          <ModalCars 
            visible={this.state.visible} 
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            modal_id={this.state.modal_id}
            modal_marca={this.state.modal_marca}
            modal_ano={this.state.modal_ano}
            modal_origen={this.state.modal_origen}
            modal_velocidad={this.state.modal_velocidad}
            modal_estado={this.state.modal_estado}
            modal_descripcion={this.state.modal_descripcion}
            modal_colores={this.state.modal_colores}
            modal_puertas={this.state.modal_puertas}     
            modal_foto={this.state.modal_foto}
          />

          {/*
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
            */}

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
