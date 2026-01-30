import Header from "./components/Header/Header";
import HeroSection from "./components/Sections/Hero/HeroSection";
import HowItWorksSection from "./components/Sections/HowItWork/HowItWorksSection";
import ImpactSection from "./components/Sections/Impact/ImpactSection";
import StatsSection from "./components/Sections/Stats/StatsSection";


import "./App.css";
import ContactSection from "./components/Sections/Contact/ContactSection";
import Footer from "./components/Footer/Footer";
import OurImpact from "./components/Sections/OurImpact/OurImpact";

import RevealOnScroll from "./components/RevealOnScroll/RevealOnScroll";

export default function App() {
  return (
    <div className="App">
      <RevealOnScroll><HeroSection /></RevealOnScroll>
      <RevealOnScroll><StatsSection /></RevealOnScroll>
      <RevealOnScroll><HowItWorksSection /></RevealOnScroll>
      <RevealOnScroll><ImpactSection /></RevealOnScroll>
      <RevealOnScroll><OurImpact /></RevealOnScroll>
      <RevealOnScroll><ContactSection /></RevealOnScroll>
      <RevealOnScroll><Footer /></RevealOnScroll>
    </div>
  );
}

