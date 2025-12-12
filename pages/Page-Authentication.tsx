import AuthenticationForm from "../components/Forms/Authentication/Authentication";
import Header from "../components/Header/Header";
import IllustrationImg from "../assets/images/undraw_welcome-cats_tw36.svg?react";
import "./Page-Authentication.css";
import Footer from "../components/Footer/Footer";

export default function PageAuthentication() {
    return (
        <div className="auth-page-wrapper">
            <Header />

            <div className="auth-main-container">
                <div className="auth-illustration-side">
                    <IllustrationImg style={{ width: "80%", height: "100%" }} />
                </div>

                <div className="auth-form-side">
                    <div className="auth-form-wrapper">
                        <AuthenticationForm />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}