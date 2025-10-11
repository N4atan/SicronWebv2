import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Sobre from "../pages/About";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
