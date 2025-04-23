package org.jad.boquetd.service;

import lombok.RequiredArgsConstructor;
import org.jad.boquetd.dto.CommandeRequestDTO;
import org.jad.boquetd.dto.CommandeResponseDTO;
import org.jad.boquetd.entity.Bouquet;
import org.jad.boquetd.entity.Commande;
import org.jad.boquetd.entity.User;
import org.jad.boquetd.repository.BouquetRepository;
import org.jad.boquetd.repository.CommandeRepository;
import org.jad.boquetd.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final UserRepository userRepository;
    private final BouquetRepository bouquetRepository;

    public CommandeResponseDTO save(CommandeRequestDTO dto) {
        System.out.println("DTO: " + dto);
        User acheteur = userRepository.findById(dto.getAcheteurId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Commande commande = new Commande();
        commande.setAcheteur(acheteur);
        commande.setDateCommande(dto.getDateCommande().toString());
        commande.setBouquetIds(dto.getBouquetIds());
        commande.setQuantites(dto.getQuantites());

        Commande saved = commandeRepository.save(commande);
        return mapToDto(saved);
    }

    private CommandeResponseDTO mapToDto(Commande commande) {
        List<Bouquet> bouquets = bouquetRepository.findAllById(commande.getBouquetIds());
        List<Integer> quantites = commande.getQuantites();

        List<CommandeResponseDTO.ElementCommandeDTO> elements = new ArrayList<>();
        double total = 0;

        for (int i = 0; i < bouquets.size(); i++) {
            Bouquet bouquet = bouquets.get(i);
            int qte = quantites.get(i);
            double sousTotal = bouquet.getPrix() * qte;

            elements.add(CommandeResponseDTO.ElementCommandeDTO.builder()
                    .nomBouquet(bouquet.getNom())
                    .prixUnitaire(bouquet.getPrix())
                    .quantite(qte)
                    .sousTotal(sousTotal)
                    .build());

            total += sousTotal;
        }

        return CommandeResponseDTO.builder()
                .id(commande.getId())
                .dateCommande(commande.getDateCommande())
                .elements(elements)
                .prixTotal(total)
                .build();
    }
    public List<CommandeResponseDTO> findAll() {
        List<Commande> commandes = commandeRepository.findAll();
        List<CommandeResponseDTO> dtos = new ArrayList<>();

        for (Commande commande : commandes) {
            dtos.add(mapToDto(commande));
        }

        return dtos;
    }

}
