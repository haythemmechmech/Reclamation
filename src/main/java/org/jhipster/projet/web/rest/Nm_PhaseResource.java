package org.jhipster.projet.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.projet.domain.Nm_Phase;
import org.jhipster.projet.repository.Nm_PhaseRepository;
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
 * REST controller for managing Nm_Phase.
 */
@RestController
@RequestMapping("/api")
public class Nm_PhaseResource {

    private final Logger log = LoggerFactory.getLogger(Nm_PhaseResource.class);

    private static final String ENTITY_NAME = "nm_Phase";

    private final Nm_PhaseRepository nm_PhaseRepository;

    public Nm_PhaseResource(Nm_PhaseRepository nm_PhaseRepository) {
        this.nm_PhaseRepository = nm_PhaseRepository;
    }

    /**
     * POST  /nm-phases : Create a new nm_Phase.
     *
     * @param nm_Phase the nm_Phase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nm_Phase, or with status 400 (Bad Request) if the nm_Phase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nm-phases")
    @Timed
    public ResponseEntity<Nm_Phase> createNm_Phase(@RequestBody Nm_Phase nm_Phase) throws URISyntaxException {
        log.debug("REST request to save Nm_Phase : {}", nm_Phase);
        if (nm_Phase.getId() != null) {
            throw new BadRequestAlertException("A new nm_Phase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nm_Phase result = nm_PhaseRepository.save(nm_Phase);
        return ResponseEntity.created(new URI("/api/nm-phases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nm-phases : Updates an existing nm_Phase.
     *
     * @param nm_Phase the nm_Phase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nm_Phase,
     * or with status 400 (Bad Request) if the nm_Phase is not valid,
     * or with status 500 (Internal Server Error) if the nm_Phase couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nm-phases")
    @Timed
    public ResponseEntity<Nm_Phase> updateNm_Phase(@RequestBody Nm_Phase nm_Phase) throws URISyntaxException {
        log.debug("REST request to update Nm_Phase : {}", nm_Phase);
        if (nm_Phase.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nm_Phase result = nm_PhaseRepository.save(nm_Phase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nm_Phase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nm-phases : get all the nm_Phases.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nm_Phases in body
     */
    @GetMapping("/nm-phases")
    @Timed
    public List<Nm_Phase> getAllNm_Phases() {
        log.debug("REST request to get all Nm_Phases");
        return nm_PhaseRepository.findAll();
    }

    /**
     * GET  /nm-phases/:id : get the "id" nm_Phase.
     *
     * @param id the id of the nm_Phase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nm_Phase, or with status 404 (Not Found)
     */
    @GetMapping("/nm-phases/{id}")
    @Timed
    public ResponseEntity<Nm_Phase> getNm_Phase(@PathVariable Long id) {
        log.debug("REST request to get Nm_Phase : {}", id);
        Optional<Nm_Phase> nm_Phase = nm_PhaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nm_Phase);
    }

    /**
     * DELETE  /nm-phases/:id : delete the "id" nm_Phase.
     *
     * @param id the id of the nm_Phase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nm-phases/{id}")
    @Timed
    public ResponseEntity<Void> deleteNm_Phase(@PathVariable Long id) {
        log.debug("REST request to delete Nm_Phase : {}", id);

        nm_PhaseRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
