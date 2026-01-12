import Header from "./components/Header/Header";
import HeroSection from "./components/Sections/Hero/HeroSection";
import HowItWorksSection from "./components/Sections/HowItWork/HowItWorksSection";
import ImpactSection from "./components/Sections/Impact/ImpactSection";

import "./App.css";
import ContactSection from "./components/Sections/Contact/ContactSection";
import Footer from "./components/Footer/Footer";
import OurImpact from "./components/Sections/OurImpact/OurImpact";
import StatsSection from "./components/Sections/Stats/StatsSection";

import RevealOnScroll from "./components/RevealOnScroll/RevealOnScroll";

export default function App() {
  return (
    <div className="App">
      <RevealOnScroll><Header /></RevealOnScroll>
      <RevealOnScroll><HeroSection /></RevealOnScroll>
      <RevealOnScroll><HowItWorksSection /></RevealOnScroll>
      <RevealOnScroll><StatsSection /></RevealOnScroll>
      <RevealOnScroll><OurImpact /></RevealOnScroll>
      <RevealOnScroll><ImpactSection /></RevealOnScroll>
      <RevealOnScroll><ContactSection /></RevealOnScroll>
      <RevealOnScroll><Footer /></RevealOnScroll>
    </div>
  );
}
