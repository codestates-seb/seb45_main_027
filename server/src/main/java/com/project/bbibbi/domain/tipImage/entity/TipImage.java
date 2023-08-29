package com.project.bbibbi.domain.tipImage.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TipImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipImageId;

    @Column(nullable = false)
    private LocalDateTime createdDateTime = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedDateTime = LocalDateTime.now();

    @Column
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tip_id", nullable = false)
    private Tip tip;
}
