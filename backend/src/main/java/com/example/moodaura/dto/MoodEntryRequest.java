package com.example.moodaura.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MoodEntryRequest {
    private LocalDate date;
    private Integer mood;
    private String note;
}