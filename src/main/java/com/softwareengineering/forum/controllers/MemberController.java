package com.softwareengineering.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.softwareengineering.forum.models.*;
import com.softwareengineering.forum.services.*;

@RestController
@RequestMapping("/member/")
class MemberController {
	@Autowired
	MemberService service;

	@Value("${authentication.secretkey}")
	private String secretKey;

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

	@PostMapping(value = "login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public String login(@RequestParam Map<String, String> map) {
		String username = map.get("username");
		String password = map.get("password");
		System.out.println(username + "\t" + password);
		Member member = service.authMember(username, password);

		Algorithm alg = Algorithm.HMAC256(secretKey);
		String token = JWT.create().withIssuer("forum").withClaim("username", username)
				.withClaim("userID", member.getId()).withClaim("is_mod", member.isMod()).sign(alg);

		return token;
	}
}
