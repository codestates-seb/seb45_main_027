package com.project.bbibbi.auth.utils;

import java.util.Random;

public class NicknameUtil { //

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int NICKNAME_LENGTH = 5; // 원하는 닉네임 길이로 변경 가능

    public static String generateRandomNickname() {
        StringBuilder nickname = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < NICKNAME_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(index);
            nickname.append(randomChar);
        }

        return nickname.toString();
    }
}








