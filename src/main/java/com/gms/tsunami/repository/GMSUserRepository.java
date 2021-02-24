package com.gms.tsunami.repository;

import com.gms.tsunami.domain.GMSUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GMSUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GMSUserRepository extends JpaRepository<GMSUser, Long> {}
