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
public class AuthEmailSendApiRequest {

    @Email(message = "사용할 수 없는 email의 형식입니다.")
    @NotBlank(message = "email은 공백으로 사용할 수 없습니다.")
    private String email;
}
