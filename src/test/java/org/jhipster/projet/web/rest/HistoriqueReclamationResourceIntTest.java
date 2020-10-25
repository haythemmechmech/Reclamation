package org.jhipster.projet.web.rest;

import org.jhipster.projet.ReclamationApp;

import org.jhipster.projet.domain.HistoriqueReclamation;
import org.jhipster.projet.repository.HistoriqueReclamationRepository;
import org.jhipster.projet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static org.jhipster.projet.web.rest.TestUtil.sameInstant;
import static org.jhipster.projet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HistoriqueReclamationResource REST controller.
 *
 * @see HistoriqueReclamationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReclamationApp.class)
public class HistoriqueReclamationResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final String DEFAULT_AFFECTED_TO = "AAAAAAAAAA";
    private static final String UPDATED_AFFECTED_TO = "BBBBBBBBBB";

    private static final Long DEFAULT_RECLAMATION_ID = 1L;
    private static final Long UPDATED_RECLAMATION_ID = 2L;

    private static final ZonedDateTime DEFAULT_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_PHASE_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_PHASE_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_ETAT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_ETAT_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_LIBELLE = "BBBBBBBBBB";

    @Autowired
    private HistoriqueReclamationRepository historiqueReclamationRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHistoriqueReclamationMockMvc;

    private HistoriqueReclamation historiqueReclamation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HistoriqueReclamationResource historiqueReclamationResource = new HistoriqueReclamationResource(historiqueReclamationRepository);
        this.restHistoriqueReclamationMockMvc = MockMvcBuilders.standaloneSetup(historiqueReclamationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistoriqueReclamation createEntity(EntityManager em) {
        HistoriqueReclamation historiqueReclamation = new HistoriqueReclamation()
            .description(DEFAULT_DESCRIPTION)
            .titre(DEFAULT_TITRE)
            .created_at(DEFAULT_CREATED_AT)
            .created_by(DEFAULT_CREATED_BY)
            .affected_to(DEFAULT_AFFECTED_TO)
            .reclamation_id(DEFAULT_RECLAMATION_ID)
            .updated_at(DEFAULT_UPDATED_AT)
            .phase_libelle(DEFAULT_PHASE_LIBELLE)
            .etat_libelle(DEFAULT_ETAT_LIBELLE)
            .type_libelle(DEFAULT_TYPE_LIBELLE);
        return historiqueReclamation;
    }

    @Before
    public void initTest() {
        historiqueReclamation = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistoriqueReclamation() throws Exception {
        int databaseSizeBeforeCreate = historiqueReclamationRepository.findAll().size();

        // Create the HistoriqueReclamation
        restHistoriqueReclamationMockMvc.perform(post("/api/historique-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historiqueReclamation)))
            .andExpect(status().isCreated());

        // Validate the HistoriqueReclamation in the database
        List<HistoriqueReclamation> historiqueReclamationList = historiqueReclamationRepository.findAll();
        assertThat(historiqueReclamationList).hasSize(databaseSizeBeforeCreate + 1);
        HistoriqueReclamation testHistoriqueReclamation = historiqueReclamationList.get(historiqueReclamationList.size() - 1);
        assertThat(testHistoriqueReclamation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testHistoriqueReclamation.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testHistoriqueReclamation.getCreated_at()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testHistoriqueReclamation.getCreated_by()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testHistoriqueReclamation.getAffected_to()).isEqualTo(DEFAULT_AFFECTED_TO);
        assertThat(testHistoriqueReclamation.getReclamation_id()).isEqualTo(DEFAULT_RECLAMATION_ID);
        assertThat(testHistoriqueReclamation.getUpdated_at()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testHistoriqueReclamation.getPhase_libelle()).isEqualTo(DEFAULT_PHASE_LIBELLE);
        assertThat(testHistoriqueReclamation.getEtat_libelle()).isEqualTo(DEFAULT_ETAT_LIBELLE);
        assertThat(testHistoriqueReclamation.getType_libelle()).isEqualTo(DEFAULT_TYPE_LIBELLE);
    }

    @Test
    @Transactional
    public void createHistoriqueReclamationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historiqueReclamationRepository.findAll().size();

        // Create the HistoriqueReclamation with an existing ID
        historiqueReclamation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistoriqueReclamationMockMvc.perform(post("/api/historique-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historiqueReclamation)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueReclamation in the database
        List<HistoriqueReclamation> historiqueReclamationList = historiqueReclamationRepository.findAll();
        assertThat(historiqueReclamationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHistoriqueReclamations() throws Exception {
        // Initialize the database
        historiqueReclamationRepository.saveAndFlush(historiqueReclamation);

        // Get all the historiqueReclamationList
        restHistoriqueReclamationMockMvc.perform(get("/api/historique-reclamations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historiqueReclamation.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].created_at").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].created_by").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].affected_to").value(hasItem(DEFAULT_AFFECTED_TO.toString())))
            .andExpect(jsonPath("$.[*].reclamation_id").value(hasItem(DEFAULT_RECLAMATION_ID.intValue())))
            .andExpect(jsonPath("$.[*].updated_at").value(hasItem(sameInstant(DEFAULT_UPDATED_AT))))
            .andExpect(jsonPath("$.[*].phase_libelle").value(hasItem(DEFAULT_PHASE_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].etat_libelle").value(hasItem(DEFAULT_ETAT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].type_libelle").value(hasItem(DEFAULT_TYPE_LIBELLE.toString())));
    }
    

    @Test
    @Transactional
    public void getHistoriqueReclamation() throws Exception {
        // Initialize the database
        historiqueReclamationRepository.saveAndFlush(historiqueReclamation);

        // Get the historiqueReclamation
        restHistoriqueReclamationMockMvc.perform(get("/api/historique-reclamations/{id}", historiqueReclamation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(historiqueReclamation.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.created_at").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.created_by").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.affected_to").value(DEFAULT_AFFECTED_TO.toString()))
            .andExpect(jsonPath("$.reclamation_id").value(DEFAULT_RECLAMATION_ID.intValue()))
            .andExpect(jsonPath("$.updated_at").value(sameInstant(DEFAULT_UPDATED_AT)))
            .andExpect(jsonPath("$.phase_libelle").value(DEFAULT_PHASE_LIBELLE.toString()))
            .andExpect(jsonPath("$.etat_libelle").value(DEFAULT_ETAT_LIBELLE.toString()))
            .andExpect(jsonPath("$.type_libelle").value(DEFAULT_TYPE_LIBELLE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHistoriqueReclamation() throws Exception {
        // Get the historiqueReclamation
        restHistoriqueReclamationMockMvc.perform(get("/api/historique-reclamations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistoriqueReclamation() throws Exception {
        // Initialize the database
        historiqueReclamationRepository.saveAndFlush(historiqueReclamation);

        int databaseSizeBeforeUpdate = historiqueReclamationRepository.findAll().size();

        // Update the historiqueReclamation
        HistoriqueReclamation updatedHistoriqueReclamation = historiqueReclamationRepository.findById(historiqueReclamation.getId()).get();
        // Disconnect from session so that the updates on updatedHistoriqueReclamation are not directly saved in db
        em.detach(updatedHistoriqueReclamation);
        updatedHistoriqueReclamation
            .description(UPDATED_DESCRIPTION)
            .titre(UPDATED_TITRE)
            .created_at(UPDATED_CREATED_AT)
            .created_by(UPDATED_CREATED_BY)
            .affected_to(UPDATED_AFFECTED_TO)
            .reclamation_id(UPDATED_RECLAMATION_ID)
            .updated_at(UPDATED_UPDATED_AT)
            .phase_libelle(UPDATED_PHASE_LIBELLE)
            .etat_libelle(UPDATED_ETAT_LIBELLE)
            .type_libelle(UPDATED_TYPE_LIBELLE);

        restHistoriqueReclamationMockMvc.perform(put("/api/historique-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistoriqueReclamation)))
            .andExpect(status().isOk());

        // Validate the HistoriqueReclamation in the database
        List<HistoriqueReclamation> historiqueReclamationList = historiqueReclamationRepository.findAll();
        assertThat(historiqueReclamationList).hasSize(databaseSizeBeforeUpdate);
        HistoriqueReclamation testHistoriqueReclamation = historiqueReclamationList.get(historiqueReclamationList.size() - 1);
        assertThat(testHistoriqueReclamation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testHistoriqueReclamation.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testHistoriqueReclamation.getCreated_at()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testHistoriqueReclamation.getCreated_by()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testHistoriqueReclamation.getAffected_to()).isEqualTo(UPDATED_AFFECTED_TO);
        assertThat(testHistoriqueReclamation.getReclamation_id()).isEqualTo(UPDATED_RECLAMATION_ID);
        assertThat(testHistoriqueReclamation.getUpdated_at()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testHistoriqueReclamation.getPhase_libelle()).isEqualTo(UPDATED_PHASE_LIBELLE);
        assertThat(testHistoriqueReclamation.getEtat_libelle()).isEqualTo(UPDATED_ETAT_LIBELLE);
        assertThat(testHistoriqueReclamation.getType_libelle()).isEqualTo(UPDATED_TYPE_LIBELLE);
    }

    @Test
    @Transactional
    public void updateNonExistingHistoriqueReclamation() throws Exception {
        int databaseSizeBeforeUpdate = historiqueReclamationRepository.findAll().size();

        // Create the HistoriqueReclamation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restHistoriqueReclamationMockMvc.perform(put("/api/historique-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(historiqueReclamation)))
            .andExpect(status().isBadRequest());

        // Validate the HistoriqueReclamation in the database
        List<HistoriqueReclamation> historiqueReclamationList = historiqueReclamationRepository.findAll();
        assertThat(historiqueReclamationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistoriqueReclamation() throws Exception {
        // Initialize the database
        historiqueReclamationRepository.saveAndFlush(historiqueReclamation);

        int databaseSizeBeforeDelete = historiqueReclamationRepository.findAll().size();

        // Get the historiqueReclamation
        restHistoriqueReclamationMockMvc.perform(delete("/api/historique-reclamations/{id}", historiqueReclamation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HistoriqueReclamation> historiqueReclamationList = historiqueReclamationRepository.findAll();
        assertThat(historiqueReclamationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistoriqueReclamation.class);
        HistoriqueReclamation historiqueReclamation1 = new HistoriqueReclamation();
        historiqueReclamation1.setId(1L);
        HistoriqueReclamation historiqueReclamation2 = new HistoriqueReclamation();
        historiqueReclamation2.setId(historiqueReclamation1.getId());
        assertThat(historiqueReclamation1).isEqualTo(historiqueReclamation2);
        historiqueReclamation2.setId(2L);
        assertThat(historiqueReclamation1).isNotEqualTo(historiqueReclamation2);
        historiqueReclamation1.setId(null);
        assertThat(historiqueReclamation1).isNotEqualTo(historiqueReclamation2);
    }
}
