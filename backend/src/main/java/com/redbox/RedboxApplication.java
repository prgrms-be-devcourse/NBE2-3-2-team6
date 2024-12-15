package com.redbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:security.properties")
public class RedboxApplication {

    public static void main(String[] args) {
        SpringApplication.run(RedboxApplication.class, args);
    }

}
