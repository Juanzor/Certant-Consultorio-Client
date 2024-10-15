import React from 'react';
import { cancelTurnoRequest, deleteTurnosRequest } from '../api/flightApi';
import { useNavigate } from 'react-router-dom';

const Turno = ({ turno }) => {
    const navigate = useNavigate();

    const handleCancelarTurno = async (id) => {
        try {
            if (!turno.estado) {
                console.log(turno);
                alert('El turno ya ha sido cancelado anteriormente');
            } else {
                await cancelTurnoRequest(id);
                alert('Turno cancelado!');
                navigate(0);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert(error.response.data.mensaje);
                } else if (error.response.status === 400) {
                    alert(error.response.data.mensaje);
                } else {
                    alert('Ocurrió un error inesperado.');
                }
            } else {
                console.log('Error en la petición:', error.message);
                // error.response.data.mensaje;
            }
        }
    };
    const handleEliminarTurno = async (id) => {
        try {
            await deleteTurnosRequest(id);
            alert('Turno eliminado!');
            navigate(0);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    alert(error.response.data.mensaje);
                } else if (error.response.status === 400) {
                    alert(error.response.data.mensaje);
                } else {
                    alert('Ocurrió un error inesperado.');
                }
            } else {
                console.log('Error en la petición:', error.message);
                // error.response.data.mensaje;
            }
        }
    };

    return (
        <tr>
            <td>{turno.id}</td>
            <td>
                {turno.paciente.nombre} {turno.paciente.apellido}
            </td>
            <td>
                {turno.profesional.nombre} {turno.profesional.apellido}
            </td>
            <td>{turno.consultorio.nombre}</td>
            <td>{turno.fecha}</td>
            <td>{turno.hora}</td>
            <td>{turno.estado ? 'Activo' : 'Cancelado'}</td>
            <td className='d-flex justify-content-evenly cursor-pointer'>
                <i role='button' className='bi bi-pencil '></i>
                <i
                    role='button'
                    onClick={() => handleCancelarTurno(turno.id)}
                    className='bi bi-slash-circle'
                ></i>
                <i
                    role='button'
                    onClick={() => handleEliminarTurno(turno.id)}
                    className='bi bi-x-circle'
                ></i>
            </td>
        </tr>
    );
};

export default Turno;
