package com.gms.tsunami.repository;

import com.gms.tsunami.domain.Invite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Invite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InviteRepository extends JpaRepository<Invite, Long> {}
