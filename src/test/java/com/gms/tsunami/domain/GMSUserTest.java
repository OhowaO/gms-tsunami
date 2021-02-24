package com.gms.tsunami.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gms.tsunami.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class GMSUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GMSUser.class);
        GMSUser gMSUser1 = new GMSUser();
        gMSUser1.setId(1L);
        GMSUser gMSUser2 = new GMSUser();
        gMSUser2.setId(gMSUser1.getId());
        assertThat(gMSUser1).isEqualTo(gMSUser2);
        gMSUser2.setId(2L);
        assertThat(gMSUser1).isNotEqualTo(gMSUser2);
        gMSUser1.setId(null);
        assertThat(gMSUser1).isNotEqualTo(gMSUser2);
    }
}
