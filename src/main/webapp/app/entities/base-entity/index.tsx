import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BaseEntity from './base-entity';
import BaseEntityDetail from './base-entity-detail';
import BaseEntityUpdate from './base-entity-update';
import BaseEntityDeleteDialog from './base-entity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BaseEntityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BaseEntityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BaseEntityDetail} />
      <ErrorBoundaryRoute path={match.url} component={BaseEntity} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BaseEntityDeleteDialog} />
  </>
);

export default Routes;
