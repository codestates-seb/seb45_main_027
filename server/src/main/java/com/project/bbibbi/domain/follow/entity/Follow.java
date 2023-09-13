package com.project.bbibbi.domain.follow.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(FollowPK.class)
public class Follow extends BaseEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @Id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Transient
    private Boolean FollowYn;

    @Transient
    private String FollowGubun;


}
