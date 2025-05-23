import React from "react";
import "./WhyItWorks.css";

const WhyItWorks: React.FC = () => (
  <section className="why-section">
    <h2 className="why-title">Why It Works</h2>
    <div className="why-content">
      <div className="why-card">
        <h3>Active Recall</h3>
        <p>
          <span className="highlight">Science-backed:</span> Research shows that
          practicing <strong>active recall</strong>—retrieving information from memory through self-testing—
          is one of the most effective ways to strengthen long-term retention.
          That’s why ClassMate puts smart quizzes at the heart of your study plan.
        </p>
      </div>
      <div className="why-card">
        <h3>Just Get Started</h3>
        <p>
          <span className="highlight">No more procrastination or decision paralysis:</span> Most procrastination comes from not knowing
          where to begin or fearing you’re not studying “the right way.” ClassMate
          removes that barrier—log in and you’ll always see your next best step.
        </p>
      </div>
      <div className="why-card">
        <h3>Early Practice = Higher Success</h3>
        <p>
          <span className="highlight">Start early, win big:</span> Students who review and quiz themselves
          <strong> weeks before an exam</strong> build real confidence and
          understanding—so there are no surprises on test day.
        </p>
      </div>
    </div>
  </section>
);

export default WhyItWorks;
