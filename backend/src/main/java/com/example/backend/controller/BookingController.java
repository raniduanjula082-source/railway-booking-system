package com.example.backend.controller;

import com.example.backend.dto.request.TicketBookingRequest;
import com.example.backend.model.Ticket;
import com.example.backend.service.TicketService;
import com.example.backend.security.services.UserDetailsImpl; // Or get user ID directly from SecurityContext
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class BookingController { // Renamed to BookingController but endpoint /tickets

    private final TicketService ticketService;

    @PostMapping("/book")
    public ResponseEntity<Ticket> bookTicket(@RequestBody TicketBookingRequest bookingRequest,
            @AuthenticationPrincipal UserDetails userDetails) { // Get Logged in user
        // Assuming userDetails.getUsername() is unique or use ID if UserDetailsImpl has
        // it (YES)
        String userId = ((UserDetailsImpl) userDetails).getId();
        return ResponseEntity.ok(ticketService.bookTicket(userId, bookingRequest));
    }

    @GetMapping("/my-tickets")
    public List<Ticket> getMyTickets(@AuthenticationPrincipal UserDetails userDetails) {
        String userId = ((UserDetailsImpl) userDetails).getId();
        return ticketService.getTicketsByUser(userId);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<Void> cancelTicket(@PathVariable String id) {
        ticketService.cancelTicket(id);
        return ResponseEntity.ok().build();
    }
}
