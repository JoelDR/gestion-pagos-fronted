import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dasboard/Dashboard';
import SideBar from './components/Sidebar/Sidebar';
import Deudores from './views/Deudores';
import TablaDeudores from './components/Deudores/TablaDeudores';
import PageNotFound from './views/PageNotFound';
import AgregarDeudor from './components/Deudores/AgregarDeudor';
import EditarDeudor from './components/Deudores/EditarDeudor';
import TablaCobradores from './components/Cobradores/TablaCobradores';
import AgregarCobrador from './components/Cobradores/AgregarCobrador';
import EditarCobrador from './components/Cobradores/EditarCobrador';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/menu" element={<SideBar/>}>
              <Route exact path="/menu/dashboard" element={<Dashboard/>}/>
              <Route exact path="/menu/deudores" element={<Deudores/>}>
                <Route exact path="/menu/deudores/lista" element={<TablaDeudores/>}></Route>
                <Route exact path="/menu/deudores/nuevo" element={<AgregarDeudor/>}></Route>
                <Route exact path="/menu/deudores/editar/:id" element={<EditarDeudor/>}></Route>
              </Route>
              <Route exact path="/menu/cobradores" element={<Deudores/>}>
                <Route exact path="/menu/cobradores/lista" element={<TablaCobradores/>}></Route>
                <Route exact path="/menu/cobradores/nuevo" element={<AgregarCobrador/>}></Route>
                <Route exact path="/menu/cobradores/editar/:id" element={<EditarCobrador/>}></Route>
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
