package com.facugl.banking_system_server.common.utils;

import org.springframework.stereotype.Component;

@Component
public class PathNormalizer {
    private PathNormalizer() {
    }

    public static String normalizeBasePath(String basePath) {
        if (basePath == null || basePath.isBlank()) {
            return "/";
        }

        basePath = basePath.trim();

        if (!basePath.startsWith("/")) {
            basePath = "/" + basePath;
        }

        while (basePath.startsWith("//")) {
            basePath = basePath.substring(1);
        }

        return basePath;
    }

}
