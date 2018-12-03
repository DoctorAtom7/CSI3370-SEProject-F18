package com.softwareengineering.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.List;

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

	private Member getMemberByJWT(String jwt) {
		Algorithm algorithm = Algorithm.HMAC256(secretKey);
		JWTVerifier verifier = JWT.require(algorithm).withIssuer(issuer).build();
		try {
			DecodedJWT decoded = verifier.verify(jwt);
			int id = decoded.getClaim("userID").asInt();
			Member member = service.getMemberById(id);
			return member;
		} catch (Exception e) {
			return null;
		}
	}

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

	@PostMapping(value = "memberInfo", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public Map<String, Object> getMemberInfo(@RequestParam Map<String, String> map) {
		Member self = getMemberByJWT(map.get("token"));
		String name = map.get("username");

		Map<String, Object> response = new HashMap<>();
		Member requestedMember = service.getMemberByUsername(name);

		// User is requesting self info
		if (requestedMember.equals(self)) {
			requestedMember.setPasswordHash(null);
			response.put("isSelf", true);
		} else { // User is another member's info
			requestedMember.setEmail(null);
			requestedMember.setPasswordHash(null);
			response.put("isSelf", false);
		}

		response.put("member", requestedMember);

		return response;

	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "createPost")
	public void createPost(@RequestParam Map<String, String> map) {

		Member creator = getMemberByJWT(map.get("token"));

		if (creator.isMuted()) {
			return;
		}

		String title = map.get("title");
		String body = map.get("body");

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

	@PostMapping(value = "topPosts", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity<List<Post>> getTopPosts(@RequestParam Map<String, String> map) {
		List<Post> postList = null;
		String username = map.get("username");
		Member member = service.getMemberByUsername(username);

		try {
			postList = service.getTopPosts(member);
		} catch (Exception e) {
			System.out.println(e);
		}

		return new ResponseEntity<List<Post>>(postList, HttpStatus.OK);
	}

	// liking system endpoint
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping(value = "like", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void likePost(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		service.likePost(service.getPostById(Integer.valueOf(map.get("post_id"))), member);
	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "editPost", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void editPost(@RequestParam Map<String, String> map) {
		// Validate first

		String title = map.get("title");
		String body = map.get("body");
		String id = map.get("postId");

		service.editPost(title, body, id);
	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "updateEmail", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void updateEmail(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		String email = map.get("email");
		if (member.getPasswordHash() == map.get("oldPassword")) {
			service.updateEmail(member.getUsername(), email);
		}
	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "updatePassword", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void updatePassword(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		String password = map.get("newPassword");
		if (member.getPasswordHash() == map.get("oldPassword")) {
			service.updateEmail(member.getUsername(), password);
		}
	}

	@PostMapping(value = "add_comment", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void addComment(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		if (member.isMuted()) {
			return;
		}

		String body = map.get("body");

		int parentId = Integer.valueOf(map.get("parent_id"));

		Post post = new Post();
		post.setBody(body);
		post.setMemberId(member.getId());

		service.createComment(post, parentId);
	}

	@PostMapping(value = "editMemberInfo", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void editMemberInfo(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		String email = map.get("email");
		String password = map.get("password");
		String bio = map.get("bio");

		member.setEmail(email);
		member.setPasswordHash(password);
		member.setBio(bio);
		service.editMember(member);
	}

	@PostMapping(value = "muteMember", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void muteMember(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		if (!member.isMod()) {
			return;
		}

		int badActor = Integer.valueOf(map.get("member_id"));
		Timestamp muted_until = Timestamp.valueOf(map.get("muted_until"));

		service.muteMember(badActor, muted_until);
	}

	@PostMapping(value = "flaggedPosts", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public ResponseEntity<List<Post>> getFlagged(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		if (!member.isMod()) {
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}

		return new ResponseEntity<>(service.getFlagged(), HttpStatus.OK);

	}

	@PostMapping(value = "flagPost", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public void flagPost(@RequestParam Map<String, String> map) {
		int id = Integer.valueOf(map.get("post_id"));

		service.flagPost(id);

	}

	@PostMapping(value = "deletePost", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
	public ResponseEntity<Post> deletePost(@RequestParam Map<String, String> map) {
		Member member = getMemberByJWT(map.get("token"));
		int postId = Integer.valueOf(map.get("post_id"));

		if (member.isMod()) {
			try {
				return new ResponseEntity<>(service.modDeletePost(postId), HttpStatus.OK);
			} catch (Exception e) {
				System.out.println(e);
			}
		}

		try {
			return new ResponseEntity<>(service.deletePost(postId, member.getId()), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e);
		}

		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

	}

}
