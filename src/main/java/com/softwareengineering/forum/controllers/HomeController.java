package com.softwareengineering.forum.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.softwareengineering.forum.models.*;
import com.softwareengineering.forum.services.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class HomeController {
  public static String upDir = System.getProperty("user.dir") + "/uploads";
  @Autowired
  MemberService service;

  @RequestMapping(value = "/")
  public String index() {
    return "index";
  }

  @RequestMapping("/upload")
  public String upload(Model model, @RequestParam("files") MultipartFile[] files) {
    StringBuilder Names = new StringBuilder();
    for (MultipartFile file : files) {
      Path fileNameAndPath = Paths.get(upDir, file.getOriginalFilename());
      Names.append(file.getOriginalFilename());
      try {
        Files.write(fileNameAndPath, file.getBytes());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    model.addAttribute("msg", "Success! " + Names.toString());
    return "uploadstatusview";
  }

  @GetMapping(value = "allPosts", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public ResponseEntity<List<Post>> getPosts(@RequestParam(value = "limit", defaultValue = "15") int limit) {
    try {
      return new ResponseEntity<List<Post>>(service.getAllPosts(limit), HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
    }
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
