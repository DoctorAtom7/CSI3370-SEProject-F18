package com.softwareengineering.forum.services;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

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
}