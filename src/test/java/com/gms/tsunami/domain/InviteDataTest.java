package com.gms.tsunami.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gms.tsunami.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class InviteDataTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InviteData.class);
        InviteData inviteData1 = new InviteData();
        inviteData1.setId(1L);
        InviteData inviteData2 = new InviteData();
        inviteData2.setId(inviteData1.getId());
        assertThat(inviteData1).isEqualTo(inviteData2);
        inviteData2.setId(2L);
        assertThat(inviteData1).isNotEqualTo(inviteData2);
        inviteData1.setId(null);
        assertThat(inviteData1).isNotEqualTo(inviteData2);
    }
}
