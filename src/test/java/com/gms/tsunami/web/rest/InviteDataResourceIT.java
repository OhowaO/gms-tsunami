package com.gms.tsunami.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gms.tsunami.GmsApp;
import com.gms.tsunami.config.TestSecurityConfiguration;
import com.gms.tsunami.domain.InviteData;
import com.gms.tsunami.domain.enumeration.ResidentialPropertyType;
import com.gms.tsunami.repository.InviteDataRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link InviteDataResource} REST controller.
 */
@SpringBootTest(classes = { GmsApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class InviteDataResourceIT {
    private static final Instant DEFAULT_START = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_STOP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STOP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ResidentialPropertyType DEFAULT_PROPERTY_TYPE = ResidentialPropertyType.HOUSE;
    private static final ResidentialPropertyType UPDATED_PROPERTY_TYPE = ResidentialPropertyType.APARTMENTS;

    private static final String DEFAULT_HOUSE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_HOUSE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_BLOCK = "AAAAAAAAAA";
    private static final String UPDATED_BLOCK = "BBBBBBBBBB";

    private static final String DEFAULT_APARTMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_APARTMENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STREET_NAME = "BBBBBBBBBB";

    @Autowired
    private InviteDataRepository inviteDataRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInviteDataMockMvc;

    private InviteData inviteData;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InviteData createEntity(EntityManager em) {
        InviteData inviteData = new InviteData()
            .start(DEFAULT_START)
            .stop(DEFAULT_STOP)
            .propertyType(DEFAULT_PROPERTY_TYPE)
            .houseNumber(DEFAULT_HOUSE_NUMBER)
            .block(DEFAULT_BLOCK)
            .apartmentName(DEFAULT_APARTMENT_NAME)
            .streetName(DEFAULT_STREET_NAME);
        return inviteData;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InviteData createUpdatedEntity(EntityManager em) {
        InviteData inviteData = new InviteData()
            .start(UPDATED_START)
            .stop(UPDATED_STOP)
            .propertyType(UPDATED_PROPERTY_TYPE)
            .houseNumber(UPDATED_HOUSE_NUMBER)
            .block(UPDATED_BLOCK)
            .apartmentName(UPDATED_APARTMENT_NAME)
            .streetName(UPDATED_STREET_NAME);
        return inviteData;
    }

    @BeforeEach
    public void initTest() {
        inviteData = createEntity(em);
    }

    @Test
    @Transactional
    public void createInviteData() throws Exception {
        int databaseSizeBeforeCreate = inviteDataRepository.findAll().size();
        // Create the InviteData
        restInviteDataMockMvc
            .perform(
                post("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inviteData))
            )
            .andExpect(status().isCreated());

        // Validate the InviteData in the database
        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeCreate + 1);
        InviteData testInviteData = inviteDataList.get(inviteDataList.size() - 1);
        assertThat(testInviteData.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testInviteData.getStop()).isEqualTo(DEFAULT_STOP);
        assertThat(testInviteData.getPropertyType()).isEqualTo(DEFAULT_PROPERTY_TYPE);
        assertThat(testInviteData.getHouseNumber()).isEqualTo(DEFAULT_HOUSE_NUMBER);
        assertThat(testInviteData.getBlock()).isEqualTo(DEFAULT_BLOCK);
        assertThat(testInviteData.getApartmentName()).isEqualTo(DEFAULT_APARTMENT_NAME);
        assertThat(testInviteData.getStreetName()).isEqualTo(DEFAULT_STREET_NAME);
    }

    @Test
    @Transactional
    public void createInviteDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inviteDataRepository.findAll().size();

        // Create the InviteData with an existing ID
        inviteData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInviteDataMockMvc
            .perform(
                post("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inviteData))
            )
            .andExpect(status().isBadRequest());

        // Validate the InviteData in the database
        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPropertyTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteDataRepository.findAll().size();
        // set the field null
        inviteData.setPropertyType(null);

        // Create the InviteData, which fails.

        restInviteDataMockMvc
            .perform(
                post("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inviteData))
            )
            .andExpect(status().isBadRequest());

        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHouseNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteDataRepository.findAll().size();
        // set the field null
        inviteData.setHouseNumber(null);

        // Create the InviteData, which fails.

        restInviteDataMockMvc
            .perform(
                post("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inviteData))
            )
            .andExpect(status().isBadRequest());

        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStreetNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteDataRepository.findAll().size();
        // set the field null
        inviteData.setStreetName(null);

        // Create the InviteData, which fails.

        restInviteDataMockMvc
            .perform(
                post("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inviteData))
            )
            .andExpect(status().isBadRequest());

        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInviteData() throws Exception {
        // Initialize the database
        inviteDataRepository.saveAndFlush(inviteData);

        // Get all the inviteDataList
        restInviteDataMockMvc
            .perform(get("/api/invite-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inviteData.getId().intValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].stop").value(hasItem(DEFAULT_STOP.toString())))
            .andExpect(jsonPath("$.[*].propertyType").value(hasItem(DEFAULT_PROPERTY_TYPE.toString())))
            .andExpect(jsonPath("$.[*].houseNumber").value(hasItem(DEFAULT_HOUSE_NUMBER)))
            .andExpect(jsonPath("$.[*].block").value(hasItem(DEFAULT_BLOCK)))
            .andExpect(jsonPath("$.[*].apartmentName").value(hasItem(DEFAULT_APARTMENT_NAME)))
            .andExpect(jsonPath("$.[*].streetName").value(hasItem(DEFAULT_STREET_NAME)));
    }

    @Test
    @Transactional
    public void getInviteData() throws Exception {
        // Initialize the database
        inviteDataRepository.saveAndFlush(inviteData);

        // Get the inviteData
        restInviteDataMockMvc
            .perform(get("/api/invite-data/{id}", inviteData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inviteData.getId().intValue()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.stop").value(DEFAULT_STOP.toString()))
            .andExpect(jsonPath("$.propertyType").value(DEFAULT_PROPERTY_TYPE.toString()))
            .andExpect(jsonPath("$.houseNumber").value(DEFAULT_HOUSE_NUMBER))
            .andExpect(jsonPath("$.block").value(DEFAULT_BLOCK))
            .andExpect(jsonPath("$.apartmentName").value(DEFAULT_APARTMENT_NAME))
            .andExpect(jsonPath("$.streetName").value(DEFAULT_STREET_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingInviteData() throws Exception {
        // Get the inviteData
        restInviteDataMockMvc.perform(get("/api/invite-data/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInviteData() throws Exception {
        // Initialize the database
        inviteDataRepository.saveAndFlush(inviteData);

        int databaseSizeBeforeUpdate = inviteDataRepository.findAll().size();

        // Update the inviteData
        InviteData updatedInviteData = inviteDataRepository.findById(inviteData.getId()).get();
        // Disconnect from session so that the updates on updatedInviteData are not directly saved in db
        em.detach(updatedInviteData);
        updatedInviteData
            .start(UPDATED_START)
            .stop(UPDATED_STOP)
            .propertyType(UPDATED_PROPERTY_TYPE)
            .houseNumber(UPDATED_HOUSE_NUMBER)
            .block(UPDATED_BLOCK)
            .apartmentName(UPDATED_APARTMENT_NAME)
            .streetName(UPDATED_STREET_NAME);

        restInviteDataMockMvc
            .perform(
                put("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInviteData))
            )
            .andExpect(status().isOk());

        // Validate the InviteData in the database
        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeUpdate);
        InviteData testInviteData = inviteDataList.get(inviteDataList.size() - 1);
        assertThat(testInviteData.getStart()).isEqualTo(UPDATED_START);
        assertThat(testInviteData.getStop()).isEqualTo(UPDATED_STOP);
        assertThat(testInviteData.getPropertyType()).isEqualTo(UPDATED_PROPERTY_TYPE);
        assertThat(testInviteData.getHouseNumber()).isEqualTo(UPDATED_HOUSE_NUMBER);
        assertThat(testInviteData.getBlock()).isEqualTo(UPDATED_BLOCK);
        assertThat(testInviteData.getApartmentName()).isEqualTo(UPDATED_APARTMENT_NAME);
        assertThat(testInviteData.getStreetName()).isEqualTo(UPDATED_STREET_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingInviteData() throws Exception {
        int databaseSizeBeforeUpdate = inviteDataRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInviteDataMockMvc
            .perform(
                put("/api/invite-data")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(inviteData))
            )
            .andExpect(status().isBadRequest());

        // Validate the InviteData in the database
        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInviteData() throws Exception {
        // Initialize the database
        inviteDataRepository.saveAndFlush(inviteData);

        int databaseSizeBeforeDelete = inviteDataRepository.findAll().size();

        // Delete the inviteData
        restInviteDataMockMvc
            .perform(delete("/api/invite-data/{id}", inviteData.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InviteData> inviteDataList = inviteDataRepository.findAll();
        assertThat(inviteDataList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
