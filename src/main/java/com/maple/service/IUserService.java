package com.maple.service;

import com.maple.entity.UserInfo;


public interface IUserService {
    public UserInfo getUserById(int userId);

    public int delById(String ids);

    public int insert(UserInfo user, UserInfo record);

    public UserInfo login(UserInfo userInfo);
}
