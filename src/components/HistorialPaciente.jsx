import React, { useEffect } from 'react';
import { getTurnosByPacienteIdRequest, getPacientesRequest } from '../api/flightApi';
import { useState } from 'react';
import Paciente from './Paciente';
import Turno from './Turno';

const HistorialPaciente = () => {
    const [pacientes, setPacientes] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [pacienteSelected, setPacienteSelected] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const responsePacientes = await getPacientesRequest();

            setPacientes(responsePacientes.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (pacienteSelected) {
                try {
                    const responseTurnos = await getTurnosByPacienteIdRequest(
                        pacienteSelected
                    );
                    setTurnos(responseTurnos.data);
                } catch (error) {
                    alert(error.response.data.mensaje);
                    setTurnos([]);
                }
            }
        };

        fetchData();
    }, [pacienteSelected]);

    const handleChange = (e) => {
        let { value } = e.target;

        setPacienteSelected(value);
    };
    return (
        <>
            <div className='container mt-5 '>
                <div className='mt-3 mb-3'>
                    <label htmlFor='paciente' className='form-label'>
                        Seleccionar paciente
                    </label>
                    <select
                        onChange={handleChange}
                        name='pacienteId'
                        className='form-select form-select d-inline'
                    >
                        <option hidden></option>
                        {pacientes.map((paciente) => (
                            <option key={paciente.id} value={paciente.id}>
                                {paciente.nombre +
                                    ' ' +
                                    paciente.apellido +
                                    ' DNI: ' +
                                    paciente.dni}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='table-responsive'>
                    <table className='table table-dark table-striped table-hover  '>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Paciente</th>
                                <th scope='col'>Profesional</th>
                                <th scope='col'>Consultorio</th>
                                <th scope='col'>Fecha</th>
                                <th scope='col'>Hora</th>
                                <th scope='col'>Estado</th>
                                <th scope='col'>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.map((turno) => (
                                <Turno key={turno.id} turno={turno} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HistorialPaciente;
