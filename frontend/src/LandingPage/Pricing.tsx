import React from "react";
import "./Pricing.css";

const plans = [
  {
    name: "Student",
    price: "$20/mo",
    eduPrice: "$15/mo",
    description: "Get your feet wet. Cancel or upgrade anytime",
    features: [
      "200 quiz credits/month",
      "Unlimited grade tracking",
      "Personalized study plans",
      "Access on all devices",
    ],
    popular: false,
  },
  {
    name: "College",
    price: "$80/semester",
    eduPrice: "$50/semester",
    description: "Best value, get a 6 months of access.",
    features: [
      "1,000 quiz credits each semester",
      "Faster quiz generation",
      "Document upload",
      "All Student features",
    ],
    popular: true,
  },
  {
    name: "Credits Only",
    price: "$5",
    eduPrice: "$4",
    description: "Try it out if you're new, or add more credits!",
    features: [
        "50 quiz credits",
        "Manually generate quizzes",
        "No subscription needed",
        "Upgrade anytime",
    ],
    popular: false,
    },
  
];

const Pricing: React.FC = () => (
  <section className="pricing-section" id="pricing">
    <div className="pricing-banner">
        <span role="img" aria-label="graduation cap">🎓</span>
        Students who register with a <span className="highlight">.edu</span> email get at least <span className="highlight">20% OFF</span> all plans & credits (FOREVER)!
    </div>
    <h2 className="pricing-title">Simple, Student-Friendly Pricing</h2>
    <div className="pricing-cards">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`pricing-card${plan.popular ? " popular" : ""}`}
        >
          {plan.popular && (
            <div className="pricing-popular">Most Popular</div>
          )}
          <h3>{plan.name}</h3>
          {plan.eduPrice && (
            <div className="edu-discount-badge">
                <span role="img" aria-label="graduation cap">🎓</span>
                <span>.edu: <strong>{plan.eduPrice}</strong></span>
            </div>
            )}

          <div className="pricing-price">{plan.price}</div>
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
  </section>
);

export default Pricing;
