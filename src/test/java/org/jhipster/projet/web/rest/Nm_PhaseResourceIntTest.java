package org.jhipster.projet.web.rest;

import org.jhipster.projet.ReclamationApp;

import org.jhipster.projet.domain.Nm_Phase;
import org.jhipster.projet.repository.Nm_PhaseRepository;
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
import java.util.List;


import static org.jhipster.projet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Nm_PhaseResource REST controller.
 *
 * @see Nm_PhaseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReclamationApp.class)
public class Nm_PhaseResourceIntTest {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private Nm_PhaseRepository nm_PhaseRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNm_PhaseMockMvc;

    private Nm_Phase nm_Phase;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Nm_PhaseResource nm_PhaseResource = new Nm_PhaseResource(nm_PhaseRepository);
        this.restNm_PhaseMockMvc = MockMvcBuilders.standaloneSetup(nm_PhaseResource)
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
    public static Nm_Phase createEntity(EntityManager em) {
        Nm_Phase nm_Phase = new Nm_Phase()
            .libelle(DEFAULT_LIBELLE)
            .code(DEFAULT_CODE);
        return nm_Phase;
    }

    @Before
    public void initTest() {
        nm_Phase = createEntity(em);
    }

    @Test
    @Transactional
    public void createNm_Phase() throws Exception {
        int databaseSizeBeforeCreate = nm_PhaseRepository.findAll().size();

        // Create the Nm_Phase
        restNm_PhaseMockMvc.perform(post("/api/nm-phases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_Phase)))
            .andExpect(status().isCreated());

        // Validate the Nm_Phase in the database
        List<Nm_Phase> nm_PhaseList = nm_PhaseRepository.findAll();
        assertThat(nm_PhaseList).hasSize(databaseSizeBeforeCreate + 1);
        Nm_Phase testNm_Phase = nm_PhaseList.get(nm_PhaseList.size() - 1);
        assertThat(testNm_Phase.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testNm_Phase.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createNm_PhaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nm_PhaseRepository.findAll().size();

        // Create the Nm_Phase with an existing ID
        nm_Phase.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNm_PhaseMockMvc.perform(post("/api/nm-phases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_Phase)))
            .andExpect(status().isBadRequest());

        // Validate the Nm_Phase in the database
        List<Nm_Phase> nm_PhaseList = nm_PhaseRepository.findAll();
        assertThat(nm_PhaseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNm_Phases() throws Exception {
        // Initialize the database
        nm_PhaseRepository.saveAndFlush(nm_Phase);

        // Get all the nm_PhaseList
        restNm_PhaseMockMvc.perform(get("/api/nm-phases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nm_Phase.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    

    @Test
    @Transactional
    public void getNm_Phase() throws Exception {
        // Initialize the database
        nm_PhaseRepository.saveAndFlush(nm_Phase);

        // Get the nm_Phase
        restNm_PhaseMockMvc.perform(get("/api/nm-phases/{id}", nm_Phase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nm_Phase.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNm_Phase() throws Exception {
        // Get the nm_Phase
        restNm_PhaseMockMvc.perform(get("/api/nm-phases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNm_Phase() throws Exception {
        // Initialize the database
        nm_PhaseRepository.saveAndFlush(nm_Phase);

        int databaseSizeBeforeUpdate = nm_PhaseRepository.findAll().size();

        // Update the nm_Phase
        Nm_Phase updatedNm_Phase = nm_PhaseRepository.findById(nm_Phase.getId()).get();
        // Disconnect from session so that the updates on updatedNm_Phase are not directly saved in db
        em.detach(updatedNm_Phase);
        updatedNm_Phase
            .libelle(UPDATED_LIBELLE)
            .code(UPDATED_CODE);

        restNm_PhaseMockMvc.perform(put("/api/nm-phases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNm_Phase)))
            .andExpect(status().isOk());

        // Validate the Nm_Phase in the database
        List<Nm_Phase> nm_PhaseList = nm_PhaseRepository.findAll();
        assertThat(nm_PhaseList).hasSize(databaseSizeBeforeUpdate);
        Nm_Phase testNm_Phase = nm_PhaseList.get(nm_PhaseList.size() - 1);
        assertThat(testNm_Phase.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNm_Phase.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingNm_Phase() throws Exception {
        int databaseSizeBeforeUpdate = nm_PhaseRepository.findAll().size();

        // Create the Nm_Phase

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restNm_PhaseMockMvc.perform(put("/api/nm-phases")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_Phase)))
            .andExpect(status().isBadRequest());

        // Validate the Nm_Phase in the database
        List<Nm_Phase> nm_PhaseList = nm_PhaseRepository.findAll();
        assertThat(nm_PhaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNm_Phase() throws Exception {
        // Initialize the database
        nm_PhaseRepository.saveAndFlush(nm_Phase);

        int databaseSizeBeforeDelete = nm_PhaseRepository.findAll().size();

        // Get the nm_Phase
        restNm_PhaseMockMvc.perform(delete("/api/nm-phases/{id}", nm_Phase.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nm_Phase> nm_PhaseList = nm_PhaseRepository.findAll();
        assertThat(nm_PhaseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nm_Phase.class);
        Nm_Phase nm_Phase1 = new Nm_Phase();
        nm_Phase1.setId(1L);
        Nm_Phase nm_Phase2 = new Nm_Phase();
        nm_Phase2.setId(nm_Phase1.getId());
        assertThat(nm_Phase1).isEqualTo(nm_Phase2);
        nm_Phase2.setId(2L);
        assertThat(nm_Phase1).isNotEqualTo(nm_Phase2);
        nm_Phase1.setId(null);
        assertThat(nm_Phase1).isNotEqualTo(nm_Phase2);
    }
}
