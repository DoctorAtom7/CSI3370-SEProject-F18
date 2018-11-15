package com.softwareengineering.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import java.util.Objects;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.softwareengineering.forum.models.*;
import com.softwareengineering.forum.services.*;

@RestController
@RequestMapping("/member/")
class MemberController {
	@Autowired
	MemberService service;

	@Value("${authentication.secretkey}")
	private String secretKey;
	private String issuer = "forum";

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Member getMemberById(@PathVariable("id") int id) {
		return service.getMemberById(id);
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "createMember", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public void createMember(@RequestBody Member member) {
		service.createMember(member);
	}

	@PostMapping(value = "selfInfo", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public Member getSelfInfo(@RequestParam Map<String, String> map) {
		Algorithm algorithm = Algorithm.HMAC256(secretKey);
		JWTVerifier verifier = JWT.require(algorithm).withIssuer(issuer).build(); // Reusable verifier instance
		DecodedJWT jwt = verifier.verify(map.get("token"));
		int id = jwt.getClaim("userID").asInt();

		Member member = service.getMemberById(id);
		member.setPassword(null);
		return member;
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "createPost", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public void createPost(@RequestBody Map<String, String> map) {

		map.forEach((k, v) -> System.out.println(k + "\t" + v));

		Algorithm algorithm = Algorithm.HMAC256(secretKey);
		JWTVerifier verifier = JWT.require(algorithm).withIssuer(issuer).build(); // Reusable verifier instance
		DecodedJWT jwt = verifier.verify(map.get("token"));
		int id = jwt.getClaim("userID").asInt();
		String title = map.get("title");
		String body = map.get("body");
		Member creator = service.getMemberById(id);

		Post post = new Post(title, body, creator);
		service.createPost(post);

	}

	@PostMapping(value = "login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity<String> login(@RequestParam Map<String, String> map) {
		String username = map.get("username");
		String password = map.get("password");
		Member member = service.authMember(username, password);

		if (Objects.isNull(member)) {
			String error = "No user exists with this username/password combo";
			return new ResponseEntity<String>(error, HttpStatus.UNAUTHORIZED);
		}

		Algorithm alg = Algorithm.HMAC256(secretKey);
		String token = JWT.create().withIssuer(issuer).withClaim("username", username)
				.withClaim("userID", member.getId()).withClaim("is_mod", member.isMod()).sign(alg);

		return new ResponseEntity<String>(token, HttpStatus.OK);
	}
}
