package com.softwareengineering.forum.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

//requirements:
// 1.int to hold post num
// 2. String for body
// 3. String for topic
// 4. date of creation
//5. user that posted

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue

    @Column(name = "post_id", nullable = false, unique = true)
    private int postNum;

    @Column(name = "body")
    private String textBody;

    @Column(name = "title")
    private String title;

    @Column(name = "creation_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @OneToOne
    @JoinColumn(name = "id")
    private Member member;

    public Post() {

    }

    public Post(String textBody, String textTopic, Member creator) {
        this.textBody = textBody;
        this.title = textTopic;
        this.member = creator;
    }

    // postNum
    public int getNum() {
        return postNum;
    }

    public void setNum(int postNum) {
        this.postNum = postNum;
    }

    // textBody
    public String getBody() {
        return textBody;
    }

    public void setBody(String textBody) {
        this.textBody = textBody;
    }

    // Topic
    public String getTopic() {
        return title;
    }

    public void setTopic(String textTopic) {
        this.title = textTopic;
    }

    // date
    public Date getDate() {
        return creationDate;
    }

    public void setDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    // user
    public Member getCreator() {
        return member;
    }

    public void setUsername(Member member) {
        this.member = member;
    }

}