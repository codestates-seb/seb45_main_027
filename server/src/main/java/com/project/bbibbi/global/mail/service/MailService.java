package com.project.bbibbi.global.mail.service;

import com.project.bbibbi.domain.member.entity.Member;
import com.project.bbibbi.domain.member.repository.MemberRepository;
import com.project.bbibbi.domain.member.service.MemberService;
import com.project.bbibbi.global.exception.businessexception.emailexception.EmailSendException;
import com.project.bbibbi.global.exception.businessexception.emailexception.passwordException.PasswordSendException;
import com.project.bbibbi.global.exception.businessexception.memberexception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;

@Transactional
@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_=+[]{}|;:'\",.<>?";
    private static final String UPPER_CASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER_CASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";


    public String sendLoginEmail(String email) {
        String title = "BBIBBI 회원가입 인증 코드";
        String from = "BBIBBI";
        String code = createCode();

        String content = "<h3>회원가입 인증 번호</h3>"
                +"<p>안녕하세요</p>"
                +"<p>BBIBBI에 관심 가져 주셔서 감사합니다.</p>"
                +"<p>신뢰와 안전을 위해 이메일 인증이 필요합니다.</p>"
                +"<p>아래 인증 코드를 입력하여 회원가입을 완료해 주세요.</p>"
                + "<div style='border: 1px solid #e1e1e1; padding: 10px; width: 300px; text-align: center; display:flex;'>"
                + "<p style='font-weight: 700; padding: 0.25rem;'>인증 코드 : </p>"
                + code
                + "</div>"
                +"<p>인증 코드가 만료되기 전에 입력해 주시기 바랍니다.</p>"
                +"<p>감사합니다.</p>";

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            // 생성된 코드를 멤버 객체의 CHECKCODE로 저장
            member.updateCheckCode(code);
        } else {
            throw new MemberNotFoundException(); // 멤버가 존재하지 않을 경우 예외 처리
        }


        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mailHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");

            mailHelper.setFrom(from);
            // 빈에 아이디 설정한 것은 단순히 smtp 인증을 받기 위해 사용 따라서 보내는이(setFrom())반드시 필요

            mailHelper.setTo(email);
            mailHelper.setSubject(title);
            mailHelper.setText(content, true);
            // true는 html을 사용하겠다는 의미

            javaMailSender.send(mimeMessage);

            return code;
        } catch (Exception e) {
            throw new EmailSendException();
        }
    }

    public String sendPasswordEmail(String email) {
        String title = "BBIBBI 새로운 비밀번호 ";
        String from = "BBIBBI";
        String passwordCode = generatePassword();

        String content = "<h3>임시의 새로운 비밀번호 </h3>"
                +"<p>안녕하세요</p>"
                +"<p>BBIBBI를 이용해 주셔서 감사합니다.</p>"
                +"<p>비밀번호 재설정 요청을 받았기에 안내 메일을 보내 드립니다.</p>"
                +"<p>아래에 제시된 코드로 로그인 후 비밀번호를 변경해주세요.</p>"
                + "<div style='border: 1px solid #e1e1e1; padding: 10px; width: 300px; text-align: center; display:flex;'>"
                + "<p style='font-weight: 700; padding: 0.25rem;'>비밀번호 재설정 코드 : </p>"
                + passwordCode
                + "</div>"
                +"<p>코드가 만료되기 전에 재설정을 완료해 주시기 바랍니다.</p>"
                +"<p>감사합니다.</p>";

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            // 생성된 코드를 멤버 객체의 CHECKCODE로 저장
            member.updatePassword(passwordEncoder.encode(passwordCode));
        } else {
            throw new MemberNotFoundException(); // 멤버가 존재하지 않을 경우 예외 처리
        }


        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mailHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");

            mailHelper.setFrom(from);
            // 빈에 아이디 설정한 것은 단순히 smtp 인증을 받기 위해 사용 따라서 보내는이(setFrom())반드시 필요

            mailHelper.setTo(email);
            mailHelper.setSubject(title);
            mailHelper.setText(content, true);
            // true는 html을 사용하겠다는 의미

            javaMailSender.send(mimeMessage);

            return passwordCode;
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

    private String generatePassword() {
        int length = 10; // 비밀번호 길이 6-15자리
        StringBuilder password = new StringBuilder();

        try {
            SecureRandom random = SecureRandom.getInstanceStrong();

            // 특수문자, 영문 대/소문자, 숫자 중에서 무작위로 선택하여 비밀번호 생성
            for (int i = 0; i < length; i++) {
                int charType = random.nextInt(4); // 0부터 3까지의 값을 랜덤으로 선택

                switch (charType) {
                    case 0:
                        password.append(SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length())));
                        break;
                    case 1:
                        password.append(UPPER_CASE_LETTERS.charAt(random.nextInt(UPPER_CASE_LETTERS.length())));
                        break;
                    case 2:
                        password.append(LOWER_CASE_LETTERS.charAt(random.nextInt(LOWER_CASE_LETTERS.length())));
                        break;
                    case 3:
                        password.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
                        break;
                }
            }
        } catch (NoSuchAlgorithmException e) {
            log.info("create mail newpassword error : " + e.getMessage());
            throw new PasswordSendException();
        }

        return password.toString();
    }

}






