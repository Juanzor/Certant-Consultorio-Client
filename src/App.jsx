import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HistorialPaciente from './components/HistorialPaciente';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Navbar from './components/Navbar';
import CreateTurnoForm from './components/CreateTurnoForm';

function App() {
    return (
        <>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/alta' element={<CreateTurnoForm />}></Route>
                    <Route path='/historial' element={<HistorialPaciente />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
