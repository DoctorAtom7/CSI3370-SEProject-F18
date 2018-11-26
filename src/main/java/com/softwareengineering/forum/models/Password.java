package com.softwareengineering.forum.models;

import java.util.Date;

public class Password {
	private int member_id;
	private String password;
	private String salt;
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