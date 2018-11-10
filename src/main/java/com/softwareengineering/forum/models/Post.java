package com.softwareengineering.forum.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;



//requirements:
// 1.int to hold post num
// 2. String for body
// 3. String for topic
// 4. date of creation
//5. user that posted

@Entity
@Table(name="post")
public class Post {
    @Id
    @GeneratedValue

    @Column(name = "postID", nullable = false, unique = true)
    private int postNum;

    @Column(name = "body", nullable = false)
    private String textBody;

    @Column(name = "topic", nullable = false)
    private String textTopic;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    public Post(){

    }

    public Post(int postNum, String textBody, String textTopic, Date creationDate, String username){

        this.postNum=postNum;
        this.textBody=textBody;
        this.textTopic=textTopic;
        this.creationDate=creationDate;
        this.username=username;

    }
        //postNum
    public int getNum() {
        return postNum;
    }
    public void setNum(int postNum) {
        this.postNum = postNum;
    }
        //textBody
    public String getBody() {
        return textBody;
    }
    public void setBody(String textBody) { this.textBody = textBody; }
        //Topic
    public String getTopic() { return textTopic; }
    public void setTopic(String textTopic) { this.textTopic = textTopic; }
        //date
    public Date getDate(){ return creationDate;}
    public void setDate(Date creationDate) { this.creationDate = creationDate;}
        //user
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) { this.username = username; }


}