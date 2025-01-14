package com.facugl.banking_system_server.common.validation;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class EnumValidatorConstraint implements ConstraintValidator<EnumValidator, String> {

    Set<String> values;

    @Override
    public void initialize(EnumValidator constraintAnnotation) {
        values = Stream.of(constraintAnnotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || values.contains(value);
    }

}
