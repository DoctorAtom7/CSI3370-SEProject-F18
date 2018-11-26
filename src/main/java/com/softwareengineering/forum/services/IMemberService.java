package com.softwareengineering.forum.services;

import java.util.List;

import com.softwareengineering.forum.models.*;

public interface IMemberService {

    public void createMember(Member member);

    public Member getMemberById(int id);

    public Member getMemberByUsername(String name);

    public void createPost(Post post);

    public Member authMember(String username, String password);

    public List<Post> getTopPosts(Member member);

    public List<Post> getAllPosts(int limit);
}