package org.jad.boquetd.service;

import org.jad.boquetd.dto.BouquetRequestDTO;
import org.jad.boquetd.dto.BouquetResponseDTO;
import org.jad.boquetd.entity.Bouquet;
import org.jad.boquetd.repository.BouquetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class BouquetService {

    private final BouquetRepository bouquetRepository;

    public BouquetService(BouquetRepository bouquetRepository) {
        this.bouquetRepository = bouquetRepository;
    }

    // Créer un bouquet
    public BouquetResponseDTO createBouquet(BouquetRequestDTO dto) {
        Bouquet bouquet = Bouquet.builder()
                .nom(dto.getNom())
                .description(dto.getDescription())
                .prix(dto.getPrix())
                .imageUrl(dto.getImageUrl())
                .build();

        Bouquet saved = bouquetRepository.save(bouquet);
        return toResponseDTO(saved);
    }

    // Récupérer la liste des bouquets
    public List<BouquetResponseDTO> getAllBouquets() {
        return bouquetRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Mettre à jour un bouquet existant
    public BouquetResponseDTO updateBouquet(Long id, BouquetRequestDTO dto) {
        Bouquet existing = bouquetRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bouquet non trouvé avec id : " + id));

        existing.setNom(dto.getNom());
        existing.setDescription(dto.getDescription());
        existing.setPrix(dto.getPrix());

        if (dto.getImageUrl() != null) {
            existing.setImageUrl(dto.getImageUrl());
        }

        return toResponseDTO(bouquetRepository.save(existing));

    }

    // Supprimer un bouquet
    public void deleteBouquet(Long id) {
        if (!bouquetRepository.existsById(id)) {
            throw new NoSuchElementException("Bouquet non trouvé avec id : " + id);
        }
        bouquetRepository.deleteById(id);
    }
    //Méthode pour récupérer un bouquet par son ID
    public BouquetResponseDTO getBouquetById(Long id) {
        Bouquet bouquet = bouquetRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bouquet non trouvé avec id : " + id));
        return toResponseDTO(bouquet);
    }

    // Méthode de mapping de l'entité en DTO
    private BouquetResponseDTO toResponseDTO(Bouquet bouquet) {
        return BouquetResponseDTO.builder()
                .id(bouquet.getId())
                .nom(bouquet.getNom())
                .description(bouquet.getDescription())
                .prix(bouquet.getPrix())
                .imageUrl(bouquet.getImageUrl())
                .build();
    }

}
