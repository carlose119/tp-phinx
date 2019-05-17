// Dependencies
import React, { Component } from 'react';
import { Modal, Button } from 'antd';

// Assets
import 'antd/dist/antd.css';

class ModalCars extends Component {   

    render() {
        return (
        <div>            
            <Modal
                title="Detalles Vehiculo"
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
            >
                <p><img width="400" src={this.props.modal_foto} alt=""/></p>
                <p><b>Marca:</b> {this.props.modal_marca}</p>
                <p><b>Año de fabricación:</b> {this.props.modal_ano}</p>
                <p><b>Origen (Pais):</b> {this.props.modal_origen}</p>
                <p><b>Velocidad máxima:</b> {this.props.modal_velocidad}</p>
                <p><b>Estado:</b> {this.props.modal_estado}</p>
                <p><b>Descripción:</b> {this.props.modal_descripcion}</p>
                <p><b>Colores disponibles:</b> {this.props.modal_colores}</p>
                <p><b>Cantidad de puertas:</b> {this.props.modal_puertas}</p>
            </Modal>
        </div>
        );
    }

}

export default ModalCars;