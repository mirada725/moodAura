package com.example.moodaura.service;

import com.example.moodaura.dto.MoodEntryRequest;
import com.example.moodaura.dto.MoodEntryResponse;
import com.example.moodaura.entity.MoodEntry;
import com.example.moodaura.entity.User;
import com.example.moodaura.repository.MoodEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoodEntryService {

    @Autowired
    private MoodEntryRepository moodEntryRepository;

    @Autowired
    private UserService userService;

    public MoodEntryResponse createMoodEntry(String email, MoodEntryRequest request) {
        User user = userService.findByEmail(email);
        MoodEntry entry = new MoodEntry();
        entry.setUser(user);
        entry.setDate(request.getDate());
        entry.setMood(request.getMood());
        entry.setNote(request.getNote());
        MoodEntry saved = moodEntryRepository.save(entry);
        return new MoodEntryResponse(saved.getId(), saved.getDate(), saved.getMood(), saved.getNote());
    }

    public List<MoodEntryResponse> getMoodEntries(String email) {
        User user = userService.findByEmail(email);
        List<MoodEntry> entries = moodEntryRepository.findByUser(user);
        return entries.stream()
                .map(e -> new MoodEntryResponse(e.getId(), e.getDate(), e.getMood(), e.getNote()))
                .collect(Collectors.toList());
    }

    public void deleteMoodEntry(Long id, String email) {
        User user = userService.findByEmail(email);
        MoodEntry entry = moodEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mood entry not found"));
        if (!entry.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized");
        }
        moodEntryRepository.deleteById(id);
    }
}