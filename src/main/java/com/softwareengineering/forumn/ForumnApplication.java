package com.softwareengineering.forumn;

import com.softwareengineering.forumn.controllers.HomeController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import java.io.File;

@SpringBootApplication
@ComponentScan({"com.softwareengineering.forumn","controllers"})
public class ForumnApplication {

	public static void main(String[] args) {
		new File(HomeController.upDir).mkdir();
		SpringApplication.run(ForumnApplication.class, args);
	}
}
