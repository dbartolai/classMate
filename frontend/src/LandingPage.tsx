import React from "react";
import "./LandingPage.css";
import WhyItWorks from "./WhyItWorks";
import Pricing from "./Pricing";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="landing-logo">ClassMate</div>
        <nav>
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a  className="landing-signup-btn">Sign In</a>
        </nav>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <h1>Your path to an <span className="highlight">A</span><br/>fully mapped.</h1>
          <p>
            <span className="">Take the guesswork out of studying with ClassMate.</span><br/>
            Our personalized study plans are <span className="bold">100% tailored</span> to your performance, so you'll always know what to study.
          </p>
          <a href="#signup" className="landing-cta">Get Started Free</a>
        </section>
        <section className="landing-features" id="features">
          <div className="feature-card">
            <h2>Quiz Generator</h2>
            <p>Instantly create custom practice quizzes on any topic, or let us do it for you!</p>
          </div>
          <div className="feature-card">
            <h2>Smart Study Plans</h2>
            <p>Get prepared for that exam tomorrow night, or start thinking about finals early.</p>
          </div>
          <div className="feature-card">
            <h2>Grade Tracker</h2>
            <p>Visualize your grades, and <span className="bold">always</span> know where you stand.</p>
          </div>
        </section>
      </main>

      <WhyItWorks/>
      <Pricing/>

      <footer className="landing-footer" id="about">
        <p>Made by students, for students. &copy; {new Date().getFullYear()} ClassMate</p>
      </footer>
      
    </div>
    
  );
};

export default LandingPage;
