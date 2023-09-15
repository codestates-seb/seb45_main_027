package com.project.bbibbi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BbibbiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BbibbiApplication.class, args);
	}

}
