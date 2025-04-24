package org.jad.boquetd.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dateCommande;

    @ManyToOne
    private User acheteur;

    @ElementCollection
    private List<Long> bouquetIds;

    @ElementCollection
    private List<Integer> quantites;
}
