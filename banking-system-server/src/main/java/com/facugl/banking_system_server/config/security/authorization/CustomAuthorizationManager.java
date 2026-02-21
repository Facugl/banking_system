package com.facugl.banking_system_server.config.security.authorization;

import com.facugl.banking_system_server.admin.operations.persistence.entity.Operation;
import com.facugl.banking_system_server.admin.operations.persistence.repository.OperationRepository;
import com.facugl.banking_system_server.users.exception.UserNotFoundException;
import com.facugl.banking_system_server.users.persistence.entity.User;
import com.facugl.banking_system_server.users.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class CustomAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

  private final OperationRepository operationRepository;
  private final UserService userService;

  @Override
  public AuthorizationDecision check(Supplier<Authentication> authentication,
                                     RequestAuthorizationContext requestContext) {

    HttpServletRequest request = requestContext.getRequest();

    String url = extractUrl(request);
    String httpMethod = request.getMethod();

    boolean isPublic = isPublic(url, httpMethod);

    if (isPublic) {
      return new AuthorizationDecision(true);
    }

    boolean isGranted = isGranted(url, httpMethod, authentication.get());

    return new AuthorizationDecision(isGranted);

  }

  private boolean isGranted(String url, String httpMethod, Authentication authentication) {
    if (authentication == null || !(authentication instanceof UsernamePasswordAuthenticationToken)) {
      throw new AuthenticationCredentialsNotFoundException("User not logged in");
    }

    List<Operation> operations = obtainedOperations(authentication);

    boolean isGranted = operations.stream().anyMatch(getOperationPredicate(url, httpMethod));

    return isGranted;
  }

  private Predicate<? super Operation> getOperationPredicate(String url, String httpMethod) {
    return operation -> {
      String basePath = operation.getModule().getBasePath();

      Pattern pattern = Pattern.compile(basePath.concat(operation.getPath()));
      Matcher matcher = pattern.matcher(url);

      return matcher.matches() && operation.getHttpMethod().equals(httpMethod);
    };
  }

  private List<Operation> obtainedOperations(Authentication authentication) {
    UsernamePasswordAuthenticationToken authToken = (UsernamePasswordAuthenticationToken) authentication;

    Object principal = authToken.getPrincipal();

    String username;

    if (principal instanceof org.springframework.security.core.userdetails.UserDetails userDetails) {
      username = userDetails.getUsername();
    } else {
      username = principal.toString();
    }

    User user = userService.findByUsername(username)
        .orElseThrow(() -> new UserNotFoundException(username));

    return user.getRole().getPermissions().stream()
        .map(grantedPermission -> grantedPermission.getOperation())
        .collect(Collectors.toList());
  }

  private boolean isPublic(String url, String httpMethod) {
    List<Operation> publicAccessEndpoints = operationRepository.findByPublicAccess();

    boolean isPublic = publicAccessEndpoints.stream().anyMatch(getOperationPredicate(url, httpMethod));

    return isPublic;
  }

  private String extractUrl(HttpServletRequest request) {
    String contextPath = request.getContextPath();
    String url = request.getRequestURI();
    url = url.replace(contextPath, "");

    return url;
  }

}
