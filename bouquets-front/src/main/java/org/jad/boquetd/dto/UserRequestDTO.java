package org.jad.boquetd.dto;

import lombok.Data;

@Data
public class UserRequestDTO {
    private String email;
    private String password;
    private String nom;
    private String prenom;
    private String adresse;
}
