import React, { useEffect, useState } from 'react';
import Turno from './Turno.jsx';
import { getTurnosRequest } from '../api/turnosApi.js';


const Home = () => {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTurnosRequest();
            console.log(response.data)
            setTurnos(response.data);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='container mt-5 '>
                <h3 className='mb-5'>Turnos </h3>  
              
                {loading ? (
                    <h1>Cargando...</h1>
                ) : (
                    <>
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
                        <p>
                            Made by{' '}
                            <a
                                className='link-light link-offset-2'
                                target='_blank'
                                href='https://juanzor.github.io/'
                            >
                                Juanzor
                            </a>
                        </p>
                    </>
                )}
            </div>
        </>
    );
};

export default Home;
