package com.project.bbibbi.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.bbibbi.auth.jwt.filter.CustomJsonUsernamePasswordAuthenticationFilter;
import com.project.bbibbi.auth.jwt.handler.LoginFailureHandler;
import com.project.bbibbi.auth.jwt.handler.LoginSuccessJwtProvideHandler;
import com.project.bbibbi.auth.jwt.service.CustomJwtUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final CustomJwtUserDetailsService customJwtUserDetailsService;
    private final ObjectMapper objectMapper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
     http
             .formLogin().disable()//1 - formLogin 인증방법 비활성화
                .httpBasic().disable()//2 - httpBasic 인증방법 비활성화(특정 리소스에 접근할 때 username과 password 물어봄)
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET,"/").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers(HttpMethod.GET,"/members/**").permitAll()
                .antMatchers(HttpMethod.POST,"/members/email/**").permitAll()
                .antMatchers(HttpMethod.GET,"/feeds/**").permitAll()
                .antMatchers(HttpMethod.GET,"/tips/**").permitAll()

                    // 컨트롤러 보고 추가하기 !
                .anyRequest().authenticated();

        //http.addFilterAfter(CustomJsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {//2 - AuthenticationManager 등록
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();//DaoAuthenticationProvider 사용
        provider.setPasswordEncoder(passwordEncoder());//PasswordEncoder로는 PasswordEncoderFactories.createDelegatingPasswordEncoder() 사용
        //provider.setUserDetailsService(loginService); //이후 작성할 코드입니다.
        return new ProviderManager(provider);
    }

    @Bean
    public LoginSuccessJwtProvideHandler loginSuccessJWTProvideHandler(){
        return new LoginSuccessJwtProvideHandler();
    }

    @Bean
    public LoginFailureHandler loginFailureHandler(){
        return new LoginFailureHandler();
    }

    @Bean
    public CustomJsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordLoginFilter(){
        CustomJsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordLoginFilter = new CustomJsonUsernamePasswordAuthenticationFilter(objectMapper);
        jsonUsernamePasswordLoginFilter.setAuthenticationManager(authenticationManager());
        jsonUsernamePasswordLoginFilter.setAuthenticationSuccessHandler(loginSuccessJWTProvideHandler());
        jsonUsernamePasswordLoginFilter.setAuthenticationFailureHandler(loginFailureHandler());
        return jsonUsernamePasswordLoginFilter;
    }
}

