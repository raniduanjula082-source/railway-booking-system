package com.example.backend.service.impl;

import com.example.backend.dto.request.TicketBookingRequest;
import com.example.backend.model.Ticket;
import com.example.backend.model.Train;
import com.example.backend.repository.TicketRepository;
import com.example.backend.repository.TrainRepository;
import com.example.backend.service.TicketService;
import com.example.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final TrainRepository trainRepository;

    @Override
    @Transactional
    public Ticket bookTicket(String userId, TicketBookingRequest bookingRequest) {
        Train train = trainRepository.findById(bookingRequest.getTrainId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Train not found with id: " + bookingRequest.getTrainId()));

        if (train.getAvailableSeats() < bookingRequest.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available");
        }

        train.setAvailableSeats(train.getAvailableSeats() - bookingRequest.getNumberOfSeats());
        trainRepository.save(train);

        Ticket ticket = new Ticket();
        ticket.setUserId(userId);
        ticket.setTrainId(bookingRequest.getTrainId());
        ticket.setPassengerName(bookingRequest.getPassengerName());
        ticket.setPrice(train.getPrice() * bookingRequest.getNumberOfSeats()); // Assuming price is per person
        ticket.setSeatNumber(train.getTotalSeats() - train.getAvailableSeats()); // Simple seat allocation logic
        ticket.setStatus("BOOKED");
        ticket.setBookingDate(LocalDate.now());

        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> getTicketsByUser(String userId) {
        return ticketRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void cancelTicket(String ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + ticketId));

        Train train = trainRepository.findById(ticket.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found associated with ticket"));

        train.setAvailableSeats(train.getAvailableSeats() + 1); // Assuming 1 ticket = 1 seat
        trainRepository.save(train);

        ticket.setStatus("CANCELLED");
        ticketRepository.save(ticket);
    }
}
