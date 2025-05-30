import React, { useState } from "react";
import "./Onboarding.css";

const gradeLevelOptions = [
  { label: "College", value: "college" },
  { label: "High School", value: "highschool" },
  { label: "Middle School", value: "middleschool" },
];

const otherPrepOptions = [
  { label: "Test", value: "testprep" },
  { label: "Interview", value: "interview" },
  { label: "Other", value: "other" },
];

const Onboarding: React.FC = () => {
  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState<string | null>(null);
  const [otherSelected, setOtherSelected] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([""]);
  const [test, setTest] = useState("");
  const [role, setRole] = useState("");
  const [explain, setExplain] = useState("");

  const handleAddClass = () => setClasses([...classes, ""]);
  const handleClassChange = (i: number, value: string) => {
    setClasses(classes.map((cls, idx) => (i === idx ? value : cls)));
  };
  const handleRemoveClass = (i: number) => {
    setClasses(classes.filter((_, idx) => idx !== i));
  };

  const handleOtherToggle = (value: string) => {
    setOtherSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const isNextDisabled = () => {
    if (!name.trim() || !gradeLevel) return true;
    if (
      ["highschool", "college", "middleschool"].includes(gradeLevel) &&
      classes.some((c) => !c.trim())
    )
      return true;
    if (otherSelected.includes("testprep") && !test.trim()) return true;
    if (otherSelected.includes("interview") && !role.trim()) return true;
    if (otherSelected.includes("other") && !explain.trim()) return true;
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

        {/* Grade Level Section */}
        <div className="onboard-section">
          <label className="onboard-label">Select your grade level.</label>
          <div className="onboard-options">
            {gradeLevelOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`onboard-option-btn ${gradeLevel === opt.value ? "selected" : ""}`}
                onClick={() => setGradeLevel(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Other Prep Section */}
        <div className="onboard-section">
          <label className="onboard-label">Anything else you would like to prep for?</label>
          <div className="onboard-options">
            {otherPrepOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                className={`onboard-option-btn ${otherSelected.includes(opt.value) ? "selected" : ""}`}
                onClick={() => handleOtherToggle(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Inputs based on selections */}
        {(gradeLevel === "highschool" ||
          gradeLevel === "college" ||
          gradeLevel === "middleschool") && (
          <div className="onboard-section">
            <label className="onboard-label">
              {gradeLevel === "college"
                ? "What college classes are you taking?"
                : gradeLevel === "highschool"
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
                {classes.length >= 1 && (
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
              {classes.length >= 1 ? "+ Add another class" : "+ Add a class"}
            </button>
          </div>
        )}

        {otherSelected.includes("testprep") && (
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

        {otherSelected.includes("interview") && (
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

        {otherSelected.includes("other") && (
          <div className="onboard-section">
            <label className="onboard-label">
              Please explain.
            </label>
            <input
              className="onboard-input"
              type="text"
              placeholder="E.g. Personal learning, Teaching, etc."
              value={explain}
              onChange={(e) => setExplain(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}

        <button
          className="onboard-cta"
          disabled={isNextDisabled()}
          // onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
