package com.facugl.banking_system_server.common.utils;

import java.util.Random;
import java.util.function.Predicate;

import org.springframework.stereotype.Component;

@Component
public class IdentifierGenerator {

    public String generateUniqueIdentifier(Predicate<String> existsCheck) {
        String identifier;

        do {
            identifier = generateRandomNumber();
        } while (existsCheck.test(identifier));

        return identifier;
    }

    private String generateRandomNumber() {
        Random random = new Random();

        int length = 10 + random.nextInt(11);
        StringBuilder number = new StringBuilder();

        for (int i = 0; i < length; i++) {
            number.append(random.nextInt(10));
        }

        return number.toString();
    }

}
