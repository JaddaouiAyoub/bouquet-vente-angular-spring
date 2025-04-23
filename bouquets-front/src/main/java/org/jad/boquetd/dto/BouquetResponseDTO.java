package org.jad.boquetd.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BouquetResponseDTO {
    private Long id;
    private String nom;
    private String description;
    private Double prix;
    private String imageUrl;
}
