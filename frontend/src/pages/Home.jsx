import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Floating decorative shapes */}
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      <div className="floating-shape"></div>
      
      {/* Additional floating particles */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
      <div className="particle particle-5"></div>
      
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Facial Recognition System</h1>
        <p className="hero-subtitle">
          Experience cutting-edge biometric authentication with our advanced facial recognition technology. 
          Secure, fast, and reliable identity verification at your fingertips.
        </p>
      </div>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">🔐</span>
          <h3 className="feature-title">Secure Authentication</h3>
          <p className="feature-description">
            Advanced encryption and biometric security ensure your identity is protected with military-grade authentication.
          </p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3 className="feature-title">Lightning Fast</h3>
          <p className="feature-description">
            Instant face recognition and verification in under 2 seconds, powered by optimized AI algorithms.
          </p>
        </div>
        
        <div className="feature-card">
          <span className="feature-icon">🎯</span>
          <h3 className="feature-title">High Accuracy</h3>
          <p className="feature-description">
            99.8% accuracy rate with advanced deep learning models trained on millions of facial patterns.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-buttons">
          <Link to="/register" className="cta-button">
            Register Your Face
          </Link>
          <Link to="/login" className="cta-button secondary">
            Face Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
