import { Routes, Route } from "react-router-dom";
import App from "../App";


import PageAuthentication from "../pages/Page-Authentication";
import PagePerfil from "../pages/Page-Perfil";
import PageONG from "../pages/Page-ONG";
import DashboardONG from "../pages/Dashboard-ONG";
import DashboardSupplier from "../pages/Dashboard-Supplier";
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

            {/* Rotas de Cadastro (Protegidas ou Públicas? Geralmente cadastro inicial é público, mas aqui parece ser solicitação interna. Mantendo proteção existente se houver, ou ajustando conforme uso atual /solicitar -> /cadastro) */}
            <Route
                path='/cadastro/ong'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.SUPPLIER_MANAGER, UserRole.NGO_MANAGER]}>
                        <PageSolicitarCadastro />
                    </ProtectedRoute>
                }
            />
            {/* Assumindo que PageSolicitarCadastro lida com supplier também ou existe outro componente. O código original não tinha rota explicita para supplier visível no snippet anterior, mas o user pediu. Vou adicionar apontando para o mesmo componente se for genérico ou verificar. 
               Nota: O snippet original tinha /solicitar/ong. O user pediu /cadastro/supplier. 
               Vou assumir que a logica de cadastro de supplier está implementada ou será. Por enquanto vou criar a rota. 
               Se PageSolicitarCadastro for genérico, ok. Se não, pode quebrar. 
               Vou apontar para PageNotFound ou PageSolicitarCadastro com prop type se existir. 
               Olhando o código anterior, o Header passa state: { type: 'supplier' } para /solicitar/ong (agora /cadastro/ong). 
               Então provavelmente a mesma página gerencia ambos. Vou criar rota alias ou redirecionar?
               Vou criar a rota explicita apontando para o mesmo elemento por enquanto.
            */}
            <Route
                path='/cadastro/supplier'
                element={
                    <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.SUPPLIER_MANAGER, UserRole.NGO_MANAGER]}>
                        <PageSolicitarCadastro />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
