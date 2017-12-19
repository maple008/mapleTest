package com.maple.controller;

import com.maple.entity.UserInfo;
import com.maple.service.IUserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


@Controller
public class UserController {
    @Resource
    private IUserService userService;

    @RequestMapping("/login")
    public String login(HttpServletRequest request, UserInfo userInfo, Model model) {
//		int userId = Integer.parseInt(request.getParameter("id"));
        UserInfo user = userService.login(userInfo);
        model.addAttribute("user", user);
        return "login";
    }

}
