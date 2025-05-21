-- V1__init.sql

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    semester TEXT,
    skill_level TEXT,
    confidence INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Units table (per course)
CREATE TABLE units (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    order_index INT
);

-- Topics table (per unit)
CREATE TABLE topics (
    id UUID PRIMARY KEY,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    importance INT
);

-- Study plans table
CREATE TABLE study_plans (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT,
    start_date DATE,
    end_date DATE
);

-- Quizzes table
CREATE TABLE quizzes (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    study_plan_id UUID REFERENCES study_plans(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('incomplete', 'complete')),
    score FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Questions table (per quiz)
CREATE TABLE questions (
    id UUID PRIMARY KEY,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id),
    text TEXT NOT NULL,
    options TEXT[] NOT NULL,
    correct_index INT,
    status TEXT CHECK (status IN ('unanswered', 'correct', 'incorrect')) DEFAULT 'unanswered'
);

-- Quiz-Topics join table (many-to-many relationship)
CREATE TABLE quiz_topics (
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (quiz_id, topic_id)
);
