package org.jhipster.projet.web.rest;

import org.jhipster.projet.ReclamationApp;

import org.jhipster.projet.domain.Nm_Etat;
import org.jhipster.projet.repository.Nm_EtatRepository;
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
 * Test class for the Nm_EtatResource REST controller.
 *
 * @see Nm_EtatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReclamationApp.class)
public class Nm_EtatResourceIntTest {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private Nm_EtatRepository nm_EtatRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNm_EtatMockMvc;

    private Nm_Etat nm_Etat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Nm_EtatResource nm_EtatResource = new Nm_EtatResource(nm_EtatRepository);
        this.restNm_EtatMockMvc = MockMvcBuilders.standaloneSetup(nm_EtatResource)
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
    public static Nm_Etat createEntity(EntityManager em) {
        Nm_Etat nm_Etat = new Nm_Etat()
            .libelle(DEFAULT_LIBELLE)
            .code(DEFAULT_CODE);
        return nm_Etat;
    }

    @Before
    public void initTest() {
        nm_Etat = createEntity(em);
    }

    @Test
    @Transactional
    public void createNm_Etat() throws Exception {
        int databaseSizeBeforeCreate = nm_EtatRepository.findAll().size();

        // Create the Nm_Etat
        restNm_EtatMockMvc.perform(post("/api/nm-etats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_Etat)))
            .andExpect(status().isCreated());

        // Validate the Nm_Etat in the database
        List<Nm_Etat> nm_EtatList = nm_EtatRepository.findAll();
        assertThat(nm_EtatList).hasSize(databaseSizeBeforeCreate + 1);
        Nm_Etat testNm_Etat = nm_EtatList.get(nm_EtatList.size() - 1);
        assertThat(testNm_Etat.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testNm_Etat.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createNm_EtatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nm_EtatRepository.findAll().size();

        // Create the Nm_Etat with an existing ID
        nm_Etat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNm_EtatMockMvc.perform(post("/api/nm-etats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_Etat)))
            .andExpect(status().isBadRequest());

        // Validate the Nm_Etat in the database
        List<Nm_Etat> nm_EtatList = nm_EtatRepository.findAll();
        assertThat(nm_EtatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNm_Etats() throws Exception {
        // Initialize the database
        nm_EtatRepository.saveAndFlush(nm_Etat);

        // Get all the nm_EtatList
        restNm_EtatMockMvc.perform(get("/api/nm-etats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nm_Etat.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }
    

    @Test
    @Transactional
    public void getNm_Etat() throws Exception {
        // Initialize the database
        nm_EtatRepository.saveAndFlush(nm_Etat);

        // Get the nm_Etat
        restNm_EtatMockMvc.perform(get("/api/nm-etats/{id}", nm_Etat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nm_Etat.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNm_Etat() throws Exception {
        // Get the nm_Etat
        restNm_EtatMockMvc.perform(get("/api/nm-etats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNm_Etat() throws Exception {
        // Initialize the database
        nm_EtatRepository.saveAndFlush(nm_Etat);

        int databaseSizeBeforeUpdate = nm_EtatRepository.findAll().size();

        // Update the nm_Etat
        Nm_Etat updatedNm_Etat = nm_EtatRepository.findById(nm_Etat.getId()).get();
        // Disconnect from session so that the updates on updatedNm_Etat are not directly saved in db
        em.detach(updatedNm_Etat);
        updatedNm_Etat
            .libelle(UPDATED_LIBELLE)
            .code(UPDATED_CODE);

        restNm_EtatMockMvc.perform(put("/api/nm-etats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNm_Etat)))
            .andExpect(status().isOk());

        // Validate the Nm_Etat in the database
        List<Nm_Etat> nm_EtatList = nm_EtatRepository.findAll();
        assertThat(nm_EtatList).hasSize(databaseSizeBeforeUpdate);
        Nm_Etat testNm_Etat = nm_EtatList.get(nm_EtatList.size() - 1);
        assertThat(testNm_Etat.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testNm_Etat.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingNm_Etat() throws Exception {
        int databaseSizeBeforeUpdate = nm_EtatRepository.findAll().size();

        // Create the Nm_Etat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restNm_EtatMockMvc.perform(put("/api/nm-etats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nm_Etat)))
            .andExpect(status().isBadRequest());

        // Validate the Nm_Etat in the database
        List<Nm_Etat> nm_EtatList = nm_EtatRepository.findAll();
        assertThat(nm_EtatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNm_Etat() throws Exception {
        // Initialize the database
        nm_EtatRepository.saveAndFlush(nm_Etat);

        int databaseSizeBeforeDelete = nm_EtatRepository.findAll().size();

        // Get the nm_Etat
        restNm_EtatMockMvc.perform(delete("/api/nm-etats/{id}", nm_Etat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nm_Etat> nm_EtatList = nm_EtatRepository.findAll();
        assertThat(nm_EtatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nm_Etat.class);
        Nm_Etat nm_Etat1 = new Nm_Etat();
        nm_Etat1.setId(1L);
        Nm_Etat nm_Etat2 = new Nm_Etat();
        nm_Etat2.setId(nm_Etat1.getId());
        assertThat(nm_Etat1).isEqualTo(nm_Etat2);
        nm_Etat2.setId(2L);
        assertThat(nm_Etat1).isNotEqualTo(nm_Etat2);
        nm_Etat1.setId(null);
        assertThat(nm_Etat1).isNotEqualTo(nm_Etat2);
    }
}
