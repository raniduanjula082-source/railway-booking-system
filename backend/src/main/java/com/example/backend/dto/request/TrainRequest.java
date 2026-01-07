package com.example.backend.dto.request;

import lombok.Data;

@Data
public class TrainRequest {
    private String name;
    private String number;
    private String source;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    private double price;
    private int totalSeats;
}
