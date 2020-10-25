package org.jhipster.projet.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.projet.domain.HistoriqueReclamation;
import org.jhipster.projet.repository.HistoriqueReclamationRepository;
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
 * REST controller for managing HistoriqueReclamation.
 */
@RestController
@RequestMapping("/api")
public class HistoriqueReclamationResource {

    private final Logger log = LoggerFactory.getLogger(HistoriqueReclamationResource.class);

    private static final String ENTITY_NAME = "historiqueReclamation";

    private final HistoriqueReclamationRepository historiqueReclamationRepository;

    public HistoriqueReclamationResource(HistoriqueReclamationRepository historiqueReclamationRepository) {
        this.historiqueReclamationRepository = historiqueReclamationRepository;
    }

    /**
     * POST  /historique-reclamations : Create a new historiqueReclamation.
     *
     * @param historiqueReclamation the historiqueReclamation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new historiqueReclamation, or with status 400 (Bad Request) if the historiqueReclamation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/historique-reclamations")
    @Timed
    public ResponseEntity<HistoriqueReclamation> createHistoriqueReclamation(@RequestBody HistoriqueReclamation historiqueReclamation) throws URISyntaxException {
        log.debug("REST request to save HistoriqueReclamation : {}", historiqueReclamation);
        if (historiqueReclamation.getId() != null) {
            throw new BadRequestAlertException("A new historiqueReclamation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoriqueReclamation result = historiqueReclamationRepository.save(historiqueReclamation);
        return ResponseEntity.created(new URI("/api/historique-reclamations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /historique-reclamations : Updates an existing historiqueReclamation.
     *
     * @param historiqueReclamation the historiqueReclamation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated historiqueReclamation,
     * or with status 400 (Bad Request) if the historiqueReclamation is not valid,
     * or with status 500 (Internal Server Error) if the historiqueReclamation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/historique-reclamations")
    @Timed
    public ResponseEntity<HistoriqueReclamation> updateHistoriqueReclamation(@RequestBody HistoriqueReclamation historiqueReclamation) throws URISyntaxException {
        log.debug("REST request to update HistoriqueReclamation : {}", historiqueReclamation);
        if (historiqueReclamation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistoriqueReclamation result = historiqueReclamationRepository.save(historiqueReclamation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, historiqueReclamation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /historique-reclamations : get all the historiqueReclamations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of historiqueReclamations in body
     */
    @GetMapping("/historique-reclamations")
    @Timed
    public List<HistoriqueReclamation> getAllHistoriqueReclamations() {
        log.debug("REST request to get all HistoriqueReclamations");
        return historiqueReclamationRepository.findAll();
    }

    /**
     * GET  /historique-reclamations/:id : get the "id" historiqueReclamation.
     *
     * @param id the id of the historiqueReclamation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the historiqueReclamation, or with status 404 (Not Found)
     */
    @GetMapping("/historique-reclamations/{id}")
    @Timed
    public ResponseEntity<HistoriqueReclamation> getHistoriqueReclamation(@PathVariable Long id) {
        log.debug("REST request to get HistoriqueReclamation : {}", id);
        Optional<HistoriqueReclamation> historiqueReclamation = historiqueReclamationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(historiqueReclamation);
    }

    /**
     * DELETE  /historique-reclamations/:id : delete the "id" historiqueReclamation.
     *
     * @param id the id of the historiqueReclamation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/historique-reclamations/{id}")
    @Timed
    public ResponseEntity<Void> deleteHistoriqueReclamation(@PathVariable Long id) {
        log.debug("REST request to delete HistoriqueReclamation : {}", id);

        historiqueReclamationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
