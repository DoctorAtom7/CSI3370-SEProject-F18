package com.softwareengineering.forum.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "member")
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private int id;
	@Column(name = "username", nullable = false, unique = true)
	private String username;
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	@Column(name = "password_hash", nullable = false)
	private String passwordHash;
	@Column(name = "is_moderator")
	private boolean isMod;

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

	@Override
	public String toString() {
		return ("Email:\t" + this.email + "\nUsername:\t" + this.username + "\nPassword:\t" + this.passwordHash);
	}
}