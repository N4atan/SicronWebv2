import { Routes, Route } from "react-router-dom";
import App from "../App";


import PageAuthentication from "../pages/Page-Authentication";
import PagePerfil from "../pages/Page-Perfil";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<PageAuthentication />} />
            <Route path='/perfil' element={<PagePerfil />} />
        </Routes>
    );
}
