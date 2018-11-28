package com.softwareengineering.forum.services;

import java.util.List;

import com.softwareengineering.forum.models.*;

public interface IPostService {

    public List<Post> getAllPosts(int limit);

}