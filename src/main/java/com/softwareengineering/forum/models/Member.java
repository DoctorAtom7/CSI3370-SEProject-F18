package com.softwareengineering.forum.models;

import java.sql.Timestamp;

import org.springframework.jdbc.core.RowMapper;

import lombok.Data;

@Data
public class Member {
	private int id;
	private String username;
	private String email;
	private String passwordHash;
	private boolean isMod;
	private String bio;
	private String bannerUrl;
	private boolean muted;
	private Timestamp mutedUntil;

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

	public Member(int id, String username, String email, String password_hash, boolean isMod, String bannerUrl,
			String bio, boolean muted, Timestamp time) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.passwordHash = password_hash;
		this.isMod = isMod;
		this.bannerUrl = bannerUrl;
		this.bio = bio;
		this.mutedUntil = time;
	}

	@Override
	public String toString() {
		return ("Email:\t" + this.email + "\nUsername:\t" + this.username + "\nPassword:\t" + this.passwordHash);
	}

	public static RowMapper<Member> mapper = (rs, rowNum) -> {
		return new Member(rs.getInt("member_id"), rs.getString("username"), rs.getString("email"),
				rs.getString("password_hash"), rs.getBoolean("is_moderator"), rs.getString("banner_url"),
				rs.getString("bio"), rs.getBoolean("is_muted"), rs.getTimestamp("muted_until"));
	};
}