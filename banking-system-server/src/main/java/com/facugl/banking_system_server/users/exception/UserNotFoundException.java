package com.facugl.banking_system_server.users.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Extends Spring Security's own UsernameNotFoundException (not plain
 * RuntimeException) so that when it's thrown from the UserDetailsService
 * during login, DaoAuthenticationProvider's hideUserNotFoundExceptions
 * behavior (on by default) normalizes it into the same BadCredentialsException
 * a wrong password produces. Without this, an unknown username and a wrong
 * password returned different HTTP statuses and messages - a textbook
 * username-enumeration oracle.
 */
public class UserNotFoundException extends UsernameNotFoundException {
    public UserNotFoundException(String username) {
        super("User with username '" + username + "' was not found.");
    }
}
