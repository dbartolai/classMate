-- V1__init.sql
-- Schema for ClassMate

-- =====================
-- USERS
-- =====================
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================
-- COURSES
-- =====================
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    semester TEXT
);

-- =====================
-- CATEGORIES (Grading groups: test or assignment)
-- =====================
CREATE TABLE categories (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    weight FLOAT NOT NULL,
    score FLOAT NOT NULL,
    number INT NOT NULL, -- number of assignments/tests
    drops INT,
    name TEXT NOT NULL,
    type BOOLEAN NOT NULL
);

-- =====================
-- TESTS (Study-worthy assessments)
-- =====================
CREATE TABLE tests (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    date DATE NOT NULL,
    score FLOAT
);

-- =====================
-- ASSIGNMENTS (Graded, non-study tasks)
-- =====================
CREATE TABLE assignments (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    due_date DATE NOT NULL,
    score FLOAT
);

-- =====================
-- UNITS
-- =====================
CREATE TABLE units (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INT
);

-- =====================
-- TOPICS
-- =====================
CREATE TABLE topics (
    id UUID PRIMARY KEY,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    confidence INT,
    elo FLOAT
);

-- =====================
-- STUDY PLANS (Auto-generated for tests)
-- =====================
CREATE TABLE study_plans (
    id UUID PRIMARY KEY,
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    name TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================
-- QUIZZES (Attached to study plans)
-- =====================
CREATE TABLE quizzes (
    id UUID PRIMARY KEY,
    study_plan_id UUID REFERENCES study_plans(id) ON DELETE CASCADE,
    date DATE,
    score FLOAT,
    is_completed BOOLEAN DEFAULT FALSE
);

-- =====================
-- QUESTIONS (Each question targets one topic)
-- =====================
CREATE TABLE questions (
    id UUID PRIMARY KEY,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE SET NULL,
    text TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_index INT NOT NULL,
    status TEXT CHECK (status IN ('unanswered', 'correct', 'incorrect')) DEFAULT 'unanswered'
);

-- =====================
-- TESTS <-> UNITS
-- =====================
CREATE TABLE test_units (
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    PRIMARY KEY (test_id, unit_id)
);
