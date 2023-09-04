package com.project.bbibbi.domain.follow.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowPK implements Serializable {
    private Long fromMember;
    private Long member;
}
