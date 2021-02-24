import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/base-entity">
      <Translate contentKey="global.menu.entities.baseEntity" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gms-user">
      <Translate contentKey="global.menu.entities.gmsUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/identification-document">
      <Translate contentKey="global.menu.entities.identificationDocument" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/tenant">
      <Translate contentKey="global.menu.entities.tenant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/invite">
      <Translate contentKey="global.menu.entities.invite" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/invite-data">
      <Translate contentKey="global.menu.entities.inviteData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/residential-property">
      <Translate contentKey="global.menu.entities.residentialProperty" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/owner">
      <Translate contentKey="global.menu.entities.owner" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
