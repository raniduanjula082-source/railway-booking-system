package com.example.backend.dto.request;

import lombok.Data;

@Data
public class TicketBookingRequest {
    private String trainId;
    private String passengerName;
    private int numberOfSeats; // Just in case, usually one per ticket but user might book multiple.
    // However, Ticket model has 'seatNumber', implying single ticket per seat.
    // Let's stick to simple single ticket for now or loop in service.
}
