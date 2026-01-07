package com.example.backend.service;

import com.example.backend.dto.request.SignupRequest;
import com.example.backend.model.User;
import java.util.Optional;

public interface UserService {
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User saveUser(SignupRequest signupRequest);

    Optional<User> findByUsername(String username);
}
