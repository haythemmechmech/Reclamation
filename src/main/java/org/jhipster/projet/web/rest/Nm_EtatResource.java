package org.jhipster.projet.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.projet.domain.Nm_Etat;
import org.jhipster.projet.repository.Nm_EtatRepository;
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
 * REST controller for managing Nm_Etat.
 */
@RestController
@RequestMapping("/api")
public class Nm_EtatResource {

    private final Logger log = LoggerFactory.getLogger(Nm_EtatResource.class);

    private static final String ENTITY_NAME = "nm_Etat";

    private final Nm_EtatRepository nm_EtatRepository;

    public Nm_EtatResource(Nm_EtatRepository nm_EtatRepository) {
        this.nm_EtatRepository = nm_EtatRepository;
    }

    /**
     * POST  /nm-etats : Create a new nm_Etat.
     *
     * @param nm_Etat the nm_Etat to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nm_Etat, or with status 400 (Bad Request) if the nm_Etat has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nm-etats")
    @Timed
    public ResponseEntity<Nm_Etat> createNm_Etat(@RequestBody Nm_Etat nm_Etat) throws URISyntaxException {
        log.debug("REST request to save Nm_Etat : {}", nm_Etat);
        if (nm_Etat.getId() != null) {
            throw new BadRequestAlertException("A new nm_Etat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nm_Etat result = nm_EtatRepository.save(nm_Etat);
        return ResponseEntity.created(new URI("/api/nm-etats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nm-etats : Updates an existing nm_Etat.
     *
     * @param nm_Etat the nm_Etat to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nm_Etat,
     * or with status 400 (Bad Request) if the nm_Etat is not valid,
     * or with status 500 (Internal Server Error) if the nm_Etat couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nm-etats")
    @Timed
    public ResponseEntity<Nm_Etat> updateNm_Etat(@RequestBody Nm_Etat nm_Etat) throws URISyntaxException {
        log.debug("REST request to update Nm_Etat : {}", nm_Etat);
        if (nm_Etat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nm_Etat result = nm_EtatRepository.save(nm_Etat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nm_Etat.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nm-etats : get all the nm_Etats.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nm_Etats in body
     */
    @GetMapping("/nm-etats")
    @Timed
    public List<Nm_Etat> getAllNm_Etats() {
        log.debug("REST request to get all Nm_Etats");
        return nm_EtatRepository.findAll();
    }

    /**
     * GET  /nm-etats/:id : get the "id" nm_Etat.
     *
     * @param id the id of the nm_Etat to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nm_Etat, or with status 404 (Not Found)
     */
    @GetMapping("/nm-etats/{id}")
    @Timed
    public ResponseEntity<Nm_Etat> getNm_Etat(@PathVariable Long id) {
        log.debug("REST request to get Nm_Etat : {}", id);
        Optional<Nm_Etat> nm_Etat = nm_EtatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nm_Etat);
    }

    /**
     * DELETE  /nm-etats/:id : delete the "id" nm_Etat.
     *
     * @param id the id of the nm_Etat to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nm-etats/{id}")
    @Timed
    public ResponseEntity<Void> deleteNm_Etat(@PathVariable Long id) {
        log.debug("REST request to delete Nm_Etat : {}", id);

        nm_EtatRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
