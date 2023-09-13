package com.project.bbibbi.domain.tipTag.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.project.bbibbi.domain.tipTag.entity.Tag}
 */
@Value
public class TagDto implements Serializable {
    String tagContent;
}