package org.jad.boquetd.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderService {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String encodePassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public static boolean checkPassword(String rawPassword, String encodedPassword) {
        return encoder.matches(rawPassword, encodedPassword);
    }
}
