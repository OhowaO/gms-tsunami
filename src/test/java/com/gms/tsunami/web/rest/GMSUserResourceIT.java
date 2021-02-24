package com.gms.tsunami.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gms.tsunami.GmsApp;
import com.gms.tsunami.config.TestSecurityConfiguration;
import com.gms.tsunami.domain.GMSUser;
import com.gms.tsunami.domain.enumeration.Gender;
import com.gms.tsunami.repository.GMSUserRepository;
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
 * Integration tests for the {@link GMSUserResource} REST controller.
 */
@SpringBootTest(classes = { GmsApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class GMSUserResourceIT {
    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final String DEFAULT_FIRST_NAMES = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAMES = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_EMAIL_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_ADRESS = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_OF_BIRTH = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_OF_BIRTH = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private GMSUserRepository gMSUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGMSUserMockMvc;

    private GMSUser gMSUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GMSUser createEntity(EntityManager em) {
        GMSUser gMSUser = new GMSUser()
            .userID(DEFAULT_USER_ID)
            .firstNames(DEFAULT_FIRST_NAMES)
            .lastName(DEFAULT_LAST_NAME)
            .gender(DEFAULT_GENDER)
            .emailAdress(DEFAULT_EMAIL_ADRESS)
            .telephoneNumber(DEFAULT_TELEPHONE_NUMBER)
            .dateOfBirth(DEFAULT_DATE_OF_BIRTH);
        return gMSUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GMSUser createUpdatedEntity(EntityManager em) {
        GMSUser gMSUser = new GMSUser()
            .userID(UPDATED_USER_ID)
            .firstNames(UPDATED_FIRST_NAMES)
            .lastName(UPDATED_LAST_NAME)
            .gender(UPDATED_GENDER)
            .emailAdress(UPDATED_EMAIL_ADRESS)
            .telephoneNumber(UPDATED_TELEPHONE_NUMBER)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH);
        return gMSUser;
    }

    @BeforeEach
    public void initTest() {
        gMSUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createGMSUser() throws Exception {
        int databaseSizeBeforeCreate = gMSUserRepository.findAll().size();
        // Create the GMSUser
        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isCreated());

        // Validate the GMSUser in the database
        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeCreate + 1);
        GMSUser testGMSUser = gMSUserList.get(gMSUserList.size() - 1);
        assertThat(testGMSUser.getUserID()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testGMSUser.getFirstNames()).isEqualTo(DEFAULT_FIRST_NAMES);
        assertThat(testGMSUser.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testGMSUser.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testGMSUser.getEmailAdress()).isEqualTo(DEFAULT_EMAIL_ADRESS);
        assertThat(testGMSUser.getTelephoneNumber()).isEqualTo(DEFAULT_TELEPHONE_NUMBER);
        assertThat(testGMSUser.getDateOfBirth()).isEqualTo(DEFAULT_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void createGMSUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gMSUserRepository.findAll().size();

        // Create the GMSUser with an existing ID
        gMSUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the GMSUser in the database
        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUserIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setUserID(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFirstNamesIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setFirstNames(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setLastName(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setGender(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailAdressIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setEmailAdress(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTelephoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setTelephoneNumber(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateOfBirthIsRequired() throws Exception {
        int databaseSizeBeforeTest = gMSUserRepository.findAll().size();
        // set the field null
        gMSUser.setDateOfBirth(null);

        // Create the GMSUser, which fails.

        restGMSUserMockMvc
            .perform(
                post("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGMSUsers() throws Exception {
        // Initialize the database
        gMSUserRepository.saveAndFlush(gMSUser);

        // Get all the gMSUserList
        restGMSUserMockMvc
            .perform(get("/api/gms-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gMSUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userID").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].firstNames").value(hasItem(DEFAULT_FIRST_NAMES)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].emailAdress").value(hasItem(DEFAULT_EMAIL_ADRESS)))
            .andExpect(jsonPath("$.[*].telephoneNumber").value(hasItem(DEFAULT_TELEPHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].dateOfBirth").value(hasItem(DEFAULT_DATE_OF_BIRTH.toString())));
    }

    @Test
    @Transactional
    public void getGMSUser() throws Exception {
        // Initialize the database
        gMSUserRepository.saveAndFlush(gMSUser);

        // Get the gMSUser
        restGMSUserMockMvc
            .perform(get("/api/gms-users/{id}", gMSUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gMSUser.getId().intValue()))
            .andExpect(jsonPath("$.userID").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.firstNames").value(DEFAULT_FIRST_NAMES))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.emailAdress").value(DEFAULT_EMAIL_ADRESS))
            .andExpect(jsonPath("$.telephoneNumber").value(DEFAULT_TELEPHONE_NUMBER))
            .andExpect(jsonPath("$.dateOfBirth").value(DEFAULT_DATE_OF_BIRTH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGMSUser() throws Exception {
        // Get the gMSUser
        restGMSUserMockMvc.perform(get("/api/gms-users/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGMSUser() throws Exception {
        // Initialize the database
        gMSUserRepository.saveAndFlush(gMSUser);

        int databaseSizeBeforeUpdate = gMSUserRepository.findAll().size();

        // Update the gMSUser
        GMSUser updatedGMSUser = gMSUserRepository.findById(gMSUser.getId()).get();
        // Disconnect from session so that the updates on updatedGMSUser are not directly saved in db
        em.detach(updatedGMSUser);
        updatedGMSUser
            .userID(UPDATED_USER_ID)
            .firstNames(UPDATED_FIRST_NAMES)
            .lastName(UPDATED_LAST_NAME)
            .gender(UPDATED_GENDER)
            .emailAdress(UPDATED_EMAIL_ADRESS)
            .telephoneNumber(UPDATED_TELEPHONE_NUMBER)
            .dateOfBirth(UPDATED_DATE_OF_BIRTH);

        restGMSUserMockMvc
            .perform(
                put("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedGMSUser))
            )
            .andExpect(status().isOk());

        // Validate the GMSUser in the database
        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeUpdate);
        GMSUser testGMSUser = gMSUserList.get(gMSUserList.size() - 1);
        assertThat(testGMSUser.getUserID()).isEqualTo(UPDATED_USER_ID);
        assertThat(testGMSUser.getFirstNames()).isEqualTo(UPDATED_FIRST_NAMES);
        assertThat(testGMSUser.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testGMSUser.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testGMSUser.getEmailAdress()).isEqualTo(UPDATED_EMAIL_ADRESS);
        assertThat(testGMSUser.getTelephoneNumber()).isEqualTo(UPDATED_TELEPHONE_NUMBER);
        assertThat(testGMSUser.getDateOfBirth()).isEqualTo(UPDATED_DATE_OF_BIRTH);
    }

    @Test
    @Transactional
    public void updateNonExistingGMSUser() throws Exception {
        int databaseSizeBeforeUpdate = gMSUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGMSUserMockMvc
            .perform(
                put("/api/gms-users")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(gMSUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the GMSUser in the database
        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGMSUser() throws Exception {
        // Initialize the database
        gMSUserRepository.saveAndFlush(gMSUser);

        int databaseSizeBeforeDelete = gMSUserRepository.findAll().size();

        // Delete the gMSUser
        restGMSUserMockMvc
            .perform(delete("/api/gms-users/{id}", gMSUser.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GMSUser> gMSUserList = gMSUserRepository.findAll();
        assertThat(gMSUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
