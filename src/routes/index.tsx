import { Routes, Route } from "react-router-dom";
import App from "../App";


import PageAuthentication from "../pages/Page-Authentication";
import PagePerfil from "../pages/Page-Perfil";
import PageONG from "../pages/Page-ONG";
import DashboardONG from "../pages/Dashboard-ONG";
import DashboardAdmin from "../pages/Dashboard-Admin/Dashboard-Admin";
import PageSolicitarCadastro from "../pages/Page-SolicitarCadastro";
import ExploreOngs from "../pages/ExploreOngs/ExploreOngs";
import PageNotFound from "../pages/Page-NotFound";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { UserRole } from "../services/user.service";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<PageAuthentication />} />
            <Route path='/perfil' element={<PagePerfil />} />
            <Route path='/perfil/me' element={<PagePerfil isMe={true} />} />
            {/* 
            <Route path="/cadastros"        element={<PageSolicitarCadastro />} />
            <Route path='/perfil-ong'       element={<PageONG />} />
            <Route path='/explorar'         element={<ExploreOngs />} />
            <Route path='/dashboard-ong'    element={<DashboardONG />} />
            <Route path='/dashboard-admin'  element={<DashboardAdmin />} />
            */}
            <Route path='*' element={<PageNotFound />} />

            {/* Rotas Protegidas - Exemplo Admin */}
            <Route
                path='/dashboard-admin'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN]}>
                        <DashboardAdmin />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
