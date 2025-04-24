package org.jad.boquetd.entity;

import jakarta.persistence.*;
import lombok.*;
import org.jad.boquetd.entity.Commande;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String nom;
    private String prenom;
    private String adresse;

    @OneToMany(mappedBy = "acheteur", cascade = CascadeType.ALL)
    private List<Commande> commandes;
}
