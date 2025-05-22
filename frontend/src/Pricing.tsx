import React from "react";
import "./Pricing.css";

const plans = [
  {
    name: "Student",
    price: "$20/mo",
    eduPrice: "15/mo",
    description: "Get your feet wet. Cancel or upgrade anytime",
    features: [
      "1,000 quiz credits/month",
      "Unlimited grade tracking",
      "Personalized study plans",
      "Access on all devices",
      "Habit tracking"
    ],
    popular: false,
  },
  {
    name: "College",
    price: "$80/sem",
    eduPrice: "60/sem",
    description: "Best value, get a 6 months of access.",
    features: [
      "Unlimited quiz credits",
      "Faster quiz generation",
      "Unlimited document upload",
      "Priority support",
      "All Student features",
    ],
    popular: true,
  },
  {
    name: "Credits Only",
    price: "$5",
    eduPrice: "$2.50",
    description: "Try it out!",
    features: [
        "100 quiz credits",
        "Manually generate quizzes",
        "Early access to new features",
        "Upgrade anytime",
    ],
    popular: false,
    },
  
];

const Pricing: React.FC = () => (
  <section className="pricing-section" id="pricing">
    <div className="pricing-banner">
        <span role="img" aria-label="graduation cap">🎓</span>
        Students who register with a <span className="highlight">.edu</span> email get <span className="highlight">50% OFF</span> all plans & credits!
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
