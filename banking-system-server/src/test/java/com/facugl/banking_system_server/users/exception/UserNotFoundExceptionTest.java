package com.facugl.banking_system_server.users.exception;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

class UserNotFoundExceptionTest {

  @Test
  void shouldBeAUsernameNotFoundException() {
    UserNotFoundException exception = new UserNotFoundException("naruto");

    // DaoAuthenticationProvider only normalizes "unknown username" and "wrong
    // password" into the same BadCredentialsException during login when the
    // UserDetailsService throws Spring Security's own UsernameNotFoundException.
    // If this stops being true, the login endpoint leaks which part was wrong
    // again (different HTTP status/message for each case).
    assertInstanceOf(UsernameNotFoundException.class, exception);
  }

  @Test
  void shouldKeepTheDescriptiveMessageForNonLoginCallers() {
    UserNotFoundException exception = new UserNotFoundException("naruto");

    assertEquals("User with username 'naruto' was not found.", exception.getMessage());
  }

}
