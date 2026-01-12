import AuthenticationForm from "../components/Forms/Authentication/Authentication";
import Header from "../components/Header/Header";
import IllustrationImg from "../assets/images/undraw_welcome-cats_tw36.svg?react";
import "./Page-Authentication.css";
import Footer from "../components/Footer/Footer";

export default function PageAuthentication() {
    return (
        <div className="auth-page-wrapper">
            <Header />

            <div className="auth-content">
                <div className="auth-split-container">

                    {/* Left Side: Visual/Brand */}
                    <div className="auth-visual-side">
                        <div className="visual-content">
                            <h2>Junte-se à Comunidade</h2>
                            <p>Conecte-se, colabore e faça a diferença hoje mesmo.</p>
                            <div className="illustration-wrapper">
                                <IllustrationImg className="auth-illustration" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="auth-form-side">
                        <div className="form-card">
                            <AuthenticationForm />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}