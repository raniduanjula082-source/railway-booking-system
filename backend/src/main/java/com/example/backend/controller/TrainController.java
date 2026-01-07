package com.example.backend.controller;

import com.example.backend.dto.request.TrainRequest;
import com.example.backend.model.Train;
import com.example.backend.service.TrainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
@RequiredArgsConstructor
public class TrainController {

    private final TrainService trainService;

    @GetMapping
    public List<Train> getAllTrains() {
        return trainService.getAllTrains();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Train> getTrainById(@PathVariable String id) {
        return trainService.getTrainById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Train> addTrain(@RequestBody TrainRequest trainRequest) {
        return ResponseEntity.ok(trainService.addTrain(trainRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Train> updateTrain(@PathVariable String id, @RequestBody TrainRequest trainRequest) {
        return ResponseEntity.ok(trainService.updateTrain(id, trainRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTrain(@PathVariable String id) {
        trainService.deleteTrain(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Train> searchTrains(@RequestParam String source, @RequestParam String destination) {
        return trainService.getTrainsByRoute(source, destination);
    }
}
