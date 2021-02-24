import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InviteData from './invite-data';
import InviteDataDetail from './invite-data-detail';
import InviteDataUpdate from './invite-data-update';
import InviteDataDeleteDialog from './invite-data-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InviteDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InviteDataUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InviteDataDetail} />
      <ErrorBoundaryRoute path={match.url} component={InviteData} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InviteDataDeleteDialog} />
  </>
);

export default Routes;
