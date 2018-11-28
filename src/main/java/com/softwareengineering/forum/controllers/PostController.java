package com.softwareengineering.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.softwareengineering.forum.models.*;
import com.softwareengineering.forum.services.*;

@RestController
@RequestMapping("/post/")
class PostController {
    @Autowired
    MemberService service;

    @GetMapping(value = "topPosts")
    public ResponseEntity<List<Post>> getTopPosts(@RequestParam(value = "limit", defaultValue = "15") int limit) {
        return new ResponseEntity<List<Post>>(service.getAllPosts(limit), HttpStatus.OK);
    }

    @GetMapping(value = "thread")
    public ResponseEntity<Post> getThread(@RequestParam(value = "post_id") int id) {
        Post post = service.getPostById(id);
        return new ResponseEntity<Post>(service.getAllComments(post), HttpStatus.OK);
    }

}
