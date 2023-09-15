package com.project.bbibbi.domain.myContent.dto;

import com.project.bbibbi.domain.feed.dto.FeedResponseDto;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShowRoomDto {
    private List<FeedResponseDto> post;
    private List<FeedResponseDto> like;
    private List<FeedResponseDto> bookMark;

}
