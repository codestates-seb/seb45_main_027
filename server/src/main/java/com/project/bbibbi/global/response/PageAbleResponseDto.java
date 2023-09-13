package com.project.bbibbi.global.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PageAbleResponseDto<T>  {
    private Boolean isLast;
    private List<T> data;
}
