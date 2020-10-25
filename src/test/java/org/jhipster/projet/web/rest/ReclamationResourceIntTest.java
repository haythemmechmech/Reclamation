package org.jhipster.projet.web.rest;

import org.jhipster.projet.ReclamationApp;

import org.jhipster.projet.domain.Reclamation;
import org.jhipster.projet.repository.ReclamationRepository;
import org.jhipster.projet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static org.jhipster.projet.web.rest.TestUtil.sameInstant;
import static org.jhipster.projet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReclamationResource REST controller.
 *
 * @see ReclamationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReclamationApp.class)
public class ReclamationResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_AFFECTED_TO = "AAAAAAAAAA";
    private static final String UPDATED_AFFECTED_TO = "BBBBBBBBBB";

    @Autowired
    private ReclamationRepository reclamationRepository;
    @Mock
    private ReclamationRepository reclamationRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReclamationMockMvc;

    private Reclamation reclamation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReclamationResource reclamationResource = new ReclamationResource(reclamationRepository);
        this.restReclamationMockMvc = MockMvcBuilders.standaloneSetup(reclamationResource)
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
    public static Reclamation createEntity(EntityManager em) {
        Reclamation reclamation = new Reclamation()
            .description(DEFAULT_DESCRIPTION)
            .titre(DEFAULT_TITRE)
            .created_at(DEFAULT_CREATED_AT)
            .created_by(DEFAULT_CREATED_BY)
            .updated_at(DEFAULT_UPDATED_AT)
            .affected_to(DEFAULT_AFFECTED_TO);
        return reclamation;
    }

    @Before
    public void initTest() {
        reclamation = createEntity(em);
    }

    @Test
    @Transactional
    public void createReclamation() throws Exception {
        int databaseSizeBeforeCreate = reclamationRepository.findAll().size();

        // Create the Reclamation
        restReclamationMockMvc.perform(post("/api/reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reclamation)))
            .andExpect(status().isCreated());

        // Validate the Reclamation in the database
        List<Reclamation> reclamationList = reclamationRepository.findAll();
        assertThat(reclamationList).hasSize(databaseSizeBeforeCreate + 1);
        Reclamation testReclamation = reclamationList.get(reclamationList.size() - 1);
        assertThat(testReclamation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testReclamation.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testReclamation.getCreated_at()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testReclamation.getCreated_by()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testReclamation.getUpdated_at()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testReclamation.getAffected_to()).isEqualTo(DEFAULT_AFFECTED_TO);
    }

    @Test
    @Transactional
    public void createReclamationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reclamationRepository.findAll().size();

        // Create the Reclamation with an existing ID
        reclamation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReclamationMockMvc.perform(post("/api/reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reclamation)))
            .andExpect(status().isBadRequest());

        // Validate the Reclamation in the database
        List<Reclamation> reclamationList = reclamationRepository.findAll();
        assertThat(reclamationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReclamations() throws Exception {
        // Initialize the database
        reclamationRepository.saveAndFlush(reclamation);

        // Get all the reclamationList
        restReclamationMockMvc.perform(get("/api/reclamations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reclamation.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].created_at").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].created_by").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].updated_at").value(hasItem(sameInstant(DEFAULT_UPDATED_AT))))
            .andExpect(jsonPath("$.[*].affected_to").value(hasItem(DEFAULT_AFFECTED_TO.toString())));
    }
    
    public void getAllReclamationsWithEagerRelationshipsIsEnabled() throws Exception {
        ReclamationResource reclamationResource = new ReclamationResource(reclamationRepositoryMock);
        when(reclamationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restReclamationMockMvc = MockMvcBuilders.standaloneSetup(reclamationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restReclamationMockMvc.perform(get("/api/reclamations?eagerload=true"))
        .andExpect(status().isOk());

        verify(reclamationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllReclamationsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ReclamationResource reclamationResource = new ReclamationResource(reclamationRepositoryMock);
            when(reclamationRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restReclamationMockMvc = MockMvcBuilders.standaloneSetup(reclamationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restReclamationMockMvc.perform(get("/api/reclamations?eagerload=true"))
        .andExpect(status().isOk());

            verify(reclamationRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getReclamation() throws Exception {
        // Initialize the database
        reclamationRepository.saveAndFlush(reclamation);

        // Get the reclamation
        restReclamationMockMvc.perform(get("/api/reclamations/{id}", reclamation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reclamation.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.created_at").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.created_by").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.updated_at").value(sameInstant(DEFAULT_UPDATED_AT)))
            .andExpect(jsonPath("$.affected_to").value(DEFAULT_AFFECTED_TO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingReclamation() throws Exception {
        // Get the reclamation
        restReclamationMockMvc.perform(get("/api/reclamations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReclamation() throws Exception {
        // Initialize the database
        reclamationRepository.saveAndFlush(reclamation);

        int databaseSizeBeforeUpdate = reclamationRepository.findAll().size();

        // Update the reclamation
        Reclamation updatedReclamation = reclamationRepository.findById(reclamation.getId()).get();
        // Disconnect from session so that the updates on updatedReclamation are not directly saved in db
        em.detach(updatedReclamation);
        updatedReclamation
            .description(UPDATED_DESCRIPTION)
            .titre(UPDATED_TITRE)
            .created_at(UPDATED_CREATED_AT)
            .created_by(UPDATED_CREATED_BY)
            .updated_at(UPDATED_UPDATED_AT)
            .affected_to(UPDATED_AFFECTED_TO);

        restReclamationMockMvc.perform(put("/api/reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReclamation)))
            .andExpect(status().isOk());

        // Validate the Reclamation in the database
        List<Reclamation> reclamationList = reclamationRepository.findAll();
        assertThat(reclamationList).hasSize(databaseSizeBeforeUpdate);
        Reclamation testReclamation = reclamationList.get(reclamationList.size() - 1);
        assertThat(testReclamation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testReclamation.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testReclamation.getCreated_at()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testReclamation.getCreated_by()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testReclamation.getUpdated_at()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testReclamation.getAffected_to()).isEqualTo(UPDATED_AFFECTED_TO);
    }

    @Test
    @Transactional
    public void updateNonExistingReclamation() throws Exception {
        int databaseSizeBeforeUpdate = reclamationRepository.findAll().size();

        // Create the Reclamation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restReclamationMockMvc.perform(put("/api/reclamations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reclamation)))
            .andExpect(status().isBadRequest());

        // Validate the Reclamation in the database
        List<Reclamation> reclamationList = reclamationRepository.findAll();
        assertThat(reclamationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReclamation() throws Exception {
        // Initialize the database
        reclamationRepository.saveAndFlush(reclamation);

        int databaseSizeBeforeDelete = reclamationRepository.findAll().size();

        // Get the reclamation
        restReclamationMockMvc.perform(delete("/api/reclamations/{id}", reclamation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Reclamation> reclamationList = reclamationRepository.findAll();
        assertThat(reclamationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reclamation.class);
        Reclamation reclamation1 = new Reclamation();
        reclamation1.setId(1L);
        Reclamation reclamation2 = new Reclamation();
        reclamation2.setId(reclamation1.getId());
        assertThat(reclamation1).isEqualTo(reclamation2);
        reclamation2.setId(2L);
        assertThat(reclamation1).isNotEqualTo(reclamation2);
        reclamation1.setId(null);
        assertThat(reclamation1).isNotEqualTo(reclamation2);
    }
}
