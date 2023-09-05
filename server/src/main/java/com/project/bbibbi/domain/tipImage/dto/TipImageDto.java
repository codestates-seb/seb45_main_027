package com.project.bbibbi.domain.tipImage.dto;

import com.project.bbibbi.domain.tipImage.entity.TipImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import java.time.LocalDateTime;


/**
 * DTO for {@link TipImage}
 */
@Value
@Getter
@Setter
@AllArgsConstructor
public class TipImageDto {
    private Long tipImageId;
    private String image;
    private Long tipId;
    private LocalDateTime createdDateTime;
    private LocalDateTime modifiedDateTime;


}