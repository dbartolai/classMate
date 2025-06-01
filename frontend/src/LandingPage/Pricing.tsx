import React, { useState } from "react";
import "./Pricing.css";

const plans = [
  {
    name: "Monthly",
    price: "$20/mo",
    eduPrice: "$10/mo",
    description: "Get a month of access to nail that exam or interview.",
    features: [
      "200 quiz credits/month",
      "Unlimited grade tracking",
      "Personalized study plans",
      "Access on all devices",
    ],
    popular: false,
    value: false,
  },
  {
    name: "Student",
    price: "$90/semester",
    eduPrice: "$45/semester",
    description: "Best value, get 6 months of access.",
    features: [
      "1,200 quiz credits each semester",
      "Faster quiz generation",
      "Document upload (with credits)",
      "All monthly features",
    ],
    popular: true,
    value: false,
  },
  {
    name: "Lifetime",
    price: "$250 once",
    eduPrice: "$120 once",
    description: "Get forever access for lifelong learners",
    features: [
      "Unlimited quiz credits",
      "All student & monthly features",
      "Upload 10 documents/month",
      "No subscription needed",
    ],
    popular: false,
    value: true,
  },
];

const Pricing: React.FC = () => {
  const [showEdu, setShowEdu] = useState(true);

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-banner">
        <span role="img" aria-label="graduation cap">🎓</span>
        Students who register with a <span className="highlight">.edu</span> email get <span className="highlight">50% OFF</span> all plans & credits! (Forever)
      </div>
      <h2 className="pricing-title">Simple, Student-Friendly Pricing</h2>
      
      
      <div className="pricing-cards">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card${plan.popular ? " popular" : ""}`}
          >
            {plan.popular && (
              <div className="pricing-popular">Most Popular!</div>
            )}
            {plan.value && (
              <div className="pricing-popular">Best Value!</div>
            )}
            <h3>{plan.name}</h3>
            {showEdu && plan.price && (
              <div className="edu-discount-badge">
                <span role="img" aria-label="graduation cap">🎓</span>
                <span>.edu: <strong>{plan.eduPrice}</strong></span>
              </div>
            )}
            <div className={ showEdu ? "pricing-price-line":"pricing-price"}>
            {plan.price}
            </div>
            <div className="pricing-desc">{plan.description}</div>
            <ul>
              {plan.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
            <a href="#signup" className="pricing-btn">
              Let's Go!
            </a>
          </div>
        ))}
      </div>

      <div className="edu-toggle-row">
        <label className="edu-toggle-label">
          <input
            type="checkbox"
            checked={showEdu}
            onChange={() => setShowEdu((prev) => !prev)}
            className="edu-toggle-checkbox"
          />
          <span className="edu-toggle-slider" />
          <span className="edu-toggle-text">
            Show .edu pricing
          </span>
        </label>
      </div>

    </section>
  );
};

export default Pricing;
