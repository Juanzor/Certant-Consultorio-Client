import axios from 'axios';

const url = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

// Turnos
export const getTurnosRequest = async () => await axios.get(url + '/turnos');

export const cancelTurnoRequest = async (id) =>
    await axios.put(url + '/turnos/cancelar/' + id);

export const createTurnosRequest = async (flight) => await axios.post(url, flight);

export const deleteTurnosRequest = async (id) =>
    await axios.delete(`${url}/turnos/${id}`);

export const createTurnoRequest = async (turno) =>
    await axios.post(url + '/turnos', turno);

export const updateTurnosRequest = async (id, flight) =>
    await axios.put(`${url}/${id}`, flight);

export const getTurnosByPacienteIdRequest = async (id) =>
    await axios.get(url + '/turnos/paciente/' + id);

//Profesionales
export const getEspecialidadesRequest = async () =>
    await axios.get(url + '/especialidades');
export const getProfesionalesByEspecialidadId = async (id) =>
    await axios.get(url + '/profesional/especialidad/' + id);

// Pacientes
export const getPacientesRequest = async () => await axios.get(url + '/pacientes');


// Consultorios
export const getConsultoriosRequest = async () => await axios.get(url + '/consultorios');
