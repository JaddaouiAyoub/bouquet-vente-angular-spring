//package org.jad.boquetd.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class CommandeBouquet {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "commande_id", nullable = false)
//    private Commande commande;
//
//    @ManyToOne
//    @JoinColumn(name = "bouquet_id", nullable = false)
//    private Bouquet bouquet;
//
//    private int quantite;
//    private double prixUnitaire;
//}
