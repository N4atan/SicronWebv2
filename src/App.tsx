
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";

import "./App.css";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer/>
    </div>
    // Ordem das seções, tomara que esteja bom
  );
}

