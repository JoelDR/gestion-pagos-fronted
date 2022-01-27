import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dasboard/Dashboard';
import SideBar from './components/Sidebar/Sidebar';
import Deudores from './views/Deudores';
import TablaDeudores from './components/Deudores/TablaDeudores';
import PageNotFound from './views/PageNotFound';
import FormDeudores from './components/Deudores/Formulario';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='*' element={PageNotFound}></Route>
            <Route path="/menu" element={<SideBar/>}>
              <Route path="/menu/dashboard" element={<Dashboard/>}/>
              <Route path="/menu/deudores" element={<Deudores/>}>
                <Route path="/menu/deudores/lista" element={<TablaDeudores/>}></Route>
                <Route path="/menu/deudores/formulario" element={<FormDeudores/>}></Route>
              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
