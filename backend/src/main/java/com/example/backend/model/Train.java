package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "trains")
public class Train {
    @Id
    private String id;

    private String name;

    private String number;

    private String source;

    private String destination;

    private String departureTime;

    private String arrivalTime;

    private double price;

    private int totalSeats;

    private int availableSeats;
}
