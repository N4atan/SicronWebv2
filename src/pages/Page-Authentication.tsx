import AuthenticationForm from "../components/Forms/Authentication/Authentication";
import Header from "../components/Header/Header";
import dogImg from "../assets/images/dog_auth.png";
import "./Page-Authentication.css";

export default function PageAuthentication() {
    return (
        <div className="auth-page-wrapper">
            <Header />

            <div className="auth-main-container">
                <div className="auth-illustration-side">
                    <img src={dogImg} alt="Cachorro Sicron" className="auth-dog-image" />
                </div>

                <div className="auth-form-side">
                    <div className="auth-form-wrapper">
                        <AuthenticationForm />
                    </div>
                </div>
            </div>
        </div>
    )
}