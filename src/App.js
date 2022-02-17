import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dasboard/Dashboard';
import SideBar from './components/Sidebar/Sidebar';
import PageComponents from './views/PageComponents';
import TablaDeudores from './components/Deudores/TablaDeudores';
import PageNotFound from './views/PageNotFound';
import AgregarDeudor from './components/Deudores/AgregarDeudor';
import EditarDeudor from './components/Deudores/EditarDeudor';
import TablaCobradores from './components/Cobradores/TablaCobradores';
import AgregarCobrador from './components/Cobradores/AgregarCobrador';
import EditarCobrador from './components/Cobradores/EditarCobrador';
import TablaPagos from './components/Pagos/TablaPagos';
import Login from './views/Login';
import TablaReportes from './components/Reportes/TablaReporte';
import AgregarPago from './components/Pagos/AgregarPago';
import { useAuth0 } from "@auth0/auth0-react";
import toast, { Toaster } from 'react-hot-toast';

const notify = (message) => toast.success(message, {
  position: "top-center",
    duration: 4000
  }
);

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/menu" element={ !isAuthenticated? <Navigate to="/" /> : <SideBar/>}>
              <Route exact path="/menu/dashboard" element={ !isAuthenticated? <Navigate to="/" /> : <Dashboard/>}/>
              <Route exact path="/menu/deudores" element={ !isAuthenticated? <Navigate to="/" /> :<PageComponents/>}>
                <Route exact path="/menu/deudores/lista" element={<TablaDeudores/>}></Route>
                <Route exact path="/menu/deudores/nuevo" element={<AgregarDeudor toast={notify}/>}></Route>
                <Route exact path="/menu/deudores/editar/:id" element={<EditarDeudor toast={notify}/>}></Route>
              </Route>
              <Route exact path="/menu/cobradores" element={ !isAuthenticated? <Navigate to="/" /> : <PageComponents/>}>
                <Route exact path="/menu/cobradores/lista" element={<TablaCobradores/>}></Route>
                <Route exact path="/menu/cobradores/nuevo" element={<AgregarCobrador toast={notify}/>}></Route>
                <Route exact path="/menu/cobradores/editar/:id" element={<EditarCobrador toast={notify}/>}></Route>
              </Route>
              <Route exact path="/menu/pagos" element={ !isAuthenticated? <Navigate to="/" /> : <PageComponents/>}>
                  <Route exact path="/menu/pagos/lista" element={<TablaPagos/>}></Route>
                  <Route exact path="/menu/pagos/nuevo" element={<AgregarPago toast={notify}/>}></Route>
              </Route>
              <Route exact path="/menu/reportes" element={!isAuthenticated? <Navigate to="/" /> : <PageComponents/>}>
                  <Route exact path="/menu/reportes/lista" element={<TablaReportes/>}></Route>
              </Route>
              </Route>
              <Route exact path='/' element={ <Login/>}></Route>
              <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
        <Toaster />
    </BrowserRouter>
    
  );
}
export default App;
