package com.example.moodaura.controller;

import com.example.moodaura.dto.MoodEntryRequest;
import com.example.moodaura.dto.MoodEntryResponse; // Updated import
import com.example.moodaura.service.MoodEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mood")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MoodEntryController {

    @Autowired
    private MoodEntryService moodEntryService;

    @PostMapping("/entries") // Updated endpoint for clarity
    public ResponseEntity<MoodEntryResponse> createMoodEntry(@RequestBody MoodEntryRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        MoodEntryResponse entry = moodEntryService.createMoodEntry(email, request);
        return ResponseEntity.ok(entry);
    }

    @GetMapping("/entries") // Updated endpoint for clarity
    public ResponseEntity<List<MoodEntryResponse>> getMoodEntries() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        List<MoodEntryResponse> entries = moodEntryService.getMoodEntries(email);
        return ResponseEntity.ok(entries);
    }

    @DeleteMapping("/entries/{id}") // Updated endpoint for clarity
    public ResponseEntity<Void> deleteMoodEntry(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        moodEntryService.deleteMoodEntry(id, email);
        return ResponseEntity.ok().build();
    }
}