package com.softwareengineering.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softwareengineering.forum.models.*;
import com.softwareengineering.forum.services.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/member/")
class MemberController {
	@Autowired
	MemberService service;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Member getMemberById(@PathVariable("id") int id) {
		return service.getMemberById(id);
	}

	@PostMapping(value = "createMember", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	@ResponseStatus(HttpStatus.CREATED)
	public void createMember(@RequestBody Member member) {
		service.createMember(member);
	}
}
