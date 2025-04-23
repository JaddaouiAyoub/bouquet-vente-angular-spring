package org.jad.boquetd.repository;

import org.jad.boquetd.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find commandes by user or status
}
