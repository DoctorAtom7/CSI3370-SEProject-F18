package com.softwareengineering.forum.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.softwareengineering.forum.models.*;

@Service
public class MemberService implements IMemberService {

	@Autowired
	private JdbcTemplate template;

	public void createMember(Member member) {
		String sql = "insert into member (username, email, password_hash, banner_url) values (?, ?, ?, ?)";
		template.update(sql, member.getUsername(), member.getEmail(), member.getPasswordHash(), member.getBannerUrl());
	}

	public Member getMemberById(int id) {
		String sql = "select * from member where member_id = ?";
		return template.query(sql, Member.mapper, new Object[] { id }).get(0);
	}

	public Post getPostById(int id) {
		String sql = "select * from post where post_id = ?";
		return template.query(sql, Post.mapper, new Object[] { id }).get(0);
	}

	public Member getMemberByUsername(String name) {
		String sql = "select * from member where username = ?";
		return template.query(sql, Member.mapper, new Object[] { name }).get(0);
	}

	public void createPost(Post post) {
		String sql = "insert into post (title, body, member_id) values (?, ?, ?)";
		template.update(sql, post.getTitle(), post.getBody(), post.getCreator().getId());
	}

	public Member authMember(String username, String password) {
		String sql = "select * from member where username = ? and password_hash = ?";
		System.out.println(username + "\t" + password);
		try {
			return template.query(sql, Member.mapper, new Object[] { username, password }).get(0);
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	public List<Post> getTopPosts(Member member) {
		// select p from Post where p.member = :member order by like_count
		String sql = "select * from post where member_id = ? order by post_like";
		List<Post> postList = template.query(sql, Post.mapper, member.getId());

		Member displayedMember = new Member();
		displayedMember.setUsername(member.getUsername());
		displayedMember.setMod(member.isMod());
		displayedMember.setId(member.getId());

		postList.forEach((post) -> {
			post.setCreator(displayedMember);
		});

		return postList;
	}

	public List<Post> getAllPosts(int limit) {
		String sql = "select * from post order by post_like desc limit ?";
		List<Post> postList = template.query(sql, Post.mapper, limit);

		postList.forEach((post) -> {
			post.setCreator(getMemberById(post.getMemberId()));
		});

		return postList;
	}

	public void likePost(Post post, Member member) {
		String sql0 = "select count(*) from user_likes where member_id = ? and post_id = ?";
		int exists = template.queryForObject(sql0, new Object[] { member.getId(), post.getPostId() }, Integer.class);
		if (exists > 0) {
			return;
		}
		String sql1 = "update post set post_like = ? where post_id = ?";
		String sql2 = "insert into user_likes (member_id, post_id) values (?, ?)";
		template.update(sql1, post.getPostLike() + 1, post.getPostId());
		template.update(sql2, member.getId(), post.getPostId());
	}

	public void editPost(String title, String body, String id) {
		String sql = "update post set title = ?, body = ? where post_id = ?";
		template.update(sql, title, body, Integer.valueOf(id));
	}

	public void updateEmail(String username, String email) {
		String sql = "update member set email = ? where username = ?";
		template.update(sql, email, username);
	}

	public void updatePassword(String username, String password) {
		String sql = "update member set password_hash = ? where username = ?";
		template.update(sql, password, username);
	}
}
