package com.facugl.banking_system_server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(properties = "spring.profiles.active=test")
class BankingSystemServerApplicationTests {

	@Test
	void contextLoads() {
	}

}
