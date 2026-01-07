package com.example.backend.repository;

import com.example.backend.model.Train;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TrainRepository extends MongoRepository<Train, String> {
    List<Train> findBySourceAndDestination(String source, String destination);
}
