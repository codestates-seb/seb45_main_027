package com.project.bbibbi.auth.utils;

import com.project.bbibbi.auth.jwt.service.CustomJwtUserDetails;
import com.project.bbibbi.auth.oauth.oauthUserInfo.CustomOAuth2User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class loginUtils {

    public static Long getLoginId() { // 인스턴스 주체로 아는 방법도 있고, 권한으로도 알 수 있을텐데 권한 해결되면 권한으로 바꾸자
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof CustomJwtUserDetails) {
                CustomJwtUserDetails userDetails = (CustomJwtUserDetails) authentication.getPrincipal();
                return userDetails.getMemberId();
            } else if (authentication.getPrincipal() instanceof CustomOAuth2User) {
                CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
                return oauth2User.getMemberId();
            }
        }
        return null; // 로그인하지 않은 경우 또는 사용자 정보가 없는 경우

        // 사용 예제 Long memberId = loginUtils.getLoginId
    }
}

