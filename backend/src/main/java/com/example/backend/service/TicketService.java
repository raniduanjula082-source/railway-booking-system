package com.example.backend.service;

import com.example.backend.dto.request.TicketBookingRequest;
import com.example.backend.model.Ticket;
import java.util.List;

public interface TicketService {
    Ticket bookTicket(String userId, TicketBookingRequest bookingRequest);

    List<Ticket> getTicketsByUser(String userId);

    void cancelTicket(String ticketId);
}
