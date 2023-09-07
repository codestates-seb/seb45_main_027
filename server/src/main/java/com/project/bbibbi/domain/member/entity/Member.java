package com.project.bbibbi.domain.member.entity;

import com.project.bbibbi.domain.FeedComment.entity.FeedComment;
import com.project.bbibbi.domain.FeedBookMark.entity.FeedBookMark;
import com.project.bbibbi.domain.feed.entity.Feed;
import com.project.bbibbi.domain.feedReply.entity.FeedReply;
import com.project.bbibbi.domain.feedReplyLike.entity.FeedReplyLike;
import com.project.bbibbi.domain.feedlike.entity.FeedLike;
import com.project.bbibbi.domain.follow.entity.Follow;
import com.project.bbibbi.domain.tip.entity.Tip;
import com.project.bbibbi.domain.tipLike.entity.TipLike;
import com.project.bbibbi.domain.tipReply.entity.TipReply;
import com.project.bbibbi.domain.tipReplyLike.entity.TipReplyLike;
import com.project.bbibbi.domain.tipComment.entity.TipComment;
import com.project.bbibbi.global.entity.BaseEntity;
import com.project.bbibbi.global.entity.Role;
import com.project.bbibbi.global.entity.SocialType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
//@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true) // 고유 필드 지정
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true) // 고유 필드 지정, error 처리
    private String email;

    private String myIntro;

    @Lob
    private String image;

    private String refreshToken; // 리프레시 토큰

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, NAVER

    private String socialId; // 로그인한 소셜 타입의 식별자 값 (일반 로그인인 경우 null)

    private boolean checkUser;





    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Tip> tips = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TipReply> tipReplies = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TipComment> tipComments = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<tipBookmark> tipBookmarks = new ArrayList<>();

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
    private List<FeedBookMark> feedBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedLike> feedLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<FeedReplyLike> feedReplyLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Follow> follows = new ArrayList<>();

//    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//    private List<Follower> followers = new ArrayList<>();




    @Builder
    private Member(Long memberId, String email, String nickname, String password,
                   String myIntro, String image, Role role, SocialType socialType, String socialId, boolean checkUser) { // 빌더 패턴 사용
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.myIntro = myIntro;
        this.image = image;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
        this.checkUser = checkUser;

        // 이미지를 같이 취급할꺼냐 따로 취급 할꺼냐 ?


    }


    public static Member createMember(String email, String nickname, String password) { // 멤버 생성
        return Member.builder()
                .email(email)
                .nickname(nickname)
                .password(password)
                .role(Role.USER)
                .checkUser(false)
//                .myIntro(null)
//                .image(null) // 나중에 수정 ?
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

    public void authorizeUser() {
        this.role = Role.USER;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }


}
