import "./Login.css";
import logoImage from "../assets/Logo.svg";
import Header from "../components/Header";

export default function Login() {
  return (
    <>
     <Header />

      <main>
        <div className="form-container">
          <div className="logo">
            <img src={logoImage} alt="Logo Sicron" />
            <h2>SICRON</h2>
          </div>

          <h1>Bem-Vindo!</h1>
          <p>Veja como é rápido criar a sua conta!</p>

          <form>
            <div className="input-group">
              <input type="text" placeholder="Nome de usuário" />
              <span className="icon">👤</span>
            </div>

            <div className="input-group">
              <input type="email" placeholder="E-mail" />
              <span className="icon">📧</span>
            </div>

            <div className="input-group">
              <input type="password" placeholder="Senha" />
              <span className="icon">🔒</span>
            </div>

            <div className="checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                Concordo que meus dados sejam utilizados para os devidos fins que constam
                nos termos e condições de usuários
              </label>
            </div>

            <button type="submit" className="btn">
              Criar minha conta
            </button>

            <div className="login-link">
              <a href="#">Já possuo uma conta?</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
