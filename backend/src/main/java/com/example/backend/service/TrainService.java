package com.example.backend.service;

import com.example.backend.dto.request.TrainRequest;
import com.example.backend.model.Train;
import java.util.List;
import java.util.Optional;

public interface TrainService {
    Train addTrain(TrainRequest trainRequest);

    List<Train> getAllTrains();

    Optional<Train> getTrainById(String id);

    List<Train> getTrainsByRoute(String source, String destination);

    void deleteTrain(String id);

    Train updateTrain(String id, TrainRequest trainRequest);
}
