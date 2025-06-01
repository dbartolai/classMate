import React, { useState } from "react";
import "./CourseOnboarding.css";
import "./Onboarding.css"
import InfoPopup from "../InfoPopup";

type Category = {
  name: string;
  weight: string;
  numAssignments: string;
};

type ImportantDate = {
  label: string;
  date: string;
};

interface Props {
  courseName: string;
  onSkipGrades?: () => void;
  onNext?: (data: {
    categories: Category[];
    importantDates: ImportantDate[];
    noGrades: boolean;
  }) => void;
}

const CourseOnboarding: React.FC<Props> = ({
  courseName,
  onSkipGrades,
  onNext,
}) => {
  const [categories, setCategories] = useState<Category[]>([
    { name: "", weight: "", numAssignments: "" },
  ]);
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);
  const [dateLabel, setDateLabel] = useState("");
  const [date, setDate] = useState("");
  const [noGrades, setNoGrades] = useState(false);

  // Add/remove/edit categories
  const handleCategoryChange = (i: number, field: keyof Category, value: string) => {
    setCategories(categories.map((cat, idx) =>
      idx === i ? { ...cat, [field]: value } : cat
    ));
  };

  const handleAddCategory = () =>
    setCategories([...categories, { name: "", weight: "", numAssignments: "" }]);

  const handleRemoveCategory = (i: number) =>
    setCategories(categories.filter((_, idx) => idx !== i));

  // Add/remove important dates
  const handleAddDate = () => {
    if (dateLabel.trim() && date.trim()) {
      setImportantDates([...importantDates, { label: dateLabel, date }]);
      setDateLabel("");
      setDate("");
    }
  };

  const handleRemoveDate = (i: number) =>
    setImportantDates(importantDates.filter((_, idx) => idx !== i));

  // "No Grades" handler
  const handleNoGrades = () => {
    setNoGrades(true);
    if (onSkipGrades) onSkipGrades();
  };

  const handleNext = () => {
    if (onNext) onNext({ categories, importantDates, noGrades });
    // You might want navigation here
  };

  // Validation: require at least one non-empty category unless skipping
  const nextDisabled =
    !noGrades &&
    categories.every(
      (cat) =>
        !cat.name.trim() ||
        !cat.weight.trim() ||
        !cat.numAssignments.trim()
    );

  return (
    <div className="onboard-root">
      <div className="onboard-card">
        <h2 className="onboard-title">{courseName}</h2>
        {/* Categories Section */}
        {!noGrades && (
          <div className="onboard-section">
            <div className="course-cat-head">
                <label className="onboard-label">
                Grading Categories
                <span style={{ fontWeight: 400, color: "#6c6c6c", fontSize: "0.92em" }}> (e.g. Exams, Homework, Projects)</span>
                </label>
                <InfoPopup
                explanation={
                <>
                    <b>What's this?</b><br /><br/>
                    We use the weight of each category to calculate your current grade in your class.<br /><br />
                    The number of items allows us to calculate the highest and lowest grade you can achieve.
                </>
                }
            />

            </div>
            
            {categories.map((cat, i) => (
              <div className="course-cat-row" key={i}>
                <input
                  type="text"
                  className="onboard-input course-cat-input"
                  placeholder="Category Name"
                  value={cat.name}
                  onChange={(e) => handleCategoryChange(i, "name", e.target.value)}
                />
                <input
                  type="number"
                  className="onboard-input course-cat-weight"
                  placeholder="% Weight"
                  min={0}
                  max={100}
                  value={cat.weight}
                  onChange={(e) => handleCategoryChange(i, "weight", e.target.value)}
                />
                <input
                  type="number"
                  className="onboard-input course-cat-num"
                  placeholder="Items"
                  min={0}
                  value={cat.numAssignments}
                  onChange={(e) =>
                    handleCategoryChange(i, "numAssignments", e.target.value)
                  }
                />
                {categories.length > 1 && (
                  <button
                    className="onboard-remove-btn"
                    type="button"
                    onClick={() => handleRemoveCategory(i)}
                    aria-label="Remove category"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              className="onboard-add-btn"
              type="button"
              onClick={handleAddCategory}
            >
              + Add category
            </button>
          </div>
        )}

        {/* "No Grades" button */}
        {!noGrades && (

            <div className="no-grades-row">
            <button
                className="no-grades-btn"
                type="button"
                onClick={handleNoGrades}
            >
                I don’t want to track grades for this course
            </button>
            <InfoPopup
                explanation={
                <>
                    <b>Why track grades?</b><br />
                    Grade tracking helps you (and ClassMate) see how you’re doing in each class and tailor study plans to focus on what matters most. <br /><br />
                    But we know it can be time-consuming to keep up with! If you skip this step, you’ll still get planning tools and can always add grades later if you want.
                </>
                }
            />
            </div>

            
        )}

        {/* Important Dates Section */}
        <div className="onboard-section">
        <label className="onboard-label">
            Important Dates{" "}
            <span style={{ fontWeight: 400, color: "#6c6c6c", fontSize: "0.92em" }}>
            (Anything you want to study for)
            </span>
        </label>
        {importantDates.map((d, i) => (
            <div className="course-date-row" key={i}>
            <input
                type="text"
                className="onboard-input course-date-label"
                value={d.label}
                disabled
            />
            <input
                type="date"
                className="onboard-input course-date-date"
                value={d.date}
                disabled
            />
            <button
                className="onboard-remove-btn"
                type="button"
                onClick={() => handleRemoveDate(i)}
                aria-label="Remove date"
            >
                &times;
            </button>
            </div>
        ))}
        {/* Date label and picker */}
        <div className="course-date-add-row">
            <input
            type="text"
            className="onboard-input course-date-label"
            placeholder="e.g. Midterm 1"
            value={dateLabel}
            onChange={(e) => setDateLabel(e.target.value)}
            />
            <input
            type="date"
            className="onboard-input course-date-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
        </div>
        {/* Add button below */}
        <button
            className="onboard-add-btn"
            type="button"
            style={{ marginTop: "0.3em" }}
            onClick={handleAddDate}
            disabled={!dateLabel.trim() || !date.trim()}
        >
            + Add Date
        </button>
        </div>


        {/* Next button */}
        <button
          className="onboard-cta"
          style={{ marginTop: "1.3rem" }}
          disabled={nextDisabled}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseOnboarding;
