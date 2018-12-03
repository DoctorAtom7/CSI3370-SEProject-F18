package com.softwareengineering.forum.services;

import java.sql.Timestamp;
import java.util.List;

import com.softwareengineering.forum.models.*;

public interface IMemberService {

    public void createMember(Member member);

    public Member getMemberById(int id);

    public Post getPostById(int id);

    public Member getMemberByUsername(String name);

    public void createPost(Post post);

    public Member authMember(String username, String password);

    public List<Post> getTopPosts(Member member);

    public List<Post> getAllPosts(int limit);

    public void likePost(Post post, Member member);

    public void muteMember(int badActor, Timestamp muted_until);

    public List<Post> getFlagged();

    public void flagPost(int id);

    public Post deletePost(int postId, int memberId);

    public Post modDeletePost(int postId);
}