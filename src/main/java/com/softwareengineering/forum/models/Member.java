package com.softwareengineering.forum.models;

import java.util.Date;
import javax.persistance.*;
import forum.models.*;

@Entity
@Table(name = "member")
public class Member {
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	@OneToOne(fetch = FetchType.Lazy, cascade = CascadeType.ALL, optional = false)
	@PrimaryKeyJoinColumn
	private Password password;
	
	public Member() {
	}
	
	public Member(String username, String email) {
		this.username = username;
		this.email = email;
	}
	
	public Member(int id, String username, String email) {
		this.id = id;
		this.username = username;
		this.email = email;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public int getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Password getPassword() {
		return password;
	}
	
	public void setPassword(Password password) {
		this.password = password;
	}
}