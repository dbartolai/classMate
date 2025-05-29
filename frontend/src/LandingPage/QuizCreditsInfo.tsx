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
          <li>1 credit = 10 quiz questions</li>
          <li>5 quiz credits = 1 doc upload</li>
          <li>No expiration. Use them when you need them</li>
          <li>Credits DO roll over from month to month</li>
          
        </ul>
      </div>
      <div className="credits-why">
        <h3>Why Do We Use Credits?</h3>
        <p>
          Generating high-quality, personalized quizzes takes real computing power.
          <span className="highlight">Quiz credits help us cover those costs,</span> so we can keep the platform fast, fair, and affordable for everyone.

          <br/> <br/> All of our plans provide <span className="highlight">more than enough</span> quiz credits, we just need no make sure nobody abuses our platform!
          
        </p>
        
      </div>
    </div>
  </section>
);

export default QuizCreditsInfo;
