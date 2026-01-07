package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;

    private String userId;

    private String trainId;

    private String passengerName;

    private int seatNumber;

    private double price;

    private LocalDate bookingDate;

    private String status; // BOOKED, CANCELLED
}
