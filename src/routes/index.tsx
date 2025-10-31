import { Routes, Route } from "react-router-dom";
import App from "../App";


import PageAuthentication from "../pages/Page-Authentication";
import PagePerfil from "../pages/Page-Perfil";
import PageONG from "../pages/Page-ONG";
import AdminOng from "../pages/Admin-Ong";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<PageAuthentication />} />
            <Route path='/perfil' element={<PagePerfil />} />
            <Route path='/ong' element={<PageONG />} />
            <Route path='/admin' element={<AdminOng />} />
        </Routes>
    );
}
