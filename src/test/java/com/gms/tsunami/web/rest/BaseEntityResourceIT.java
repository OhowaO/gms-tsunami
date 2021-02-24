package com.gms.tsunami.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gms.tsunami.GmsApp;
import com.gms.tsunami.config.TestSecurityConfiguration;
import com.gms.tsunami.domain.BaseEntity;
import com.gms.tsunami.repository.BaseEntityRepository;
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
 * Integration tests for the {@link BaseEntityResource} REST controller.
 */
@SpringBootTest(classes = { GmsApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class BaseEntityResourceIT {
    @Autowired
    private BaseEntityRepository baseEntityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBaseEntityMockMvc;

    private BaseEntity baseEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BaseEntity createEntity(EntityManager em) {
        BaseEntity baseEntity = new BaseEntity();
        return baseEntity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BaseEntity createUpdatedEntity(EntityManager em) {
        BaseEntity baseEntity = new BaseEntity();
        return baseEntity;
    }

    @BeforeEach
    public void initTest() {
        baseEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createBaseEntity() throws Exception {
        int databaseSizeBeforeCreate = baseEntityRepository.findAll().size();
        // Create the BaseEntity
        restBaseEntityMockMvc
            .perform(
                post("/api/base-entities")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(baseEntity))
            )
            .andExpect(status().isCreated());

        // Validate the BaseEntity in the database
        List<BaseEntity> baseEntityList = baseEntityRepository.findAll();
        assertThat(baseEntityList).hasSize(databaseSizeBeforeCreate + 1);
        BaseEntity testBaseEntity = baseEntityList.get(baseEntityList.size() - 1);
    }

    @Test
    @Transactional
    public void createBaseEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = baseEntityRepository.findAll().size();

        // Create the BaseEntity with an existing ID
        baseEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBaseEntityMockMvc
            .perform(
                post("/api/base-entities")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(baseEntity))
            )
            .andExpect(status().isBadRequest());

        // Validate the BaseEntity in the database
        List<BaseEntity> baseEntityList = baseEntityRepository.findAll();
        assertThat(baseEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBaseEntities() throws Exception {
        // Initialize the database
        baseEntityRepository.saveAndFlush(baseEntity);

        // Get all the baseEntityList
        restBaseEntityMockMvc
            .perform(get("/api/base-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(baseEntity.getId().intValue())));
    }

    @Test
    @Transactional
    public void getBaseEntity() throws Exception {
        // Initialize the database
        baseEntityRepository.saveAndFlush(baseEntity);

        // Get the baseEntity
        restBaseEntityMockMvc
            .perform(get("/api/base-entities/{id}", baseEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(baseEntity.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBaseEntity() throws Exception {
        // Get the baseEntity
        restBaseEntityMockMvc.perform(get("/api/base-entities/{id}", Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBaseEntity() throws Exception {
        // Initialize the database
        baseEntityRepository.saveAndFlush(baseEntity);

        int databaseSizeBeforeUpdate = baseEntityRepository.findAll().size();

        // Update the baseEntity
        BaseEntity updatedBaseEntity = baseEntityRepository.findById(baseEntity.getId()).get();
        // Disconnect from session so that the updates on updatedBaseEntity are not directly saved in db
        em.detach(updatedBaseEntity);

        restBaseEntityMockMvc
            .perform(
                put("/api/base-entities")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedBaseEntity))
            )
            .andExpect(status().isOk());

        // Validate the BaseEntity in the database
        List<BaseEntity> baseEntityList = baseEntityRepository.findAll();
        assertThat(baseEntityList).hasSize(databaseSizeBeforeUpdate);
        BaseEntity testBaseEntity = baseEntityList.get(baseEntityList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBaseEntity() throws Exception {
        int databaseSizeBeforeUpdate = baseEntityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBaseEntityMockMvc
            .perform(
                put("/api/base-entities")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(baseEntity))
            )
            .andExpect(status().isBadRequest());

        // Validate the BaseEntity in the database
        List<BaseEntity> baseEntityList = baseEntityRepository.findAll();
        assertThat(baseEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBaseEntity() throws Exception {
        // Initialize the database
        baseEntityRepository.saveAndFlush(baseEntity);

        int databaseSizeBeforeDelete = baseEntityRepository.findAll().size();

        // Delete the baseEntity
        restBaseEntityMockMvc
            .perform(delete("/api/base-entities/{id}", baseEntity.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BaseEntity> baseEntityList = baseEntityRepository.findAll();
        assertThat(baseEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
