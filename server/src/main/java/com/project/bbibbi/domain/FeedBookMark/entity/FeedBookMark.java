package com.project.bbibbi.domain.FeedBookMark.entity;

import com.project.bbibbi.domain.member.entity.Member;
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
public class FeedBookMark {

    @Id
    private Long feedBookId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
