package org.jad.boquetd.repository;

import org.jad.boquetd.entity.Bouquet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BouquetRepository extends JpaRepository<Bouquet, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find bouquets by user or status
}
