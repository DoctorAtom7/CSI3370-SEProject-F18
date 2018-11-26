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
@RequestMapping("/post/")
class PostController {
    @Autowired
    MemberService service;

    @Value("${authentication.secretkey}")
    private String secretKey;
    private String issuer = "forum";

    @GetMapping(value = "topPosts")
    public ResponseEntity<List<Post>> getTopPosts(@RequestParam(value = "limit", defaultValue = "15") int limit) {
        return new ResponseEntity<List<Post>>(service.getAllPosts(limit), HttpStatus.OK);
    }

}
