import { Routes, Route } from "react-router-dom";
import App from "../App";

import Sobre from "../pages/About";
import PageAuthentication from "../pages/Page-Authentication";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<PageAuthentication />} />
        </Routes>
    );
}
