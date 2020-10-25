package org.jhipster.projet.repository;

import org.jhipster.projet.domain.HistoriqueReclamation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HistoriqueReclamation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistoriqueReclamationRepository extends JpaRepository<HistoriqueReclamation, Long> {

}
