package com.gms.tsunami.web.rest;

import com.gms.tsunami.domain.GMSUser;
import com.gms.tsunami.repository.GMSUserRepository;
import com.gms.tsunami.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.gms.tsunami.domain.GMSUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GMSUserResource {
    private final Logger log = LoggerFactory.getLogger(GMSUserResource.class);

    private static final String ENTITY_NAME = "gMSUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GMSUserRepository gMSUserRepository;

    public GMSUserResource(GMSUserRepository gMSUserRepository) {
        this.gMSUserRepository = gMSUserRepository;
    }

    /**
     * {@code POST  /gms-users} : Create a new gMSUser.
     *
     * @param gMSUser the gMSUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gMSUser, or with status {@code 400 (Bad Request)} if the gMSUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gms-users")
    public ResponseEntity<GMSUser> createGMSUser(@Valid @RequestBody GMSUser gMSUser) throws URISyntaxException {
        log.debug("REST request to save GMSUser : {}", gMSUser);
        if (gMSUser.getId() != null) {
            throw new BadRequestAlertException("A new gMSUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GMSUser result = gMSUserRepository.save(gMSUser);
        return ResponseEntity
            .created(new URI("/api/gms-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gms-users} : Updates an existing gMSUser.
     *
     * @param gMSUser the gMSUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gMSUser,
     * or with status {@code 400 (Bad Request)} if the gMSUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gMSUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gms-users")
    public ResponseEntity<GMSUser> updateGMSUser(@Valid @RequestBody GMSUser gMSUser) throws URISyntaxException {
        log.debug("REST request to update GMSUser : {}", gMSUser);
        if (gMSUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GMSUser result = gMSUserRepository.save(gMSUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gMSUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gms-users} : get all the gMSUsers.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gMSUsers in body.
     */
    @GetMapping("/gms-users")
    public List<GMSUser> getAllGMSUsers(@RequestParam(required = false) String filter) {
        if ("userid-is-null".equals(filter)) {
            log.debug("REST request to get all GMSUsers where userID is null");
            return StreamSupport
                .stream(gMSUserRepository.findAll().spliterator(), false)
                .filter(gMSUser -> gMSUser.getUserID() == null)
                .collect(Collectors.toList());
        }
        if ("userid-is-null".equals(filter)) {
            log.debug("REST request to get all GMSUsers where userID is null");
            return StreamSupport
                .stream(gMSUserRepository.findAll().spliterator(), false)
                .filter(gMSUser -> gMSUser.getUserID() == null)
                .collect(Collectors.toList());
        }
        if ("userid-is-null".equals(filter)) {
            log.debug("REST request to get all GMSUsers where userID is null");
            return StreamSupport
                .stream(gMSUserRepository.findAll().spliterator(), false)
                .filter(gMSUser -> gMSUser.getUserID() == null)
                .collect(Collectors.toList());
        }
        if ("userid-is-null".equals(filter)) {
            log.debug("REST request to get all GMSUsers where userID is null");
            return StreamSupport
                .stream(gMSUserRepository.findAll().spliterator(), false)
                .filter(gMSUser -> gMSUser.getUserID() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all GMSUsers");
        return gMSUserRepository.findAll();
    }

    /**
     * {@code GET  /gms-users/:id} : get the "id" gMSUser.
     *
     * @param id the id of the gMSUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gMSUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gms-users/{id}")
    public ResponseEntity<GMSUser> getGMSUser(@PathVariable Long id) {
        log.debug("REST request to get GMSUser : {}", id);
        Optional<GMSUser> gMSUser = gMSUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gMSUser);
    }

    /**
     * {@code DELETE  /gms-users/:id} : delete the "id" gMSUser.
     *
     * @param id the id of the gMSUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gms-users/{id}")
    public ResponseEntity<Void> deleteGMSUser(@PathVariable Long id) {
        log.debug("REST request to delete GMSUser : {}", id);
        gMSUserRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
