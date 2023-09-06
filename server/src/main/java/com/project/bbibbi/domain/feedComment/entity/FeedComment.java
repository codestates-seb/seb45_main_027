package com.project.bbibbi.domain.FeedComment.entity;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FeedComment extends BaseEntity {

    @Id
    private Long feedCommentId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
