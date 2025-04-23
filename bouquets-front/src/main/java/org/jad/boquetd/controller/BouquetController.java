package org.jad.boquetd.controller;

import org.jad.boquetd.dto.BouquetRequestDTO;
import org.jad.boquetd.dto.BouquetResponseDTO;
import org.jad.boquetd.entity.Bouquet;
import org.jad.boquetd.service.BouquetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api/bouquets")
@CrossOrigin("*")
public class BouquetController {

    private final BouquetService bouquetService;

    public BouquetController(BouquetService bouquetService) {
        this.bouquetService = bouquetService;
    }

    // Créer un bouquet
    @PostMapping
    public ResponseEntity<BouquetResponseDTO> create(@RequestBody BouquetRequestDTO dto) {
        BouquetResponseDTO response = bouquetService.createBouquet(dto);
        return ResponseEntity.ok(response);
    }

    // Récupérer tous les bouquets
    @GetMapping
    public ResponseEntity<List<BouquetResponseDTO>> getAll() {
        return ResponseEntity.ok(bouquetService.getAllBouquets());
    }

    // Mettre à jour un bouquet existant
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody BouquetRequestDTO dto) {
        try {
            BouquetResponseDTO updated = bouquetService.updateBouquet(id, dto);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // Supprimer un bouquet
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            bouquetService.deleteBouquet(id);
            return ResponseEntity.ok("Bouquet supprimé avec succès.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/bouquets")
    public ResponseEntity<BouquetResponseDTO> uploadBouquet(
            @RequestParam("file") MultipartFile file,
            @RequestParam("nom") String nom,
            @RequestParam("description") String description,
            @RequestParam("prix") Double prix
    ) throws IOException {

        // 🟡 Nouveau chemin d'enregistrement externe
        String uploadDir = "C:/bouquets/images/";
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, filename);

        // 🟢 Crée le dossier si nécessaire et écrit l'image
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        // 🟢 Enregistre l'URL d'accès (comme exposée par le WebMvcConfigurer)
        String imageUrl = "/images/" + filename;

        // 🔧 Création du bouquet
        BouquetRequestDTO bouquet = new BouquetRequestDTO();
        bouquet.setNom(nom);
        bouquet.setDescription(description);
        bouquet.setPrix(prix);
        bouquet.setImageUrl(imageUrl); // l'URL que le front utilisera

        BouquetResponseDTO response = bouquetService.createBouquet(bouquet);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/bouquets/{id}")
    public ResponseEntity<BouquetResponseDTO> updateBouquet(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("nom") String nom,
            @RequestParam("description") String description,
            @RequestParam("prix") Double prix
    ) throws IOException {

        BouquetRequestDTO bouquetUpdate = new BouquetRequestDTO();
        bouquetUpdate.setNom(nom);
        bouquetUpdate.setDescription(description);
        bouquetUpdate.setPrix(prix);

        if (file != null && !file.isEmpty()) {
            // Nouvelle image → on la traite
            String uploadDir = "C:/bouquets/images/";
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            String imageUrl = "/images/" + filename;
            bouquetUpdate.setImageUrl(imageUrl); // nouvelle URL de l'image
        }

        BouquetResponseDTO response = bouquetService.updateBouquet(id, bouquetUpdate);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getBouquetById(@PathVariable Long id) {
        try {
            BouquetResponseDTO bouquet = bouquetService.getBouquetById(id);
            return ResponseEntity.ok(bouquet);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }


}
