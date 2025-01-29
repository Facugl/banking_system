package com.facugl.banking_system_server.admin.statistics.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.facugl.banking_system_server.admin.statistics.dto.response.StatisticsResponse;
import com.facugl.banking_system_server.admin.statistics.service.StatisticsServiceImpl;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/statistics")
@RestController
public class StatisticsController {

    private final StatisticsServiceImpl statisticsService;

    @GetMapping
    public ResponseEntity<StatisticsResponse> getDashboardStatistics() {
        StatisticsResponse statistics = statisticsService.getStatistics();

        return ResponseEntity.status(HttpStatus.OK).body(statistics);
    }

}
