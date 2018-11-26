package com.softwareengineering.forum.services;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.softwareengineering.forum.models.*;

@Repository
@Transactional
public class MemberService {
	@PersistenceContext
	private EntityManager manager;

	public void createMember(Member member) {
		manager.persist(member);
	}

	public Member getMemberById(int id) {
		return manager.find(Member.class, id);
	}

	public Member getMemberByUsername(String name) {
		TypedQuery<Member> query = manager.createQuery("select m from Member m where m.username = :username",
				Member.class);
		query.setParameter("username", name);
		return query.getSingleResult();
	}

	public void createPost(Post post) {
		manager.persist(post);
	}

	public Member authMember(String username, String password) {
		try {
			TypedQuery<Member> query = manager.createQuery(
					"Select m from Member m where m.username = :username and m.password_hash = :password",
					Member.class);
			query.setParameter("username", username);
			query.setParameter("password", password);
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public List<Post> getTopPosts(Member member) {
		// select p from Post where p.member = :member order by like_count
		Query q = manager.createQuery("select p from Post p where p.member_id = :member");
		q.setParameter("member", member);
		List<Post> postList = q.getResultList();

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
		Query q = manager.createQuery("select p from Post p order by like_count limit :limit");
		q.setParameter("limit", limit);
		return q.getResultList();
	}
}