package com.maple.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by maple on 2017/12/19.
 */
@RestController
@RequestMapping("/web")
public class WebController {
    @RequestMapping("/login")
    public String login() {
        return "login";
    }
}
