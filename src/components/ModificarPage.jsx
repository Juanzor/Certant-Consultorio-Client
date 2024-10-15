import React from 'react';
import { getTurnosRequest } from '../api/flightApi.js';
import { useState, useEffect } from 'react';
import Alta from './Alta.jsx';

const ModificarPage = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flightToEdit, setFlightToEdit] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getFlightsRequest();
            setFlights(response.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <h1 className='container mt-5 col-sm-4'>Cargando...</h1>
            ) : (
                <div className='mx-auto p-2 mt-5 col-sm-4 '>
                    <label htmlFor='vuelo' className='form-label'>
                        Seleccionar vuelo a modificar
                    </label>
                    <select
                        onChange={(e) => {
                            setFlightToEdit(
                                flights.find((flight) => e.target.value == flight.vuelo)
                            );
                        }}
                        className='form-select form-select mb-3'
                    >
                        <option hidden>Selecciona un vuelo</option>
                        {flights.map((flight) => (
                            <option id={flight.id} key={flight.id} value={flight.vuelo}>
                                {flight.vuelo}
                            </option>
                        ))}
                    </select>
                    <Alta flightToEdit={flightToEdit} />
                </div>
            )}
        </>
    );
};

export default ModificarPage;
