package com.facugl.banking_system_server.auth.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtServiceImplTest {

  @Mock
  private HttpServletRequest request;

  private JwtServiceImpl jwtService;

  @BeforeEach
  void setUp() {
    jwtService = new JwtServiceImpl();
  }

  @Test
  void extractJwtFromRequest_shouldReturnTheToken() {
    when(request.getHeader("Authorization")).thenReturn("Bearer abc123");

    assertEquals("abc123", jwtService.extractJwtFromRequest(request));
  }

  @Test
  void extractJwtFromRequest_shouldReturnNullWhenHeaderIsMissing() {
    when(request.getHeader("Authorization")).thenReturn(null);

    assertNull(jwtService.extractJwtFromRequest(request));
  }

  @Test
  void extractJwtFromRequest_shouldReturnNullWhenSchemeIsNotBearer() {
    when(request.getHeader("Authorization")).thenReturn("Basic abc123");

    assertNull(jwtService.extractJwtFromRequest(request));
  }

  @Test
  void extractJwtFromRequest_shouldReturnNullInsteadOfThrowingWhenBearerHasNoToken() {
    // Previously: "Bearer ".split(" ")[1] threw ArrayIndexOutOfBoundsException
    // here instead of being treated as "no token present". That exception
    // escaped the filter chain before Spring Security could turn it into a
    // clean 401, and surfaced as a bare 500 instead.
    when(request.getHeader("Authorization")).thenReturn("Bearer ");

    assertNull(jwtService.extractJwtFromRequest(request));
  }

  @Test
  void extractJwtFromRequest_shouldTrimSurroundingWhitespaceFromTheToken() {
    when(request.getHeader("Authorization")).thenReturn("Bearer   abc123  ");

    assertEquals("abc123", jwtService.extractJwtFromRequest(request));
  }

}
