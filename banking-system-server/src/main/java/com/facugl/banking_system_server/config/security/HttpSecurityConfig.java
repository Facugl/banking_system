package com.facugl.banking_system_server.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;

import com.facugl.banking_system_server.config.security.filter.JwtAuthenticationFilter;
import com.facugl.banking_system_server.users.util.RoleEnum;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class HttpSecurityConfig {

	private final AuthenticationProvider daoAuthProvider;
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final AuthenticationEntryPoint authenticationEntryPoint;
	private final AccessDeniedHandler accessDeniedHandler;
	private final AuthorizationManager<RequestAuthorizationContext> authorizationManager;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http
				.csrf(csrfConfig -> csrfConfig.disable())
				.sessionManagement(management -> management
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(daoAuthProvider)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				.authorizeHttpRequests(authReqConfig -> {
					authReqConfig.anyRequest().access(authorizationManager);
				})
				.exceptionHandling(exceptionConfig -> {
					exceptionConfig.authenticationEntryPoint(authenticationEntryPoint);
					exceptionConfig.accessDeniedHandler(accessDeniedHandler);
				})
				.build();
	}

	private void buildRequestMatchers(
			AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry authReqConfig) {
		authReqConfig.requestMatchers(HttpMethod.POST, "/accounts")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());
		// authReqConfig.requestMatchers(HttpMethod.GET, "/accounts/{account-number}")
		authReqConfig.requestMatchers(RegexRequestMatcher.regexMatcher(HttpMethod.GET, "/accounts/^[0-9]{10,20}$"))
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());
		authReqConfig.requestMatchers(HttpMethod.GET, "/accounts")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());
		authReqConfig.requestMatchers(HttpMethod.PUT, "/accounts/{account-number}")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name());
		authReqConfig.requestMatchers(HttpMethod.PATCH, "/accounts/{account-number}/change-status")
				.hasAnyRole(RoleEnum.CUSTOMER.name());
		authReqConfig.requestMatchers(HttpMethod.DELETE, "/accounts/{account-number}")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name());
		authReqConfig.requestMatchers(HttpMethod.POST, "/accounts/{account-number}/deposit")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());
		authReqConfig.requestMatchers(HttpMethod.POST, "/accounts/{account-number}/withdraw")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());
		authReqConfig.requestMatchers(HttpMethod.POST, "/accounts/{source-account-number}/transfer")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());
		authReqConfig.requestMatchers(HttpMethod.GET, "/accounts/{account-number}/balance")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());

		authReqConfig.requestMatchers(HttpMethod.GET, "/transactions")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());

		authReqConfig.requestMatchers(HttpMethod.GET, "/auth/profile")
				.hasAnyRole(RoleEnum.ADMINISTRATOR.name(), RoleEnum.EMPLOYEE.name(), RoleEnum.CUSTOMER.name());

		authReqConfig.requestMatchers(HttpMethod.POST, "/users").permitAll();
		authReqConfig.requestMatchers(HttpMethod.POST, "/auth/authenticate").permitAll();
		authReqConfig.requestMatchers(HttpMethod.GET, "/auth/validate-token").permitAll();

		authReqConfig.anyRequest().authenticated();
	}

}
