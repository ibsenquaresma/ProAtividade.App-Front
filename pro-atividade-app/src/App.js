import './App.css';
import Atividade from "./pages/atividades/Atividade";
import { Switch, Route } from 'react-router-dom'; 
import Cliente from './pages/clientes/Cliente';
import Dashboard from './pages/dashboard/dashboard';
import ClienteForm from './pages/clientes/clienteForm';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/atividade/lista' component={Atividade} />
      <Route path='/cliente/lista' component={Cliente} />
      <Route path='/cliente/detalhe/:id?' component={ClienteForm} />
      <Route path='/cliente/detalhe/:id?' component={ClienteForm} />
      <Route element={<PageNotFound />} />
    </Switch>
  );
}