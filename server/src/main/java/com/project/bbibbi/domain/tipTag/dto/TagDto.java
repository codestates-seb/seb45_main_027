package com.project.bbibbi.domain.tipTag.dto;

import lombok.*;

import javax.persistence.Entity;
import java.io.Serializable;

/**
 * DTO for {@link com.project.bbibbi.domain.tipTag.entity.Tag}
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagDto  {
    private Long tagId;
    private String tagContent;
}