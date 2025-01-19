package com.facugl.banking_system_server.common.handler;

import static java.time.LocalDateTime.now;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.facugl.banking_system_server.accounts.exception.AccountNotFoundException;
import com.facugl.banking_system_server.accounts.exception.InsufficientBalanceException;
import com.facugl.banking_system_server.admin.modules.exception.ModuleAlreadyExistsException;
import com.facugl.banking_system_server.admin.modules.exception.ModuleNotFoundException;
import com.facugl.banking_system_server.admin.permissions.exception.GrantedPermissionNotFoundException;
import com.facugl.banking_system_server.admin.roles.exception.RoleAlreadyExistsException;
import com.facugl.banking_system_server.admin.roles.exception.RoleNotFoundException;
import com.facugl.banking_system_server.users.exception.UserNotFoundException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("An unexpected error occurred. Please try again.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.INTERNAL_SERVER_ERROR.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(errorResponse);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex,
			HttpServletRequest request) {
		String frontendMessage = "Some fields are invalid. Please correct them.";

		String backendMessage = ex.getBindingResult()
				.getFieldErrors()
				.stream()
				.map(error -> String.format("Field '%s': %s", error.getField(), error.getDefaultMessage()))
				.collect(Collectors.joining("; "));

		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage(frontendMessage)
				.backendMessage(backendMessage)
				.status(HttpStatus.BAD_REQUEST.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.contentType(MediaType.APPLICATION_JSON)
				.body(errorResponse);
	}

	@ExceptionHandler(AccountNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleAccountNotFound(AccountNotFoundException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested account was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.NOT_FOUND.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(errorResponse);
	}

	@ExceptionHandler(InsufficientBalanceException.class)
	public ResponseEntity<ErrorResponse> handleInsufficientBalance(InsufficientBalanceException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("Insufficient balance in account.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.BAD_REQUEST.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(errorResponse);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested user was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.NOT_FOUND.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(errorResponse);
	}

	@ExceptionHandler(RoleNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleRoleNotFound(RoleNotFoundException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested role was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.NOT_FOUND.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(errorResponse);
	}

	@ExceptionHandler(ModuleNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleModuleNotFound(ModuleNotFoundException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested module was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.NOT_FOUND.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(errorResponse);
	}

	@ExceptionHandler(GrantedPermissionNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleGrantedPermissionNotFound(GrantedPermissionNotFoundException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested permission was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.NOT_FOUND.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(errorResponse);
	}

	@ExceptionHandler(ModuleAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleModuleAlreadyExists(ModuleAlreadyExistsException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested module was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.CONFLICT.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(errorResponse);
	}

	@ExceptionHandler(RoleAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleRoleAlreadyExists(RoleAlreadyExistsException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("The requested role was not found.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.CONFLICT.value())
				.path(request.getRequestURI())
				.timestamp(now())
				.build();

		return ResponseEntity
				.status(HttpStatus.CONFLICT)
				.body(errorResponse);
	}

}
