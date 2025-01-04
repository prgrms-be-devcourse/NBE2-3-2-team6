package com.redbox.global.oauth2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocialController {

    @GetMapping("/")
    @ResponseBody
    public String mainAPI() {
        return "Hello World";
    }
}
