import React from 'react';

const Navbar2 = () => {
    return (
        <nav
            className='navbar container bg-dark  navbar-expand-lg bg-body-tertiary'
            data-bs-theme='dark'
        >
            <div className='container-fluid '>
                <a className='navbar-brand' href='/'>
                    Consultorio
                </a>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarTogglerDemo02'
                    aria-controls='navbarTogglerDemo02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse ' id='navbarTogglerDemo02'>
                    <ul className='navbar-nav  me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <a className='nav-link' href='/alta'>
                                Agendar un turno
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='/baja'>
                                Agregar paciente
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link ' href='/historial'>
                                Historial
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
