package com.gms.tsunami.repository;

import com.gms.tsunami.domain.InviteData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InviteData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InviteDataRepository extends JpaRepository<InviteData, Long> {}
