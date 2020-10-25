package org.jhipster.projet.repository;

import org.jhipster.projet.domain.Action;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Action entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query(value = "select distinct action from Action action left join fetch action.nm_PhaseSuivants",
        countQuery = "select count(distinct action) from Action action")
    Page<Action> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct action from Action action left join fetch action.nm_PhaseSuivants")
    List<Action> findAllWithEagerRelationships();

    @Query("select action from Action action left join fetch action.nm_PhaseSuivants where action.id =:id")
    Optional<Action> findOneWithEagerRelationships(@Param("id") Long id);

}
