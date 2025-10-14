import Header from "./components/Header/Header";
import HeroSection from "./components/Sections/Hero/HeroSection";
import HowItWorksSection from "./components/Sections/HowItWork/HowItWorksSection";

import "./App.css";
import ContactSection from "./components/Sections/Contact/ContactSection";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />
    </div>
    // Ordem das seções, tomara que esteja bom
  );
}

