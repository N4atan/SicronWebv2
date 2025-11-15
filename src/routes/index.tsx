import { Routes, Route } from "react-router-dom";
import App from "../App";


import PageAuthentication from "../pages/Page-Authentication";
import PagePerfil from "../pages/Page-Perfil";
import PageONG from "../pages/Page-ONG";
import DashboardONG from "../pages/Dashboard-ONG";
import DashboardAdmin from "../pages/Dashboard-Admin";
import PageSolicitarCadastro from "../pages/Page-SolicitarCadastro";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/"                 element={<App />} />
            <Route path="/login"            element={<PageAuthentication />} />
            <Route path='/perfil/:id'       element={<PagePerfil />} />
            <Route path="/solicitar-cadastro"         element={<PageSolicitarCadastro />} />
            <Route path='/ong'              element={<PageONG />} />
            <Route path='/dashboard-ong'    element={<DashboardONG />} />
            <Route path='/dashboard-admin'  element={<DashboardAdmin />} />
        </Routes>
    );
}
