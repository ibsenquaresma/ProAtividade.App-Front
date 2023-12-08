import './App.css';
import Atividade from "./pages/atividades/Atividade";
import { Routes, Route } from 'react-router-dom'; 
import Cliente from './pages/clientes/Cliente';
import Dashboard from './pages/dashboard/dashboard';
import ClienteForm from './pages/clientes/clienteForm';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/atividade/lista' element={<Atividade/>} />
      <Route path='/cliente/lista' element={<Cliente />} />
      <Route path='/cliente/:id/atividade' element={<Atividade />} />
      <Route path='/cliente/detalhe/' element={<ClienteForm />} />
      <Route path='/cliente/detalhe/:id' element={<ClienteForm />} />
      <Route element={<PageNotFound />} />
    </Routes>
  );
}