import React, { useEffect, useState } from 'react';
import { getTurnosRequest, deleteTurnosRequest } from '../api/flightApi.js';
import { useNavigate } from 'react-router';

const Baja = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flightToRemove, setFlightToRemove] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getFlightsRequest();
            setFlights(response.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    const deleteFlight = async (id) => {
        try {
            const response = await deleteFlightRequest(id);
            setFlightToRemove("")
            console.log(response)
            if (response.status == '200') {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {loading ? (
                <h1 className='container col-sm-4'>Cargando...</h1>
            ) : (
                <div className='container col-sm-4'>
                    <h3 className='mt-5 mb-4'>Baja</h3>
                    <select
                        value={flightToRemove}
                        onChange={(e) => {
                            setFlightToRemove(e.target.value);
                        }}
                        className='form-select form-select d-inline'
                    >
                        <option hidden>Selecciona un vuelo</option>

                        {flights.map((flight) => (
                            <option id={flight.id} key={flight.id} value={flight.vuelo}>
                                {flight.vuelo}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={(e) => {
                            if (flightToRemove != '') {
                                deleteFlight(
                                    flights.find((e) => e.vuelo == flightToRemove).id
                                );
                            }
                        }}
                        type='button'
                        className='btn btn-light my-4 '
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </>
    );
};

export default Baja;
