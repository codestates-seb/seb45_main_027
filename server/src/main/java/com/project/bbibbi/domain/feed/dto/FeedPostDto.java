package com.project.bbibbi.domain.feed.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FeedPostDto {

    @NotBlank
    private String title;

    private String content;

    private String coverPhoto;

    @NotBlank
    private String roomType;

    @NotBlank
    private String roomSize;

    @NotBlank
    private String roomCount;

    @NotBlank
    private String roomInfo;

    @NotBlank
    private String location;

    // jwt 처리하면 안 받음.
    private Long memberId;

    // feed_image 내용
//    private List<FeedImageDto> feedImages;


}
