package com.project.bbibbi.auth.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthEmailCheckApiRequest {

    @Email(message = "사용할 수 없는 email의 형식입니다.")
    @NotBlank(message = "email은 공백으로 사용할 수 없습니다.")
    private String email;
    @NotBlank(message = "코드를 정확히 입력해주세요")
    private String code;
}
