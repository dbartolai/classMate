import React, { useEffect, useState } from "react";
import "./CountdownBanner.css";

const TARGET_DATE = new Date("2025-07-01T00:00:00-05:00").getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const CountdownBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-banner">
      <div className="countdown-promo">
        <span className="rocket" role="img" aria-label="rocket">🚀</span>
        <span>
          ClassMate launches in{" "}
          <span className="countdown-timer">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
          <span className="banner-offer">
            &nbsp;Join the waitlist and get your first semester for just
            <span className="bigdeal">$25!</span>
            <span className="normal">(normally $50)</span>
          </span>
        </span>
      </div>
      <a href="#waitlist" className="waitlist-btn">
        Join the Waitlist
      </a>
    </div>
  );
};

export default CountdownBanner;
