package org.jhipster.projet.repository;

import org.jhipster.projet.domain.Reclamation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Reclamation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {

    @Query(value = "select distinct reclamation from Reclamation reclamation left join fetch reclamation.nm_Etats left join fetch reclamation.phases",
        countQuery = "select count(distinct reclamation) from Reclamation reclamation")
    Page<Reclamation> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct reclamation from Reclamation reclamation left join fetch reclamation.nm_Etats left join fetch reclamation.phases")
    List<Reclamation> findAllWithEagerRelationships();

    @Query("select reclamation from Reclamation reclamation left join fetch reclamation.nm_Etats left join fetch reclamation.phases where reclamation.id =:id")
    Optional<Reclamation> findOneWithEagerRelationships(@Param("id") Long id);

}
