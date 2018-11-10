package com.softwareengineering.forum.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class HomeController {
  public static String upDir = System.getProperty("user.dir") + "/uploads";

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

}
