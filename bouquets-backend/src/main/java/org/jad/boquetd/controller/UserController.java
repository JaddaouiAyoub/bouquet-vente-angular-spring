package org.jad.boquetd.controller;

import lombok.RequiredArgsConstructor;
import org.jad.boquetd.dto.LoginRequestDTO;
import org.jad.boquetd.dto.UserRequestDTO;
import org.jad.boquetd.dto.UserResponseDTO;
import org.jad.boquetd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDTO dto) {
        try {
            UserResponseDTO savedUser = userService.inscrire(dto);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {
        Optional<UserResponseDTO> response = userService.login(dto);

        if (response.isPresent()) {
            return ResponseEntity.ok(response.get());
        } else {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }
    }

}
