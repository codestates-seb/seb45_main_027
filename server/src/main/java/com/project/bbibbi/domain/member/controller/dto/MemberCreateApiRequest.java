package com.project.bbibbi.domain.member.controller.dto;

import com.project.bbibbi.domain.member.service.dto.request.MemberCreateServiceRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.*;

@AllArgsConstructor
@Getter
@Builder
public class MemberCreateApiRequest {
    @Email(message = "사용할 수 없는 email의 형식입니다.")
    @NotBlank(message = "email은 공백으로 사용할 수 없습니다.")
    private String email;
    @Size(min = 3, max = 10, message = "3 ~ 10 글자 내로 입력해주세요.")
    @NotBlank(message = "닉네임은 공백으로 사용할 수 없습니다.")
    private String nickname;
    @NotNull(message = "비밀번호는 공백으로 사용할 수 없습니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]*$",
            message = "비밀번호는 영문, 숫자, 특수문자가 반드시 포함되어야 합니다.")
    @Size(min = 6, max = 15, message = "6 ~ 15 글자 내로 입력해주세요.")
    private String password;

    public MemberCreateServiceRequest toCreateServiceRequest() {
        return MemberCreateServiceRequest.builder()
                .email(email)
                .nickname(nickname)
                .password(password)
                .build();
    }

}
