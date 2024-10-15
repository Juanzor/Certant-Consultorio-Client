import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import {
    getEspecialidadesRequest,
    getPacientesRequest,
    getProfesionalesByEspecialidadId,
    createTurnoRequest,
    getConsultoriosRequest,
} from '../api/turnosApi';

const CreateTurnoForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const [especialidades, setEspecialidades] = useState([]);
    const [consultorios, setConsultorios] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [pacientes, setPacientes] = useState([]);

    const [profesionales, setProfesionales] = useState([]);
    const [formData, setFormData] = useState({
        hora: '',
        fecha: startDate,
        especialidadId: '',
        profesionalId: '',
        pacienteId: '',
        consultorioId: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const responsePacientes = await getPacientesRequest();
            const responseEspecialidades = await getEspecialidadesRequest();
            const responseConsultorio = await getConsultoriosRequest();
            if (responseEspecialidades.data && responsePacientes.data) {
                setEspecialidades(responseEspecialidades.data);
                setPacientes(responsePacientes.data);
                setConsultorios(responseConsultorio.data);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (formData.especialidadId) {
                const responseProfesionales = await getProfesionalesByEspecialidadId(
                    formData.especialidadId
                );

                if (Array.isArray(responseProfesionales.data)) {
                    setProfesionales(responseProfesionales.data);
                } else {
                    setProfesionales([]);
                }
            }
        };
        fetchData();
    }, [formData.especialidadId]);

    const handleChange = (e) => {
        let { name, value, id, key } = e.target;

        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleChangeDate = (date) => {
        let dateActual = new Date();

         if (!(date <= dateActual)) {
            setStartDate(date);
        } else {
            alert('Selecciona una fecha a partir del dia siguiente.');
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       

        const hourValue = Number(formData.hora);
        if (hourValue < 8 || hourValue > 23) {
            alert('Solo agendan turnos de 8 a 23');
            e.target.value = '';
            return;
        }

        formData.especialidadId = Number(formData.especialidadId);
        formData.profesionalId = Number(formData.profesionalId);
        formData.pacienteId = Number(formData.pacienteId);
        console.log('Datos del form: ', formData);

        try {
            let formattedHour =
                hourValue < 10 ? `0${hourValue}:00:00` : `${hourValue}:00:00`;

            let submitData = { ...formData };
            submitData.fecha = formData.fecha.toISOString().split('T')[0];
            submitData.hora = formattedHour;

            await createTurnoRequest(submitData);
            alert('Turno creado correctamente');
            navigate('/');
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
            }
        }
    };
    return (
        <>
            {loading ? (
                <h1 className='container mt-5 col-sm-4'>Cargando...</h1>
            ) : (
                <div className='container mt-5'>
                    <h2 className='mb-3'>Agendar turno</h2>
                    <form onSubmit={handleSubmit} className='container mx-auto p-2   '>
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
                        <div className='mb-3'>
                            <label htmlFor='hora' className='form-label'>
                                Hora
                            </label>
                            <input
                                onChange={handleChange}
                                className='form-control'
                                id='hora'
                                type='number'
                                /*  defaultValue={formData.horario} */
                                name='hora'
                                min='0'
                                max='23'
                                placeholder='Ingrese la hora (8-23)'
                            />
                        </div>
                        {errors.horario && (
                            <div className='alert alert-danger p-2' role='alert'>
                                {/* {errors.horario} */}
                            </div>
                        )}

                        <div className='mb-3 '>
                            <label htmlFor='fecha' className='form-label'>
                                Fecha
                            </label>
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    dateFormat='yyyy/dd/MM'
                                    onChange={handleChangeDate}
                                    name='fecha'
                                    className='form-control'
                                    id='fecha'
                                    placeholder='Fecha'
                                />
                            </div>
                        </div>

                        <div className='mt-3'>
                            <label htmlFor='especialidad' className='form-label'>
                                Seleccionar Especialidad
                            </label>
                            <select
                                onChange={handleChange}
                                name='especialidadId'
                                className='form-select form-select d-inline'
                            >
                                <option hidden></option>
                                {especialidades.map((especialidad) => (
                                    <option key={especialidad.id} value={especialidad.id}>
                                        {especialidad.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor='profesionalId' className='form-label'>
                                Seleccionar profesional
                            </label>
                            <select
                                name='profesionalId'
                                onChange={handleChange}
                                className='form-select form-select d-inline '
                            >
                                <option hidden></option>

                                {profesionales.map((profesional) => (
                                    <option
                                        id={profesional.id}
                                        key={profesional.id}
                                        value={profesional.id}
                                    >
                                        {profesional.nombre + ' ' + profesional.apellido}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor='consultorioId' className='form-label'>
                                Seleccionar Consultorio
                            </label>
                            <select
                                onChange={handleChange}
                                name='consultorioId'
                                className='form-select form-select d-inline'
                            >
                                <option hidden></option>
                                {consultorios.map((consultorio) => (
                                    <option key={consultorio.id} value={consultorio.id}>
                                        {consultorio.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-light my-4 '>
                            Guardar
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default CreateTurnoForm;
