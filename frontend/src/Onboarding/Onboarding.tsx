import React, { useState } from "react";
import type { UserUpdate } from "../types";
import { useNavigate } from "react-router-dom";
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

const semesterOptions = [
  { label: "Winter", value: 1 },
  { label: "Spring", value: 2 },
  { label: "Summer", value: 3 },
  { label: "Fall", value: 4 },
];





const Onboarding: React.FC = () => {
  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState<string | null>(null);
  const [otherSelected, setOtherSelected] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([""]);
  const [test, setTest] = useState("");
  const [role, setRole] = useState("");
  const [explain, setExplain] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 9 }, (_, i) => (currentYear - 2) + i);
  const [semester, setSemester] = useState<number>(1);
  const [year, setYear] = useState<number>(currentYear);
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();


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

  const handleNext = async () => {
    try {
      const update: UserUpdate = {
        name: name,
        onboarding: 1
      }

      console.log(update.password);
      const res = await fetch("/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(update),
      });
    
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to update user");
      }
      console.log(res)
      navigate("/nextonboarding")


    } catch (e: any) {
      setError(e.message);
      console.log(error)
    }
  }


  return (
    <div className="onboard-root">
      <div className="onboard-card">
        <h1 className="onboard-title">Welcome to ClassMate!</h1>
        <p className="onboard-subtitle">
          Let’s personalize your experience.
        </p>

        <div className="onboard-section">
          <label className="onboard-label" htmlFor="name-input">
            What’s your preferred name?
          </label>
          <input
            id="name-input"
            type="text"
            className="onboard-input"
            placeholder="First Name or Nickname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Grade Level Section */}
        <div className="onboard-section">
          <label className="onboard-label">Please select your grade level.</label>
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
          <label className="onboard-label">Anything else you would like to prep for? (Optional)</label>
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


          <>
          <div className="onboard-section onboard-semester-row">
            <div className="onboard-semester-group">
              <label className="onboard-label" htmlFor="semester-select">
                Semester:
              </label>
              <select
                id="semester-select"
                className="onboard-semester-select"
                value={semester}
                onChange={e => setSemester(Number(e.target.value))}
              >
                {semesterOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="onboard-semester-group">
              <label className="onboard-label" htmlFor="year-select">
                Year:
              </label>
              <select
                id="year-select"
                className="onboard-semester-select"
                value={year}
                onChange={e => setYear(Number(e.target.value))}
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
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
          
          </>

          


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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
