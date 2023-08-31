package com.project.bbibbi.domain.member.controller.dto;


import com.project.bbibbi.domain.member.service.dto.request.MemberUpdatePasswordApiServiceRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Builder
@Getter
@AllArgsConstructor
public class MemberUpdatePasswordApiRequest {

    @NotBlank(message = "비밀번호는 공백으로 둘 수 없습니다.")
    private String password;
    @NotNull(message = "비밀번호는 영문, 숫자, 특수문자가 반드시 포함되어야 합니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]*$",
            message ="비밀번호는 영문, 숫자, 특수문자가 반드시 포함되어야 합니다.")
    @Size(min = 6, max = 15, message = "6 ~ 15글자 내로 입력해주세요")
    private String newPassword;


    public MemberUpdatePasswordApiServiceRequest toPasswordServiceRequest(Long memberId) {
        return MemberUpdatePasswordApiServiceRequest.builder()
                .memberId(memberId)
                .password(password)
                .newPassword(newPassword)
                .build();
    }
}
