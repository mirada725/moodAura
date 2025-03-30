package com.example.moodaura.repository;

import com.example.moodaura.entity.MoodEntry;
import com.example.moodaura.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {
    List<MoodEntry> findByUser(User user);
}