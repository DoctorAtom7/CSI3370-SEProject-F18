package com.softwareengineering.forum.services;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.softwareengineering.forum.models.*;

@Repository
@Transactional
public class MemberService {
	@PersistenceContext
	private EntityManager manager;

	public int createMember(Member member) {
		manager.persist(member);
		return member.getId();
	}

	public Member getMemberById(int id) {
		return manager.find(Member.class, id);
	}
}