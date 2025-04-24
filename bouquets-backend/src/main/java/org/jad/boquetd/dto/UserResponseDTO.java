package org.jad.boquetd.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
    private Long id;
    private String email;
    private String nom;
    private String prenom;
    private String adresse;
}
