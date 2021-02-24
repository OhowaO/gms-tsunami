import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BaseEntity from './base-entity';
import GMSUser from './gms-user';
import IdentificationDocument from './identification-document';
import Tenant from './tenant';
import Invite from './invite';
import InviteData from './invite-data';
import ResidentialProperty from './residential-property';
import Owner from './owner';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}base-entity`} component={BaseEntity} />
      <ErrorBoundaryRoute path={`${match.url}gms-user`} component={GMSUser} />
      <ErrorBoundaryRoute path={`${match.url}identification-document`} component={IdentificationDocument} />
      <ErrorBoundaryRoute path={`${match.url}tenant`} component={Tenant} />
      <ErrorBoundaryRoute path={`${match.url}invite`} component={Invite} />
      <ErrorBoundaryRoute path={`${match.url}invite-data`} component={InviteData} />
      <ErrorBoundaryRoute path={`${match.url}residential-property`} component={ResidentialProperty} />
      <ErrorBoundaryRoute path={`${match.url}owner`} component={Owner} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
