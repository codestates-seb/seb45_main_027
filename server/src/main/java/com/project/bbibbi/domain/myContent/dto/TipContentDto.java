package com.project.bbibbi.domain.myContent.dto;

import com.project.bbibbi.domain.tip.dto.TipResponseDto;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipContentDto {
    private List<TipResponseDto> post;
    private List<TipResponseDto> like;
    private List<TipResponseDto> bookMark;
}
