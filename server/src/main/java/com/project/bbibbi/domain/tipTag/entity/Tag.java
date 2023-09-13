package com.project.bbibbi.domain.tipTag.entity;

import com.project.bbibbi.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column
    private String tagContent;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TipTag> tipTags;

    @Builder
    public Tag(String tagContent) {
        this.tagContent = tagContent;
    }

}
