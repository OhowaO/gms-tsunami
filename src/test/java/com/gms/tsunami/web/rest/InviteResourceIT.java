package com.gms.tsunami.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gms.tsunami.GmsApp;
import com.gms.tsunami.config.TestSecurityConfiguration;
import com.gms.tsunami.domain.Invite;
import com.gms.tsunami.domain.enumeration.InviteStatus;
import com.gms.tsunami.repository.InviteRepository;
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
 * Integration tests for the {@link InviteResource} REST controller.
 */
@SpringBootTest(classes = { GmsApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class InviteResourceIT {
    private static final String DEFAULT_HOST = "AAAAAAAAAA";
    private static final String UPDATED_HOST = "BBBBBBBBBB";

    private static final String DEFAULT_GUEST = "AAAAAAAAAA";
    private static final String UPDATED_GUEST = "BBBBBBBBBB";

    private static final Instant DEFAULT_VALID_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_VALID_TO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_VALID_TO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final InviteStatus DEFAULT_INVITE_STATUS = InviteStatus.PENDING;
    private static final InviteStatus UPDATED_INVITE_STATUS = InviteStatus.ACCEPTED;

    @Autowired
    private InviteRepository inviteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInviteMockMvc;

    private Invite invite;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invite createEntity(EntityManager em) {
        Invite invite = new Invite()
            .host(DEFAULT_HOST)
            .guest(DEFAULT_GUEST)
            .validFrom(DEFAULT_VALID_FROM)
            .validTo(DEFAULT_VALID_TO)
            .inviteStatus(DEFAULT_INVITE_STATUS);
        return invite;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Invite createUpdatedEntity(EntityManager em) {
        Invite invite = new Invite()
            .host(UPDATED_HOST)
            .guest(UPDATED_GUEST)
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .inviteStatus(UPDATED_INVITE_STATUS);
        return invite;
    }

    @BeforeEach
    public void initTest() {
        invite = createEntity(em);
    }

    @Test
    @Transactional
    public void createInvite() throws Exception {
        int databaseSizeBeforeCreate = inviteRepository.findAll().size();
        // Create the Invite
        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isCreated());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeCreate + 1);
        Invite testInvite = inviteList.get(inviteList.size() - 1);
        assertThat(testInvite.getHost()).isEqualTo(DEFAULT_HOST);
        assertThat(testInvite.getGuest()).isEqualTo(DEFAULT_GUEST);
        assertThat(testInvite.getValidFrom()).isEqualTo(DEFAULT_VALID_FROM);
        assertThat(testInvite.getValidTo()).isEqualTo(DEFAULT_VALID_TO);
        assertThat(testInvite.getInviteStatus()).isEqualTo(DEFAULT_INVITE_STATUS);
    }

    @Test
    @Transactional
    public void createInviteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inviteRepository.findAll().size();

        // Create the Invite with an existing ID
        invite.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkHostIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteRepository.findAll().size();
        // set the field null
        invite.setHost(null);

        // Create the Invite, which fails.

        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGuestIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteRepository.findAll().size();
        // set the field null
        invite.setGuest(null);

        // Create the Invite, which fails.

        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValidFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteRepository.findAll().size();
        // set the field null
        invite.setValidFrom(null);

        // Create the Invite, which fails.

        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValidToIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteRepository.findAll().size();
        // set the field null
        invite.setValidTo(null);

        // Create the Invite, which fails.

        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkInviteStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = inviteRepository.findAll().size();
        // set the field null
        invite.setInviteStatus(null);

        // Create the Invite, which fails.

        restInviteMockMvc
            .perform(
                post("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInvites() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        // Get all the inviteList
        restInviteMockMvc
            .perform(get("/api/invites?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(invite.getId().intValue())))
            .andExpect(jsonPath("$.[*].host").value(hasItem(DEFAULT_HOST)))
            .andExpect(jsonPath("$.[*].guest").value(hasItem(DEFAULT_GUEST)))
            .andExpect(jsonPath("$.[*].validFrom").value(hasItem(DEFAULT_VALID_FROM.toString())))
            .andExpect(jsonPath("$.[*].validTo").value(hasItem(DEFAULT_VALID_TO.toString())))
            .andExpect(jsonPath("$.[*].inviteStatus").value(hasItem(DEFAULT_INVITE_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        // Get the invite
        restInviteMockMvc
            .perform(get("/api/invites/{id}", invite.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(invite.getId().intValue()))
            .andExpect(jsonPath("$.host").value(DEFAULT_HOST))
            .andExpect(jsonPath("$.guest").value(DEFAULT_GUEST))
            .andExpect(jsonPath("$.validFrom").value(DEFAULT_VALID_FROM.toString()))
            .andExpect(jsonPath("$.validTo").value(DEFAULT_VALID_TO.toString()))
            .andExpect(jsonPath("$.inviteStatus").value(DEFAULT_INVITE_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInvite() throws Exception {
        // Get the invite
        restInviteMockMvc.perform(get("/api/invites/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        int databaseSizeBeforeUpdate = inviteRepository.findAll().size();

        // Update the invite
        Invite updatedInvite = inviteRepository.findById(invite.getId()).get();
        // Disconnect from session so that the updates on updatedInvite are not directly saved in db
        em.detach(updatedInvite);
        updatedInvite
            .host(UPDATED_HOST)
            .guest(UPDATED_GUEST)
            .validFrom(UPDATED_VALID_FROM)
            .validTo(UPDATED_VALID_TO)
            .inviteStatus(UPDATED_INVITE_STATUS);

        restInviteMockMvc
            .perform(
                put("/api/invites")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInvite))
            )
            .andExpect(status().isOk());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeUpdate);
        Invite testInvite = inviteList.get(inviteList.size() - 1);
        assertThat(testInvite.getHost()).isEqualTo(UPDATED_HOST);
        assertThat(testInvite.getGuest()).isEqualTo(UPDATED_GUEST);
        assertThat(testInvite.getValidFrom()).isEqualTo(UPDATED_VALID_FROM);
        assertThat(testInvite.getValidTo()).isEqualTo(UPDATED_VALID_TO);
        assertThat(testInvite.getInviteStatus()).isEqualTo(UPDATED_INVITE_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingInvite() throws Exception {
        int databaseSizeBeforeUpdate = inviteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInviteMockMvc
            .perform(
                put("/api/invites").with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(invite))
            )
            .andExpect(status().isBadRequest());

        // Validate the Invite in the database
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInvite() throws Exception {
        // Initialize the database
        inviteRepository.saveAndFlush(invite);

        int databaseSizeBeforeDelete = inviteRepository.findAll().size();

        // Delete the invite
        restInviteMockMvc
            .perform(delete("/api/invites/{id}", invite.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Invite> inviteList = inviteRepository.findAll();
        assertThat(inviteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
