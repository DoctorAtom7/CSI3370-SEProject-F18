package com.softwareengineering.forum.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "member")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	@Column(name = "password_hash", nullable = false)
	private String password_hash;
	@Column(name = "is_moderator")
	private boolean isMod;
	@Column(name = "canLike")
	private boolean canLike;

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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password_hash;
	}

	public void setPassword(String password) {
		this.password_hash = password;
	}

	public boolean isMod() {
		return isMod;
	}

	public void setIsMod(boolean bool) {
		isMod = bool;
	}
//can like set/get
	public boolean canLike() {
		return canLike;
	}

	public void setLike(boolean bool) {
		canLike = bool;
	}

	@Override
	public String toString() {
		return ("Email:\t" + this.email + "\nUsername:\t" + this.username + "\nPassword:\t" + this.password_hash);
	}
}