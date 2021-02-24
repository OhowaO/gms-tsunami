import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ResidentialProperty from './residential-property';
import ResidentialPropertyDetail from './residential-property-detail';
import ResidentialPropertyUpdate from './residential-property-update';
import ResidentialPropertyDeleteDialog from './residential-property-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResidentialPropertyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResidentialPropertyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResidentialPropertyDetail} />
      <ErrorBoundaryRoute path={match.url} component={ResidentialProperty} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ResidentialPropertyDeleteDialog} />
  </>
);

export default Routes;
