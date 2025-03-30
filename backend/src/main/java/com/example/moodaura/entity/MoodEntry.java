package com.example.moodaura.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "mood_entry")
public class MoodEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private Integer mood;
    private String note;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
