package org.jhipster.projet.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.projet.domain.Reclamation;
import org.jhipster.projet.repository.ReclamationRepository;
import org.jhipster.projet.web.rest.errors.BadRequestAlertException;
import org.jhipster.projet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Reclamation.
 */
@RestController
@RequestMapping("/api")
public class ReclamationResource {

    private final Logger log = LoggerFactory.getLogger(ReclamationResource.class);

    private static final String ENTITY_NAME = "reclamation";

    private final ReclamationRepository reclamationRepository;

    public ReclamationResource(ReclamationRepository reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }

    /**
     * POST  /reclamations : Create a new reclamation.
     *
     * @param reclamation the reclamation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reclamation, or with status 400 (Bad Request) if the reclamation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reclamations")
    @Timed
    public ResponseEntity<Reclamation> createReclamation(@RequestBody Reclamation reclamation) throws URISyntaxException {
        log.debug("REST request to save Reclamation : {}", reclamation);
        if (reclamation.getId() != null) {
            throw new BadRequestAlertException("A new reclamation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reclamation result = reclamationRepository.save(reclamation);
        return ResponseEntity.created(new URI("/api/reclamations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reclamations : Updates an existing reclamation.
     *
     * @param reclamation the reclamation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reclamation,
     * or with status 400 (Bad Request) if the reclamation is not valid,
     * or with status 500 (Internal Server Error) if the reclamation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reclamations")
    @Timed
    public ResponseEntity<Reclamation> updateReclamation(@RequestBody Reclamation reclamation) throws URISyntaxException {
        log.debug("REST request to update Reclamation : {}", reclamation);
        if (reclamation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Reclamation result = reclamationRepository.save(reclamation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reclamation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reclamations : get all the reclamations.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of reclamations in body
     */
    @GetMapping("/reclamations")
    @Timed
    public List<Reclamation> getAllReclamations(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Reclamations");
        return reclamationRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /reclamations/:id : get the "id" reclamation.
     *
     * @param id the id of the reclamation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reclamation, or with status 404 (Not Found)
     */
    @GetMapping("/reclamations/{id}")
    @Timed
    public ResponseEntity<Reclamation> getReclamation(@PathVariable Long id) {
        log.debug("REST request to get Reclamation : {}", id);
        Optional<Reclamation> reclamation = reclamationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(reclamation);
    }

    /**
     * DELETE  /reclamations/:id : delete the "id" reclamation.
     *
     * @param id the id of the reclamation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reclamations/{id}")
    @Timed
    public ResponseEntity<Void> deleteReclamation(@PathVariable Long id) {
        log.debug("REST request to delete Reclamation : {}", id);

        reclamationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
