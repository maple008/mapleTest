package com.maple.service.impl;


import com.maple.IDao.UserInfoMapper;
import com.maple.entity.UserInfo;
import com.maple.service.IUserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserInfoMapper userInfoMapper;

    public UserInfo getUserById(int userId) {
        return userInfoMapper.selectByPrimaryKey(userId);
    }

    public int delById(String ids) {
        return 0;
    }


    public int insert(UserInfo user, UserInfo record) {
        return 0;
    }

    public UserInfo login(UserInfo userInfo) {
        UserInfo vo=userInfoMapper.findUserNameAndPassword(userInfo);
        if(Objects.nonNull(vo)&& Objects.nonNull(vo.getId())){
            return vo;
        }else{
            throw new RuntimeException("账号密码错误!");
        }

    }
}
