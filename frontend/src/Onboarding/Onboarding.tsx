import React, { useState } from "react";
import "./Onboarding.css";

const useCaseOptions = [
  { label: "College Classes", value: "college" },
  { label: "High School Classes", value: "highschool" },
  { label: "Middle School Classes", value: "middleschool" },
  { label: "Test Prep", value: "testprep" },
  { label: "Interview Prep", value: "interview" },
  { label: "Other", value: "other" },
];

const Onboarding: React.FC = () => {
  const [name, setName] = useState("");
  const [useCase, setUseCase] = useState<string | null>(null);

  // Classes for HS/College/MS
  const [classes, setClasses] = useState<string[]>([""]);
  // Test prep
  const [test, setTest] = useState("");
  // Interview
  const [role, setRole] = useState("");

  const handleAddClass = () => setClasses([...classes, ""]);
  const handleClassChange = (i: number, value: string) => {
    setClasses(classes.map((cls, idx) => (i === idx ? value : cls)));
  };
  const handleRemoveClass = (i: number) => {
    setClasses(classes.filter((_, idx) => idx !== i));
  };

  const isNextDisabled = () => {
    if (!name.trim() || !useCase) return true;
    if (
      ["highschool", "college", "middleschool"].includes(useCase) &&
      classes.some((c) => !c.trim())
    )
      return true;
    if (useCase === "testprep" && !test.trim()) return true;
    if (useCase === "interview" && !role.trim()) return true;
    if (useCase == "other") return false;
    return false;
  };

  return (
    <div className="onboard-root">
      <div className="onboard-card">
        <h1 className="onboard-title">Welcome to ClassMate!</h1>
        <p className="onboard-subtitle">
          Let’s personalize your experience.
        </p>

        <div className="onboard-section">
          <label className="onboard-label" htmlFor="name-input">
            What’s your name?
          </label>
          <input
            id="name-input"
            type="text"
            className="onboard-input"
            placeholder="Enter your preferred name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="onboard-section">
          <label className="onboard-label">What brings you to ClassMate?</label>
          <div className="onboard-options">
            {useCaseOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`onboard-option-btn ${
                  useCase === opt.value ? "selected" : ""
                }`}
                onClick={() => setUseCase(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        {(useCase === "highschool" ||
          useCase === "college" ||
          useCase === "middleschool") && (
          <div className="onboard-section">
            <label className="onboard-label">
              {useCase === "college"
                ? "What college classes are you taking?"
                : useCase === "highschool"
                ? "What high school classes are you taking?"
                : "What middle school classes are you taking?"}
            </label>
            {classes.map((cls, i) => (
              <div key={i} className="onboard-class-row">
                <input
                  className="onboard-input onboard-class-input"
                  type="text"
                  placeholder="E.g. Differential Equations, Pre-Calc, Social Studies"
                  value={cls}
                  onChange={(e) => handleClassChange(i, e.target.value)}
                  autoComplete="off"
                />
                {classes.length > 1 && (
                  <button
                    type="button"
                    className="onboard-remove-btn"
                    onClick={() => handleRemoveClass(i)}
                    aria-label="Remove class"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="onboard-add-btn"
              onClick={handleAddClass}
            >
              + Add another class
            </button>
          </div>
        )}

        {useCase === "testprep" && (
          <div className="onboard-section">
            <label className="onboard-label">
              What test(s) are you prepping for?
            </label>
            <input
              className="onboard-input"
              type="text"
              placeholder="E.g. SAT, LSAT, MCAT, Calc II Final, Orgo Quiz"
              value={test}
              onChange={(e) => setTest(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}

        {useCase === "interview" && (
          <div className="onboard-section">
            <label className="onboard-label">
              What kind of interview are you prepping for?
            </label>
            <input
              className="onboard-input"
              type="text"
              placeholder="E.g. Software Engineer, Consulting, Banking, etc."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}

        {useCase === "other" && (
          <div className="onboard-section">
            <label className="onboard-label">
              Please explain.
            </label>
            <input
              className="onboard-input"
              type="text"
              placeholder="E.g. Personal learning, Teaching, etc."
              value={role}
              onChange={(e) => setRole(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}

        <button
          className="onboard-cta"
          disabled={isNextDisabled()}
          // onClick={handleNext} // Hook up your real next logic here!
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
