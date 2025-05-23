import React from "react";
import "./QuizCreditsInfo.css";

const QuizCreditsInfo: React.FC = () => (
  <section className="credits-section" id="credits-info">
    <h2 className="credits-title">What’s a Quiz Credit?</h2>
    <div className="credits-content">
      <div className="credits-explainer">
        <p>
          <span className="highlight">A quiz credit is your “ticket” to generate ten new quiz questions with ClassMate.</span> 
             Each time you request a custom quiz or study plan, you pay with credits!  
        </p>
        <ul>
          <li>One credit = ten quiz questions</li>
          <li>Frequency of quizzes depend on your needs and habits</li>
          <li>No expiration—use them when you need them</li>
          <li>Credits DO roll over from month to month</li>
          
        </ul>
      </div>
      <div className="credits-why">
        <h3>Why Do We Use Credits?</h3>
        <p>
          Generating high-quality, personalized quizzes takes real computing power.
          <span className="highlight">Quiz credits help us cover those costs,</span> so we can keep the platform fast, fair, and affordable for everyone.

          <br/> <br/> Hint: A regular user should only need about 10-15 credits each week.
          
        </p>
        
      </div>
    </div>
  </section>
);

export default QuizCreditsInfo;
