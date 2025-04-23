package org.jad.boquetd.controller;

import lombok.RequiredArgsConstructor;
import org.jad.boquetd.dto.CommandeRequestDTO;
import org.jad.boquetd.dto.CommandeResponseDTO;
import org.jad.boquetd.service.CommandeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/commandes")
@RequiredArgsConstructor
public class CommandeController {

    private final CommandeService commandeService;

    @PostMapping
    public ResponseEntity<CommandeResponseDTO> createCommande(@RequestBody CommandeRequestDTO dto) {
        CommandeResponseDTO response = commandeService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<CommandeResponseDTO>> getAllCommandes() {
        List<CommandeResponseDTO> commandes = commandeService.findAll();
        return ResponseEntity.ok(commandes);
    }
}
