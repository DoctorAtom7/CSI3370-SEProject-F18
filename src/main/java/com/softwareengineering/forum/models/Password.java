package com.softwareengineering.forum.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "password")
public class Password {
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int member_id;
	@Column(name = "password", nullable = false)
	private String password;
	@Column(name = "salt", nullable = false)
	private String salt;
	@Column(name = "change_date", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date change_date;

	public int getMemberId() {
		return member_id;
	}

	public void setMemberId(int member_id) {
		this.member_id = member_id;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public Date getChangeDate() {
		return change_date;
	}

	public void setChangeDate(Date change_date) {
		this.change_date = change_date;
	}
}