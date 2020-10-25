package org.jhipster.projet.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.projet.domain.Nm_TypeReclamation;
import org.jhipster.projet.repository.Nm_TypeReclamationRepository;
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
 * REST controller for managing Nm_TypeReclamation.
 */
@RestController
@RequestMapping("/api")
public class Nm_TypeReclamationResource {

    private final Logger log = LoggerFactory.getLogger(Nm_TypeReclamationResource.class);

    private static final String ENTITY_NAME = "nm_TypeReclamation";

    private final Nm_TypeReclamationRepository nm_TypeReclamationRepository;

    public Nm_TypeReclamationResource(Nm_TypeReclamationRepository nm_TypeReclamationRepository) {
        this.nm_TypeReclamationRepository = nm_TypeReclamationRepository;
    }

    /**
     * POST  /nm-type-reclamations : Create a new nm_TypeReclamation.
     *
     * @param nm_TypeReclamation the nm_TypeReclamation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nm_TypeReclamation, or with status 400 (Bad Request) if the nm_TypeReclamation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nm-type-reclamations")
    @Timed
    public ResponseEntity<Nm_TypeReclamation> createNm_TypeReclamation(@RequestBody Nm_TypeReclamation nm_TypeReclamation) throws URISyntaxException {
        log.debug("REST request to save Nm_TypeReclamation : {}", nm_TypeReclamation);
        if (nm_TypeReclamation.getId() != null) {
            throw new BadRequestAlertException("A new nm_TypeReclamation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nm_TypeReclamation result = nm_TypeReclamationRepository.save(nm_TypeReclamation);
        return ResponseEntity.created(new URI("/api/nm-type-reclamations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nm-type-reclamations : Updates an existing nm_TypeReclamation.
     *
     * @param nm_TypeReclamation the nm_TypeReclamation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nm_TypeReclamation,
     * or with status 400 (Bad Request) if the nm_TypeReclamation is not valid,
     * or with status 500 (Internal Server Error) if the nm_TypeReclamation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nm-type-reclamations")
    @Timed
    public ResponseEntity<Nm_TypeReclamation> updateNm_TypeReclamation(@RequestBody Nm_TypeReclamation nm_TypeReclamation) throws URISyntaxException {
        log.debug("REST request to update Nm_TypeReclamation : {}", nm_TypeReclamation);
        if (nm_TypeReclamation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nm_TypeReclamation result = nm_TypeReclamationRepository.save(nm_TypeReclamation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nm_TypeReclamation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nm-type-reclamations : get all the nm_TypeReclamations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nm_TypeReclamations in body
     */
    @GetMapping("/nm-type-reclamations")
    @Timed
    public List<Nm_TypeReclamation> getAllNm_TypeReclamations() {
        log.debug("REST request to get all Nm_TypeReclamations");
        return nm_TypeReclamationRepository.findAll();
    }

    /**
     * GET  /nm-type-reclamations/:id : get the "id" nm_TypeReclamation.
     *
     * @param id the id of the nm_TypeReclamation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nm_TypeReclamation, or with status 404 (Not Found)
     */
    @GetMapping("/nm-type-reclamations/{id}")
    @Timed
    public ResponseEntity<Nm_TypeReclamation> getNm_TypeReclamation(@PathVariable Long id) {
        log.debug("REST request to get Nm_TypeReclamation : {}", id);
        Optional<Nm_TypeReclamation> nm_TypeReclamation = nm_TypeReclamationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nm_TypeReclamation);
    }

    /**
     * DELETE  /nm-type-reclamations/:id : delete the "id" nm_TypeReclamation.
     *
     * @param id the id of the nm_TypeReclamation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nm-type-reclamations/{id}")
    @Timed
    public ResponseEntity<Void> deleteNm_TypeReclamation(@PathVariable Long id) {
        log.debug("REST request to delete Nm_TypeReclamation : {}", id);

        nm_TypeReclamationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
