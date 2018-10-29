package com.softwareengineering.forum.services;

import javax.persistance.*;

import forum.models.*;
import forum.controllers.*;

@Repository
@Transactional
class MemberServices {
	@PersistanceContext
	private EntityManager manager;
	
	public int createMember(Member member) {
		manager.persist(member);
		return member.getId();
	}
	
	public Member getMemberById(int id) {
		return manager.find(Member.class, id);
	}
}