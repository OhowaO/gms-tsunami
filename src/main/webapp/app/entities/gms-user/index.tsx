import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GMSUser from './gms-user';
import GMSUserDetail from './gms-user-detail';
import GMSUserUpdate from './gms-user-update';
import GMSUserDeleteDialog from './gms-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GMSUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GMSUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GMSUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={GMSUser} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GMSUserDeleteDialog} />
  </>
);

export default Routes;
