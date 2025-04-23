package org.jad.boquetd.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class CommandeResponseDTO {
    private Long id;
    private String dateCommande;
    private List<ElementCommandeDTO> elements;
    private double prixTotal;

    @Builder
    @Getter
    @Setter
    public static class ElementCommandeDTO {
        private String nomBouquet;
        private double prixUnitaire;
        private int quantite;
        private double sousTotal;
    }
}
