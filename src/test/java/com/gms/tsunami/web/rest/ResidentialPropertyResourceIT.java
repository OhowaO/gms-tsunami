package com.gms.tsunami.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gms.tsunami.GmsApp;
import com.gms.tsunami.config.TestSecurityConfiguration;
import com.gms.tsunami.domain.ResidentialProperty;
import com.gms.tsunami.domain.enumeration.Countries;
import com.gms.tsunami.domain.enumeration.ResidentialPropertyType;
import com.gms.tsunami.repository.ResidentialPropertyRepository;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ResidentialPropertyResource} REST controller.
 */
@SpringBootTest(classes = { GmsApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ResidentialPropertyResourceIT {
    private static final Long DEFAULT_RESIDENTIAL_PROPERTY_ID = 1L;
    private static final Long UPDATED_RESIDENTIAL_PROPERTY_ID = 2L;

    private static final ResidentialPropertyType DEFAULT_TYPE = ResidentialPropertyType.HOUSE;
    private static final ResidentialPropertyType UPDATED_TYPE = ResidentialPropertyType.APARTMENTS;

    private static final Long DEFAULT_OWNER_ID = 1L;
    private static final Long UPDATED_OWNER_ID = 2L;

    private static final String DEFAULT_HOUSE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_HOUSE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BLOCK = "AAAAAAAAAA";
    private static final String UPDATED_BLOCK = "BBBBBBBBBB";

    private static final String DEFAULT_APARTMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_APARTMENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final Countries DEFAULT_COUNTRY = Countries.KENYA;
    private static final Countries UPDATED_COUNTRY = Countries.OTHER;

    @Autowired
    private ResidentialPropertyRepository residentialPropertyRepository;

    @Mock
    private ResidentialPropertyRepository residentialPropertyRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restResidentialPropertyMockMvc;

    private ResidentialProperty residentialProperty;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResidentialProperty createEntity(EntityManager em) {
        ResidentialProperty residentialProperty = new ResidentialProperty()
            .residentialPropertyID(DEFAULT_RESIDENTIAL_PROPERTY_ID)
            .type(DEFAULT_TYPE)
            .ownerID(DEFAULT_OWNER_ID)
            .houseNumber(DEFAULT_HOUSE_NUMBER)
            .block(DEFAULT_BLOCK)
            .apartmentName(DEFAULT_APARTMENT_NAME)
            .streetName(DEFAULT_STREET_NAME)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY);
        return residentialProperty;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ResidentialProperty createUpdatedEntity(EntityManager em) {
        ResidentialProperty residentialProperty = new ResidentialProperty()
            .residentialPropertyID(UPDATED_RESIDENTIAL_PROPERTY_ID)
            .type(UPDATED_TYPE)
            .ownerID(UPDATED_OWNER_ID)
            .houseNumber(UPDATED_HOUSE_NUMBER)
            .block(UPDATED_BLOCK)
            .apartmentName(UPDATED_APARTMENT_NAME)
            .streetName(UPDATED_STREET_NAME)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);
        return residentialProperty;
    }

    @BeforeEach
    public void initTest() {
        residentialProperty = createEntity(em);
    }

    @Test
    @Transactional
    public void createResidentialProperty() throws Exception {
        int databaseSizeBeforeCreate = residentialPropertyRepository.findAll().size();
        // Create the ResidentialProperty
        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isCreated());

        // Validate the ResidentialProperty in the database
        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeCreate + 1);
        ResidentialProperty testResidentialProperty = residentialPropertyList.get(residentialPropertyList.size() - 1);
        assertThat(testResidentialProperty.getResidentialPropertyID()).isEqualTo(DEFAULT_RESIDENTIAL_PROPERTY_ID);
        assertThat(testResidentialProperty.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testResidentialProperty.getOwnerID()).isEqualTo(DEFAULT_OWNER_ID);
        assertThat(testResidentialProperty.getHouseNumber()).isEqualTo(DEFAULT_HOUSE_NUMBER);
        assertThat(testResidentialProperty.getBlock()).isEqualTo(DEFAULT_BLOCK);
        assertThat(testResidentialProperty.getApartmentName()).isEqualTo(DEFAULT_APARTMENT_NAME);
        assertThat(testResidentialProperty.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
        assertThat(testResidentialProperty.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testResidentialProperty.getCountry()).isEqualTo(DEFAULT_COUNTRY);
    }

    @Test
    @Transactional
    public void createResidentialPropertyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = residentialPropertyRepository.findAll().size();

        // Create the ResidentialProperty with an existing ID
        residentialProperty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        // Validate the ResidentialProperty in the database
        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkResidentialPropertyIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setResidentialPropertyID(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setType(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOwnerIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setOwnerID(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHouseNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setHouseNumber(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStreetNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setStreetName(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setCity(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = residentialPropertyRepository.findAll().size();
        // set the field null
        residentialProperty.setCountry(null);

        // Create the ResidentialProperty, which fails.

        restResidentialPropertyMockMvc
            .perform(
                post("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllResidentialProperties() throws Exception {
        // Initialize the database
        residentialPropertyRepository.saveAndFlush(residentialProperty);

        // Get all the residentialPropertyList
        restResidentialPropertyMockMvc
            .perform(get("/api/residential-properties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(residentialProperty.getId().intValue())))
            .andExpect(jsonPath("$.[*].residentialPropertyID").value(hasItem(DEFAULT_RESIDENTIAL_PROPERTY_ID.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].ownerID").value(hasItem(DEFAULT_OWNER_ID.intValue())))
            .andExpect(jsonPath("$.[*].houseNumber").value(hasItem(DEFAULT_HOUSE_NUMBER)))
            .andExpect(jsonPath("$.[*].block").value(hasItem(DEFAULT_BLOCK)))
            .andExpect(jsonPath("$.[*].apartmentName").value(hasItem(DEFAULT_APARTMENT_NAME)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    public void getAllResidentialPropertiesWithEagerRelationshipsIsEnabled() throws Exception {
        when(residentialPropertyRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restResidentialPropertyMockMvc.perform(get("/api/residential-properties?eagerload=true")).andExpect(status().isOk());

        verify(residentialPropertyRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    public void getAllResidentialPropertiesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(residentialPropertyRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restResidentialPropertyMockMvc.perform(get("/api/residential-properties?eagerload=true")).andExpect(status().isOk());

        verify(residentialPropertyRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getResidentialProperty() throws Exception {
        // Initialize the database
        residentialPropertyRepository.saveAndFlush(residentialProperty);

        // Get the residentialProperty
        restResidentialPropertyMockMvc
            .perform(get("/api/residential-properties/{id}", residentialProperty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(residentialProperty.getId().intValue()))
            .andExpect(jsonPath("$.residentialPropertyID").value(DEFAULT_RESIDENTIAL_PROPERTY_ID.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.ownerID").value(DEFAULT_OWNER_ID.intValue()))
            .andExpect(jsonPath("$.houseNumber").value(DEFAULT_HOUSE_NUMBER))
            .andExpect(jsonPath("$.block").value(DEFAULT_BLOCK))
            .andExpect(jsonPath("$.apartmentName").value(DEFAULT_APARTMENT_NAME))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResidentialProperty() throws Exception {
        // Get the residentialProperty
        restResidentialPropertyMockMvc.perform(get("/api/residential-properties/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResidentialProperty() throws Exception {
        // Initialize the database
        residentialPropertyRepository.saveAndFlush(residentialProperty);

        int databaseSizeBeforeUpdate = residentialPropertyRepository.findAll().size();

        // Update the residentialProperty
        ResidentialProperty updatedResidentialProperty = residentialPropertyRepository.findById(residentialProperty.getId()).get();
        // Disconnect from session so that the updates on updatedResidentialProperty are not directly saved in db
        em.detach(updatedResidentialProperty);
        updatedResidentialProperty
            .residentialPropertyID(UPDATED_RESIDENTIAL_PROPERTY_ID)
            .type(UPDATED_TYPE)
            .ownerID(UPDATED_OWNER_ID)
            .houseNumber(UPDATED_HOUSE_NUMBER)
            .block(UPDATED_BLOCK)
            .apartmentName(UPDATED_APARTMENT_NAME)
            .streetName(UPDATED_STREET_NAME)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY);

        restResidentialPropertyMockMvc
            .perform(
                put("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedResidentialProperty))
            )
            .andExpect(status().isOk());

        // Validate the ResidentialProperty in the database
        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeUpdate);
        ResidentialProperty testResidentialProperty = residentialPropertyList.get(residentialPropertyList.size() - 1);
        assertThat(testResidentialProperty.getResidentialPropertyID()).isEqualTo(UPDATED_RESIDENTIAL_PROPERTY_ID);
        assertThat(testResidentialProperty.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testResidentialProperty.getOwnerID()).isEqualTo(UPDATED_OWNER_ID);
        assertThat(testResidentialProperty.getHouseNumber()).isEqualTo(UPDATED_HOUSE_NUMBER);
        assertThat(testResidentialProperty.getBlock()).isEqualTo(UPDATED_BLOCK);
        assertThat(testResidentialProperty.getApartmentName()).isEqualTo(UPDATED_APARTMENT_NAME);
        assertThat(testResidentialProperty.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
        assertThat(testResidentialProperty.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testResidentialProperty.getCountry()).isEqualTo(UPDATED_COUNTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingResidentialProperty() throws Exception {
        int databaseSizeBeforeUpdate = residentialPropertyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restResidentialPropertyMockMvc
            .perform(
                put("/api/residential-properties")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(residentialProperty))
            )
            .andExpect(status().isBadRequest());

        // Validate the ResidentialProperty in the database
        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteResidentialProperty() throws Exception {
        // Initialize the database
        residentialPropertyRepository.saveAndFlush(residentialProperty);

        int databaseSizeBeforeDelete = residentialPropertyRepository.findAll().size();

        // Delete the residentialProperty
        restResidentialPropertyMockMvc
            .perform(
                delete("/api/residential-properties/{id}", residentialProperty.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ResidentialProperty> residentialPropertyList = residentialPropertyRepository.findAll();
        assertThat(residentialPropertyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
