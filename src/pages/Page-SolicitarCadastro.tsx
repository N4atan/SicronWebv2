import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Inputs/Input/Input";
import { ENTITY_SCHEMAS } from "../utils/entitySchemas";
import { registerOng, errorOngService } from "../services/ong.service";
import { registerSupplier, errorSupplierService } from "../services/supplier.service";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NGOForm from "../components/Forms/Entity/NGOForm";

export default function PageSolicitarCadastro() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();


    const isSupplier = location.state?.type === 'supplier';

    


    return (
        <>
            <Card
                style={{ maxWidth: '700px', margin: '2rem auto 5rem' }}
            >
                


                <NGOForm
                    onLoading={function (isLoading: boolean): void {
                        throw new Error("Function not implemented.");
                    }}
                />


            </Card>


            <Footer />
        </>
    )
}