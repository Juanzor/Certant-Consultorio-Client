import React from 'react';
import useAltaForm from '../hooks/useAlta.js';

const Alta = ({ turnoToEdit }) => {
    let initialData = { horario: '', vuelo: '', linea: '', demorado: false };
    if (turnoToEdit) {
        initialData = turnoToEdit;
    }

    const onValidate = (formData) => {
        let isError = false;
        let errors = {};
        const regex = /^[A-Za-z0-9][A-Za-z0-9] \d{4}$/;

        if (formData.horario == '') {
            errors.horario = 'Debes seleccionar un horario';
            isError = true;
        }
        if (formData.vuelo == '') {
            errors.vuelo = 'Debes ingresar un vuelo';
            isError = true;
        } else if (!regex.test(formData.vuelo)) {
            errors.vuelo = 'Formato invalido. Ej: 2M 3092';
            isError = true;
        }
        /*    else if (errors.vuelo = "Vuelo Existente"){
            errors.vuelo = "Vuelo Existente"
        } */

        if (formData.linea == '') {
            errors.linea = 'Debes ingresar una linea';
            isError = true;
        }

        return isError ? errors : null;
    };

    const { formData, errors, loading, handleChange, handleSubmit } = useAltaForm(
        initialData,
        onValidate,
        flightToEdit
    );

    return (
        <>
            {loading ? (
                <h1 className='container mt-5 col-sm-4'>Cargando...</h1>
            ) : (
                <form onSubmit={handleSubmit} className='container mx-auto p-2   '>
                    {flightToEdit ? (
                        <h2 className='mt-3 mb-4'>Modificar</h2>
                    ) : (
                        <>
                            <h2 className='mt-5 mb-4'>Alta</h2>
                        </>
                    )}
                    <div className='mb-3'>
                        <label htmlFor='horario' className='form-label'>
                            Horario llegada
                        </label>
                        <input
                            onChange={handleChange}
                            className='form-control'
                            id='horario'
                            type='time'
                            defaultValue={formData.horario}
                            name='horario'
                        />
                    </div>
                    {errors.horario && (
                        <div className='alert alert-danger p-2' role='alert'>
                            {errors.horario}
                        </div>
                    )}

                    <div className='mb-3'>
                        <label htmlFor='vuelo' className='form-label'>
                            Vuelo
                        </label>
                        <input
                            defaultValue={formData.vuelo}
                            onChange={handleChange}
                            name='vuelo'
                            type='text'
                            className='form-control'
                            id='vuelo'
                            placeholder='Numero de vuelo'
                        />
                    </div>
                    {errors.vuelo && (
                        <div className='alert alert-danger p-2' role='alert'>
                            {errors.vuelo}
                        </div>
                    )}
                    <div className='mb-3'>
                        <label htmlFor='linea' className='form-label'>
                            Linea Aerea
                        </label>
                        <input
                            onChange={handleChange}
                            defaultValue={formData.linea}
                            name='linea'
                            type='text'
                            className='form-control'
                            id='linea'
                            placeholder='Linea aerea'
                        />
                        {errors.linea && (
                            <div className='alert alert-danger mt-3 p-2' role='alert'>
                                {errors.linea}
                            </div>
                        )}
                        <div className='form-check mt-3'>
                            <input
                                onChange={handleChange}
                                name='demorado'
                                checked={formData.demorado}
                                className='form-check-input'
                                type='checkbox'
                                id='demorado'
                            />
                            <label className='form-check-label' forhtml='demorado'>
                                Demorado
                            </label>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-light my-4 '>
                        Guardar
                    </button>
                </form>
            )}
        </>
    );
};

export default Alta;
