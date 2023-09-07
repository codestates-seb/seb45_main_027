package com.project.bbibbi.global.mail.service;

import com.project.bbibbi.global.exception.businessexception.emailexception.EmailSendException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;


    public String sendLoginEmail(String email) {
        String title = "BBIBBI 회원가입 인증 코드";
        String from = "BBIBBI";
        String code = createCode();

        String content = "<h3>회원가입 인증 번호</h3>"
                +"<p>아래의 인증 번호를 입력해주세요.</p>"
                + "<div style='border: 1px solid #e1e1e1; padding: 10px; width: 100px; text-align: center;'>"
                + code
                + "</div>";



        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mailHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");

            mailHelper.setFrom(from);
            // 빈에 아이디 설정한 것은 단순히 smtp 인증을 받기 위해 사용 따라서 보내는이(setFrom())반드시 필요

            mailHelper.setTo(email);
            mailHelper.setSubject(title);
            mailHelper.setText(content, true);
            // true는 html을 사용하겠다는 의미입니다.

            javaMailSender.send(mimeMessage);

            return code;
        } catch (Exception e) {
            throw new EmailSendException();
        }
    }
    private String createCode() {
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (int i = 0; i < length; i++) {
                int randomIndex = random.nextInt(characters.length());
                builder.append(characters.charAt(randomIndex));
            }

            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            log.info("create mail authCode error : " + e.getMessage());
            throw new EmailSendException();
        }
    }


}






