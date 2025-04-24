package org.jad.boquetd.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class CommandeRequestDTO {
    private Long acheteurId;
    private List<Long> bouquetIds;
    private List<Integer> quantites;
    private LocalDate dateCommande;
}
