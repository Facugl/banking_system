package com.facugl.banking_system_server.common.utils;

public class NameNormalizer {
    public static String normalize(String name) {
        if (name == null) return null;

        String result = name.trim()
                .toUpperCase()
                .replaceAll("[^A-Z0-9]+", "_")   // Replace spaces or invalid chars by "_"
                .replaceAll("_+", "_")           // Avoid "__"
                .replaceAll("^_", "")            // Remove "_" at start
                .replaceAll("_$", "");           // Remove "_" at end

        return result;
    }
}
