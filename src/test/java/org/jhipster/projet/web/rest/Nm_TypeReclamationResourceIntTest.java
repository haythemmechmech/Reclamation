package org.jhipster.projet.web.rest;

import org.jhipster.projet.ReclamationApp;

import org.jhipster.projet.domain.Nm_TypeReclamation;
import org.jhipster.projet.repository.Nm_TypeReclamationRepository;
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
 * Test class for the Nm_TypeReclamationResource REST controller.
 *
 * @see Nm_TypeReclamationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReclamationApp.class)
public class Nm_TypeReclamationResourceIntTest {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private Nm_TypeReclamationRepository nm_TypeReclamationRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNm_TypeReclamationMockMvc;

    private Nm_TypeReclamation nm_TypeReclamation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Nm_TypeReclamationResource nm_TypeReclamationResource = new Nm_TypeReclamationResource(nm_TypeReclamationRepository);
        this.restNm_TypeReclamationMockMvc = MockMvcBuilders.standaloneSetup(nm_TypeReclamationResource)
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
    public static Nm_TypeReclamation createEntity(EntityManager em) {
        Nm_TypeReclamation nm_TypeReclamation = new Nm_TypeReclamation()
            .libelle(DEFAULT_LIBELLE)
            .code(DEFAULT_CODE);
        return nm_TypeReclamation;
    }

    @Before
    public void initTest() {
        nm_TypeReclamation = createEntity(em);
    }

    @Test
    @Transactional
    public void createNm_TypeReclamation() throws Exception {
        int databaseSizeBeforeCreate = nm_TypeReclamationRepository.findAll().size();

        // Create the Nm_TypeReclamation
        restNm_TypeReclamationMockMvc.perform(post("/api/nm-type-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_TypeReclamation)))
            .andExpect(status().isCreated());

        // Validate the Nm_TypeReclamation in the database
        List<Nm_TypeReclamation> nm_TypeReclamationList = nm_TypeReclamationRepository.findAll();
        assertThat(nm_TypeReclamationList).hasSize(databaseSizeBeforeCreate + 1);
        Nm_TypeReclamation testNm_TypeReclamation = nm_TypeReclamationList.get(nm_TypeReclamationList.size() - 1);
        assertThat(testNm_TypeReclamation.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testNm_TypeReclamation.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createNm_TypeReclamationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nm_TypeReclamationRepository.findAll().size();

        // Create the Nm_TypeReclamation with an existing ID
        nm_TypeReclamation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNm_TypeReclamationMockMvc.perform(post("/api/nm-type-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_TypeReclamation)))
            .andExpect(status().isBadRequest());

        // Validate the Nm_TypeReclamation in the database
        List<Nm_TypeReclamation> nm_TypeReclamationList = nm_TypeReclamationRepository.findAll();
        assertThat(nm_TypeReclamationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNm_TypeReclamations() throws Exception {
        // Initialize the database
        nm_TypeReclamationRepository.saveAndFlush(nm_TypeReclamation);

        // Get all the nm_TypeReclamationList
        restNm_TypeReclamationMockMvc.perform(get("/api/nm-type-reclamations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nm_TypeReclamation.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    

    @Test
    @Transactional
    public void getNm_TypeReclamation() throws Exception {
        // Initialize the database
        nm_TypeReclamationRepository.saveAndFlush(nm_TypeReclamation);

        // Get the nm_TypeReclamation
        restNm_TypeReclamationMockMvc.perform(get("/api/nm-type-reclamations/{id}", nm_TypeReclamation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nm_TypeReclamation.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNm_TypeReclamation() throws Exception {
        // Get the nm_TypeReclamation
        restNm_TypeReclamationMockMvc.perform(get("/api/nm-type-reclamations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNm_TypeReclamation() throws Exception {
        // Initialize the database
        nm_TypeReclamationRepository.saveAndFlush(nm_TypeReclamation);

        int databaseSizeBeforeUpdate = nm_TypeReclamationRepository.findAll().size();

        // Update the nm_TypeReclamation
        Nm_TypeReclamation updatedNm_TypeReclamation = nm_TypeReclamationRepository.findById(nm_TypeReclamation.getId()).get();
        // Disconnect from session so that the updates on updatedNm_TypeReclamation are not directly saved in db
        em.detach(updatedNm_TypeReclamation);
        updatedNm_TypeReclamation
            .libelle(UPDATED_LIBELLE)
            .code(UPDATED_CODE);

        restNm_TypeReclamationMockMvc.perform(put("/api/nm-type-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNm_TypeReclamation)))
            .andExpect(status().isOk());

        // Validate the Nm_TypeReclamation in the database
        List<Nm_TypeReclamation> nm_TypeReclamationList = nm_TypeReclamationRepository.findAll();
        assertThat(nm_TypeReclamationList).hasSize(databaseSizeBeforeUpdate);
        Nm_TypeReclamation testNm_TypeReclamation = nm_TypeReclamationList.get(nm_TypeReclamationList.size() - 1);
        assertThat(testNm_TypeReclamation.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNm_TypeReclamation.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingNm_TypeReclamation() throws Exception {
        int databaseSizeBeforeUpdate = nm_TypeReclamationRepository.findAll().size();

        // Create the Nm_TypeReclamation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restNm_TypeReclamationMockMvc.perform(put("/api/nm-type-reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_TypeReclamation)))
            .andExpect(status().isBadRequest());

        // Validate the Nm_TypeReclamation in the database
        List<Nm_TypeReclamation> nm_TypeReclamationList = nm_TypeReclamationRepository.findAll();
        assertThat(nm_TypeReclamationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNm_TypeReclamation() throws Exception {
        // Initialize the database
        nm_TypeReclamationRepository.saveAndFlush(nm_TypeReclamation);

        int databaseSizeBeforeDelete = nm_TypeReclamationRepository.findAll().size();

        // Get the nm_TypeReclamation
        restNm_TypeReclamationMockMvc.perform(delete("/api/nm-type-reclamations/{id}", nm_TypeReclamation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nm_TypeReclamation> nm_TypeReclamationList = nm_TypeReclamationRepository.findAll();
        assertThat(nm_TypeReclamationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nm_TypeReclamation.class);
        Nm_TypeReclamation nm_TypeReclamation1 = new Nm_TypeReclamation();
        nm_TypeReclamation1.setId(1L);
        Nm_TypeReclamation nm_TypeReclamation2 = new Nm_TypeReclamation();
        nm_TypeReclamation2.setId(nm_TypeReclamation1.getId());
        assertThat(nm_TypeReclamation1).isEqualTo(nm_TypeReclamation2);
        nm_TypeReclamation2.setId(2L);
        assertThat(nm_TypeReclamation1).isNotEqualTo(nm_TypeReclamation2);
        nm_TypeReclamation1.setId(null);
        assertThat(nm_TypeReclamation1).isNotEqualTo(nm_TypeReclamation2);
    }
}
