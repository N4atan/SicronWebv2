import { Routes, Route } from "react-router-dom";
import App from "../App";


import PageAuthentication from "../pages/Page-Authentication";
import PagePerfil from "../pages/Page-Perfil";
import PageONG from "../pages/Page-ONG";
import DashboardONG from "../pages/Dashboard-ONG/Dashboard-ONG";
import DashboardSupplier from "../pages/Dashboard-Supplier/Dashboard-Supplier";
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
            <Route path="/entrar" element={<PageAuthentication />} />
            <Route path='/perfil' element={<PagePerfil />} />
            <Route path='/perfil/me' element={<PagePerfil isMe={true} />} />
            <Route path='/explorar' element={<ExploreOngs />} />
            <Route path='/perfil/ong' element={<PageONG />} />
            <Route path='/perfil/user' element={<PagePerfil />} />
            <Route path='*' element={<PageNotFound />} />

            {/* Rotas Protegidas - Dashboards */}
            <Route
                path='/dashboard/admin'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                        <DashboardAdmin />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/dashboard/ong'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.NGO_MANAGER, UserRole.ADMIN]}>
                        <DashboardONG />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/dashboard/supplier'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.SUPPLIER_MANAGER, UserRole.ADMIN]}>
                        <DashboardSupplier />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/cadastro/ong'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.SUPPLIER_MANAGER, UserRole.NGO_MANAGER]}>
                        <PageSolicitarCadastro type='ngo' />
                    </ProtectedRoute>
                }
            />

            <Route
                path='/cadastro/supplier'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.SUPPLIER_MANAGER, UserRole.NGO_MANAGER]}>
                        <PageSolicitarCadastro type='supplier' />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
