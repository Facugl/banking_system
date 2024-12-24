package com.facugl.banking_system_server.common.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.facugl.banking_system_server.accounts.exception.AccountAlreadyExistsException;
import com.facugl.banking_system_server.accounts.exception.AccountNotFoundException;
import com.facugl.banking_system_server.accounts.exception.InsufficientBalanceException;

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
				.timestamp(java.time.LocalDateTime.now().toString())
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
				.map(error -> String.format("Field '%s': %s", error.getField(),
						error.getDefaultMessage()))
				.reduce("", (a, b) -> a + "; " + b);

		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage(frontendMessage)
				.backendMessage(backendMessage)
				.status(HttpStatus.BAD_REQUEST.value())
				.path(request.getRequestURI())
				.timestamp(java.time.LocalDateTime.now().toString())
				.build();

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(errorResponse);
	}

	@ExceptionHandler(AccountAlreadyExistsException.class)
	public ResponseEntity<ErrorResponse> handleAccountAlreadyExists(AccountAlreadyExistsException ex,
			HttpServletRequest request) {
		ErrorResponse errorResponse = ErrorResponse.builder()
				.frontendMessage("An account with this number already exists.")
				.backendMessage(ex.getMessage())
				.status(HttpStatus.BAD_REQUEST.value())
				.path(request.getRequestURI())
				.timestamp(java.time.LocalDateTime.now().toString())
				.build();

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
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
				.timestamp(java.time.LocalDateTime.now().toString())
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
				.timestamp(java.time.LocalDateTime.now().toString())
				.build();

		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(errorResponse);
	}

}
