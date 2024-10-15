import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createTurnosRequest, updateTurnosRequest } from '../api/flightApi';
import { useEffect } from 'react';

const useAltaForm = (initialData, onValidate, flightToEdit) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (flightToEdit) {
            const { demorado, horario, vuelo, linea } = flightToEdit;
            setFormData({ horario, vuelo, linea, demorado });
        }
        setLoading(false);
    }, [flightToEdit]);

    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.vuelo = formData.vuelo.trim().toUpperCase();
        formData.linea = formData.linea.trim();
        let err = onValidate(formData);

        if (!err) {
            try {
                if (flightToEdit) {
                    await updateFlightRequest(flightToEdit.id, formData);
                    navigate('/');
                } else {
                    await createFlightRequest(formData);
                }
                navigate('/');
            } catch (error) {
                err = { vuelo: error.response.data.message };

                setErrors(err);
            }
        }
        setErrors(err);
    };

    return { formData, errors, loading, handleChange, handleSubmit };
};

export default useAltaForm;
