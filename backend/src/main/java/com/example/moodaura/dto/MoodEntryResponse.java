package com.example.moodaura.dto;

import lombok.Data;
import java.time.LocalDate;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class MoodEntryResponse {
    private Long id;
    private LocalDate date;
    private Integer mood;
    private String note;
}