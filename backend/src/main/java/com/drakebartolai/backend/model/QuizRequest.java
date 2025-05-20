package com.drakebartolai.backend.model;

public class QuizRequest{
    private String subject;
    private String topics;
    private int num;

    public QuizRequest() {}

    public QuizRequest(String subject, String topics, int num){
        this.subject = subject;
        this.topics = topics;
        this.num = num;
    }

    public String getSubject() {
        return subject;
    }

    public String getTopics() {
        return topics;
    }

    public int getNum() {
        return num;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    public void setNum(int num) {
        this.num = num;
    }

}