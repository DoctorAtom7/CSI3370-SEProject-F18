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

    @Column(name = "post_like")
    private int postLike;

    @Column(name = "body")
    private String body;

    @Column(name = "title")
    private String title;

    @Column(name = "creation_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member_id;

    public Post() {

    }

    public Post(String title, String body) {
        this.title = title;
        this.body = body;
    }

    public Post(String body, String title, Member member_id) {
        this.body = body;
        this.title = title;
        this.member_id = member_id;
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
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    // Topic
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
        return member_id;
    }

    public void setCreator(Member member) {
        this.member_id = member;
    }

    public void setUsername(Member member) {
        this.member_id = member;
    }

    //likes
    public int getLikes() {
        return postLike;
    }

    public void setLike(int postLike) {
        this.postLike = postLike;
    }
}