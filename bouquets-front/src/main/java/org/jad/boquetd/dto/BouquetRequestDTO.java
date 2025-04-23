package org.jad.boquetd.dto;

import lombok.Data;

@Data
public class BouquetRequestDTO {
    private String nom;
    private String description;
    private Double prix;
    private String imageUrl;
}
