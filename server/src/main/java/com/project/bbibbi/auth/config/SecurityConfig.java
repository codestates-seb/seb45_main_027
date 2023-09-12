package com.project.bbibbi.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.bbibbi.auth.jwt.handler.CustomAccessDeniedHandler;
import com.project.bbibbi.auth.jwt.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.project.bbibbi.auth.jwt.filter.JwtAuthenticationProcessingFilter;
import com.project.bbibbi.auth.jwt.handler.LoginFailureHandler;
import com.project.bbibbi.auth.jwt.handler.LoginSuccessHandler;
import com.project.bbibbi.auth.jwt.service.CustomJwtUserDetailsService;
import com.project.bbibbi.auth.jwt.service.JwtService;
import com.project.bbibbi.auth.oauth.handler.OAuthLoginFailureHandler;
import com.project.bbibbi.auth.oauth.handler.OAuthLoginSuccessHandler;
import com.project.bbibbi.auth.oauth.service.CustomOAuthUserService;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomJwtUserDetailsService CustomJwtUserDetailsService;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final ObjectMapper objectMapper;
    private final OAuthLoginSuccessHandler oAuthLoginSuccessHandler;
    private final OAuthLoginFailureHandler oAuthLoginFailureHandler;
    private final CustomOAuthUserService customOAuthUserService;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .formLogin().disable() // 기본 폼 로그인 끄기
                .httpBasic().disable() // JWT(BEARER)방식으로 로그인해서 끄기
                .csrf().disable() // csrf 보안 사용 X 서버에 저장안하고 인증정보를 담아서 요청하기에
                .headers().frameOptions().disable()
                //H2허용 문제로(클릭재킹 막기위해서지만)
                .and()
                // 세션 사용하지 않으므로 STATELESS로 설정
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .cors() // CORS 추가
                .configurationSource(corsConfigurationSource()) //  CorsConfigurationSource 빈을 지정.
                .and()
                .exceptionHandling()
                .accessDeniedHandler(customAccessDeniedHandler) // 이 부분 에러날 수도 있음
                .and()

                //== URL별 권한 관리 옵션 ==//
                .authorizeRequests()

                // 아이콘, css, js 관련
                // 기본 페이지, css, image, js 하위 폴더에 있는 자료들은 모두 접근 가능, h2-console에 접근 가능
                .antMatchers("/","/css/**","/images/**","/js/**","/favicon.ico","/h2/**").permitAll()
                .antMatchers(HttpMethod.GET, "/").permitAll()
                .antMatchers("/auth/**").permitAll() // 회원가입 접근 가능
                .antMatchers(HttpMethod.GET, "/members/**").permitAll()
                .antMatchers(HttpMethod.GET, "/feed/**").permitAll()
                .antMatchers(HttpMethod.GET, "/tip/**").permitAll()
                .antMatchers(HttpMethod.GET, "/follow/**").permitAll()
                // 타 도메인쪽에서 작업을 위해 위의 GET 외에도 PATCH, POST, DELETE도 넣었습니다.
                // 타 도메인쪽 작업 완료되면 지우도록 알려드리겠습니다.
                .antMatchers(HttpMethod.POST, "/members/**").permitAll()
                .antMatchers(HttpMethod.POST, "/feed/**").permitAll()
                .antMatchers(HttpMethod.POST, "/tip/**").permitAll()
                .antMatchers(HttpMethod.POST, "/follow/**").permitAll()
                .antMatchers(HttpMethod.POST, "/imageUpload/**").permitAll()
                .antMatchers(HttpMethod.PATCH, "/members/**").permitAll()
                .antMatchers(HttpMethod.PATCH, "/feed/**").permitAll()
                .antMatchers(HttpMethod.PATCH, "/tip/**").permitAll()
                .antMatchers(HttpMethod.PATCH, "/follow/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/members/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/feed/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/tip/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/follow/**").permitAll()
                // 여기 위까지 타 도메인 임시 작업 허용
                .anyRequest().authenticated() // 위의 경로 이외에는 모두 인증된 사용자만 접근 가능
                .and()
                //== 소셜 로그인 설정 ==//
                .oauth2Login()
                .successHandler(oAuthLoginSuccessHandler) // 동의하고 계속하기를 눌렀을 때 Handler 설정
                .failureHandler(oAuthLoginFailureHandler) // 소셜 로그인 실패 시 핸들러 설정
                .userInfoEndpoint().userService(customOAuthUserService); // customUserService 설정

        // 원래 스프링 시큐리티 필터 순서가 LogoutFilter 이후에 로그인 필터 동작
        // 따라서, LogoutFilter 이후에 우리가 만든 필터 동작하도록 설정
        // 순서 : LogoutFilter -> JwtAuthenticationProcessingFilter -> CustomJsonUsernamePasswordAuthenticationFilter
        http.addFilterAfter(customJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class); //2번 실행 이후 1번 실행
        http.addFilterBefore(jwtAuthenticationProcessingFilter(), CustomJsonUsernamePasswordAuthenticationFilter.class); // 1번 후 2번 실행

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     * AuthenticationManager 설정 후 등록
     * PasswordEncoder를 사용하는 AuthenticationProvider 지정 (PasswordEncoder는 위에서 등록한 PasswordEncoder 사용)
     * FormLogin(기존 스프링 시큐리티 로그인)과 동일하게 DaoAuthenticationProvider 사용
     * UserDetailsService는 커스텀 CustomJwtUserDetailsService로 등록
     * 또한, FormLogin과 동일하게 AuthenticationManager로는 구현체인 ProviderManager 사용(return ProviderManager)
     *
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(CustomJwtUserDetailsService);
        return new ProviderManager(provider);
    }

    /**
     * 로그인 성공 시 호출되는 LoginSuccessJWTProviderHandler 빈 등록
     */
    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService, memberRepository);
    }

    /**
     * 로그인 실패 시 호출되는 LoginFailureHandler 빈 등록
     */
    @Bean
    public LoginFailureHandler loginFailureHandler() {
        return new LoginFailureHandler();
    }

    /**
     * CustomJsonUsernamePasswordAuthenticationFilter 빈 등록
     * 커스텀 필터를 사용하기 위해 만든 커스텀 필터를 Bean으로 등록
     * setAuthenticationManager(authenticationManager())로 위에서 등록한 AuthenticationManager(ProviderManager) 설정
     * 로그인 성공 시 호출할 handler, 실패 시 호출할 handler로 위에서 등록한 handler 설정
     */
    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordAuthenticationFilter() {
        CustomJsonUsernamePasswordAuthenticationFilter customJsonUsernamePasswordLoginFilter
                = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
        customJsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
        customJsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler());
        customJsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return customJsonUsernamePasswordLoginFilter;
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService, memberRepository);
        return jwtAuthenticationFilter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("<http://localhost:3000>", "..."));
//        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Authorization-refresh", "Cache-Control", "Content-Type"));
//        configuration.setExposedHeaders(Arrays.asList("Authorization", "Authorization-refresh"));//응답헤더 설정
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:8080",
                "http://localhost:3000",
                "https://bbibbiapp.s3.ap-northeast-2.amazonaws.com"
        ));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*","Authorization","Refresh"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
