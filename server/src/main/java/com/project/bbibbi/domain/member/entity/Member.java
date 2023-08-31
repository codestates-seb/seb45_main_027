package com.project.bbibbi.domain.member.entity;

import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.awt.*;
import java.util.ArrayList;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    private String myIntro;

    @Lob
    private String image;




    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Tip> tips = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TipReply> tipReplies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TipComment> tipComments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<tipBookmark> tipBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TipLike> tipLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TipReplyLike> tipReplyLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Feed> feeds = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedReply> feedReplies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedComment> feedComments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedBookmark> feedBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedLike> feedLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedReplyLike> feedReplyLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Follow> follows = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Follower> followers = new ArrayList<>();




    @Builder
    private Member(Long memberId, String email, String nickname, String password, String myIntro, String image) { // 빌더 패턴 사용
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.myIntro = myIntro;
        this.image = image;

        // 이미지를 같이 취급할꺼냐 따로 취급 할꺼냐 ?


    }


    public static Member createMember(String email, String nickname, String password) { // 멤버 생성
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .password(password)
                .myIntro(null)
                .image(null) // 나중에 수정 ?
                .build();
    }

    public void updateMyInfo(String nickname,String myIntro, String image) {
        this.nickname = nickname == null ? this.nickname : nickname;
        this.myIntro = myIntro == null ? this.myIntro : myIntro;
        this.image = image == null ? this.image : image;

    }

    public void updatePassword(String newPassword) {

        this.password = newPassword;
    }


}
